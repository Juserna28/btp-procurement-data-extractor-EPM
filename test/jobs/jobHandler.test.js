'use strict';

// External dependency mocks must be hoisted before any require
jest.mock('@sap-cloud-sdk/connectivity', () => ({
    getDestination: jest.fn()
}));
jest.mock('@sap-cloud-sdk/http-client', () => ({
    buildHttpRequest: jest.fn()
}));
jest.mock('axios', () => ({
    default: { request: jest.fn() }
}));
jest.mock('../../srv/handlers/jobs/jobDataProcessingHelper', () => ({
    ProcessData: jest.fn().mockResolvedValue(5)
}));

require('../helpers/cdsTestHelper');
const { getDestination } = require('@sap-cloud-sdk/connectivity');
const { buildHttpRequest } = require('@sap-cloud-sdk/http-client');
const axiosMock = require('axios').default;
const {
    createJob,
    UpdateJobStatus,
    ProcessFinishedJobs
} = require('../../srv/handlers/jobs/jobHandler');

// Destination stub that passes the validation check in createJob
const VALID_DEST = {
    originalProperties: {
        destinationConfiguration: { apikey: 'test-api-key' }
    },
    baseUrl: 'https://ariba.example.com'
};

// HTTP config stub returned by buildHttpRequest
const HTTP_CONFIG = {
    baseURL: 'https://ariba.example.com',
    headers: {},
    params: {},
    method: 'post'
};

// Ariba API response for a newly created job
function makeJobApiResponse(overrides = {}) {
    return {
        data: {
            jobId: 'ariba-job-001',
            status: 'pending',
            createdDate: '2024-01-15',
            completedDate: null,
            viewTemplateName: 'TestTemplate',
            documentType: 'JSON',
            pageToken: null,
            filters: null,
            files: [],
            ...overrides
        }
    };
}

beforeEach(() => {
    getDestination.mockResolvedValue(VALID_DEST);
    buildHttpRequest.mockResolvedValue({ ...HTTP_CONFIG });
    axiosMock.request.mockResolvedValue(makeJobApiResponse());
});

afterEach(async () => {
    axiosMock.request.mockReset();
    await DELETE.from('sap.ariba.Job_File');
    await DELETE.from('sap.ariba.Job_Pages');
    await DELETE.from('sap.ariba.Jobs');
});

// ─── createJob ───────────────────────────────────────────────────────────────

describe('createJob', () => {
    it('throws when getDestination returns null', async () => {
        getDestination.mockResolvedValue(null);
        const ctx = { data: { realm: 'TestRealm', viewTemplateName: 'T', apiType: 'analytical' } };
        await expect(createJob(ctx)).rejects.toThrow('Destination does not exist or is incorrectly configured');
    });

    it('throws when destination has no apikey', async () => {
        getDestination.mockResolvedValue({ originalProperties: { destinationConfiguration: {} } });
        const ctx = { data: { realm: 'TestRealm', viewTemplateName: 'T', apiType: 'analytical' } };
        await expect(createJob(ctx)).rejects.toThrow('Destination does not exist or is incorrectly configured');
    });

    it('returns "Job Started" and inserts a Jobs row on success', async () => {
        const ctx = { data: { realm: 'TestRealm', viewTemplateName: 'TestTemplate', apiType: 'analytical' } };
        const result = await createJob(ctx);

        expect(result).toBe('Job Started');
        const rows = await SELECT.from('sap.ariba.Jobs');
        expect(rows.length).toBe(1);
        expect(rows[0].jobId).toBe('ariba-job-001');
        expect(rows[0].Realm).toBe('TestRealm');
        expect(rows[0].importStatus).toBe('stopped');
    });

    it('calls the analytics-reporting endpoint for apiType=analytical', async () => {
        const ctx = { data: { realm: 'TestRealm', viewTemplateName: 'T', apiType: 'analytical' } };
        await createJob(ctx);
        expect(getDestination).toHaveBeenCalledWith(
            expect.objectContaining({ destinationName: 'TestRealm-reporting-analytics' })
        );
    });

    it('calls the procurement-reporting endpoint for apiType=procurementReporting', async () => {
        const ctx = { data: { realm: 'TestRealm', viewTemplateName: 'T', apiType: 'procurementReporting' } };
        await createJob(ctx);
        expect(getDestination).toHaveBeenCalledWith(
            expect.objectContaining({ destinationName: 'TestRealm-procurement-reporting' })
        );
    });

    it('calls the sourcing-reporting endpoint for apiType=sourcingReporting', async () => {
        const ctx = { data: { realm: 'TestRealm', viewTemplateName: 'T', apiType: 'sourcingReporting' } };
        await createJob(ctx);
        expect(getDestination).toHaveBeenCalledWith(
            expect.objectContaining({ destinationName: 'TestRealm-sourcing-reporting' })
        );
    });

    it('does not include date filters when no previous processed job exists (initial load)', async () => {
        const ctx = { data: { realm: 'TestRealm', viewTemplateName: 'T', apiType: 'analytical' } };
        await createJob(ctx);
        // First call: no previous job → initialLoad=true → no date filters in request body
        const callArgs = axiosMock.request.mock.calls[0][0];
        expect(callArgs.data && callArgs.data.filters).toBeUndefined();
    });
});

// ─── UpdateJobStatus ──────────────────────────────────────────────────────────

describe('UpdateJobStatus', () => {
    it('returns "Updating jobs" when no pending or processing jobs exist', async () => {
        const ctx = { data: { realm: 'TestRealm' } };
        const result = await UpdateJobStatus(ctx);
        expect(result).toBe('Updating jobs');
    });

    it('marks importStatus=error when Ariba returns JOBEXPIRED error code', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-expired',
            Realm: 'TestRealm',
            status: 'pending',
            importStatus: 'stopped',
            apiType: 'analytical',
            viewTemplateName: 'T'
        });
        const jobError = { response: { status: 404, data: { code: 'JOBEXPIRED' } }, message: 'Not found' };
        axiosMock.request.mockRejectedValueOnce(jobError);

        const ctx = { data: { realm: 'TestRealm' } };
        await UpdateJobStatus(ctx);

        const [job] = await SELECT.from('sap.ariba.Jobs').where({ jobId: 'job-expired' });
        expect(job.importStatus).toBe('error');
    });

    it('marks importStatus=error when Ariba returns JOBNOTFOUND error code', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-missing',
            Realm: 'TestRealm',
            status: 'pending',
            importStatus: 'stopped',
            apiType: 'analytical',
            viewTemplateName: 'T'
        });
        const jobError = { response: { status: 404, data: { code: 'JOBNOTFOUND' } }, message: 'Not found' };
        axiosMock.request.mockRejectedValueOnce(jobError);

        const ctx = { data: { realm: 'TestRealm' } };
        await UpdateJobStatus(ctx);

        const [job] = await SELECT.from('sap.ariba.Jobs').where({ jobId: 'job-missing' });
        expect(job.importStatus).toBe('error');
    });

    it('inserts Job_File rows when Ariba returns COMPLETED status', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-done',
            Realm: 'TestRealm',
            status: 'pending',
            importStatus: 'stopped',
            apiType: 'analytical',
            viewTemplateName: 'T'
        });
        axiosMock.request.mockResolvedValueOnce({
            data: {
                jobId: 'job-done',
                status: 'COMPLETED',
                files: ['file1.zip', 'file2.zip'],
                pageToken: null
            }
        });

        const ctx = { data: { realm: 'TestRealm' } };
        await UpdateJobStatus(ctx);

        const files = await SELECT.from('sap.ariba.Job_File').where({ jobId_jobId: 'job-done' });
        expect(files.length).toBe(2);
    });
});

// ─── ProcessFinishedJobs ──────────────────────────────────────────────────────

describe('ProcessFinishedJobs', () => {
    it('returns 0 when no jobs have status=completed and importStatus=stopped', async () => {
        const ctx = { data: { realm: 'TestRealm' } };
        const result = await ProcessFinishedJobs(ctx);
        expect(result).toBe(0);
    });
});

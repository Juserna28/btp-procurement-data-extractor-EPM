'use strict';

// jobadmin actions call external services; mock them so the service boots cleanly
jest.mock('@sap-cloud-sdk/connectivity', () => ({
    getDestination: jest.fn().mockResolvedValue(null)
}));
jest.mock('@sap-cloud-sdk/http-client', () => ({
    buildHttpRequest: jest.fn().mockResolvedValue({ baseURL: '', headers: {}, params: {}, method: 'get' })
}));
jest.mock('axios', () => {
    const actual = jest.requireActual('axios');
    return {
        ...actual,
        request: jest.fn(),
        default: { ...actual, request: jest.fn() }
    };
});

const srv = require('../helpers/cdsTestHelper');

afterEach(async () => {
    await DELETE.from('sap.ariba.Job_File');
    await DELETE.from('sap.ariba.Job_Pages');
    await DELETE.from('sap.ariba.Jobs');
});

describe('JobAdminService /jobadmin', () => {
    it('service boots and exposes a GET method', () => {
        expect(typeof srv.GET).toBe('function');
    });

    it('GET /jobadmin/Jobs returns 200 with an empty value array', async () => {
        const { status, data } = await srv.GET('/jobadmin/Jobs');
        expect(status).toBe(200);
        expect(Array.isArray(data.value)).toBe(true);
    });

    it('GET /jobadmin/Job_File returns 200', async () => {
        const { status } = await srv.GET('/jobadmin/Job_File');
        expect(status).toBe(200);
    });

    it('GET /jobadmin/Job_Pages returns 200', async () => {
        const { status } = await srv.GET('/jobadmin/Job_Pages');
        expect(status).toBe(200);
    });

    it('POST UpdateJobStatus returns 200 with "Updating jobs" when no ongoing jobs exist', async () => {
        const { status, data } = await srv.POST('/jobadmin/UpdateJobStatus', { realm: 'TestRealm' });
        expect(status).toBe(200);
        expect(data.value).toBe('Updating jobs');
    });

    it('POST ProcessFinishedJobs returns 200 with 0 when no finished jobs exist', async () => {
        const { status, data } = await srv.POST('/jobadmin/ProcessFinishedJobs', { realm: 'TestRealm' });
        expect(status).toBe(200);
        expect(data.value).toBe(0);
    });
});

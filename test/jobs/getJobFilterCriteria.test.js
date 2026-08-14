'use strict';

require('../helpers/cdsTestHelper');
const { getJobFilterCriteria } = require('../../srv/utils/Utils');

afterEach(async () => {
    await DELETE.from('sap.ariba.Job_File');
    await DELETE.from('sap.ariba.Job_Pages');
    await DELETE.from('sap.ariba.Jobs');
});

describe('getJobFilterCriteria — 4-case state machine', () => {
    it('case 1: returns type=new and initialLoad=true when no matching job exists', async () => {
        const result = await getJobFilterCriteria('TestRealm', 'SLP');
        expect(result.type).toBe('new');
        expect(result.initialLoad).toBe(true);
    });

    it('case 2: returns type=next with updatedDateFrom/To when last job is processed', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-001',
            Realm: 'TestRealm',
            type: 'SLP',
            importStatus: 'processed'
        });
        const result = await getJobFilterCriteria('TestRealm', 'SLP');
        expect(result.type).toBe('next');
        expect(result.initialLoad).toBe(false);
        expect(result.updatedDateFrom).toBeDefined();
        expect(result.updatedDateTo).toBeDefined();
    });

    it('case 2: updatedDateFrom is set from the managed createdAt of the last processed job', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-001',
            Realm: 'TestRealm',
            type: 'SLP',
            importStatus: 'processed'
        });
        const [job] = await SELECT.from('sap.ariba.Jobs').where({ jobId: 'job-001' });
        const result = await getJobFilterCriteria('TestRealm', 'SLP');
        // The handler uses oLastExecutionRun.createdAt (managed field set by CAP)
        expect(result.updatedDateFrom).toBe(job.createdAt);
    });

    it('case 3: returns type=stop with doNothing=true when a job is in-progress', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-001',
            Realm: 'TestRealm',
            type: 'SLP',
            importStatus: 'stopped' // not processed or error → ongoing
        });
        const result = await getJobFilterCriteria('TestRealm', 'SLP');
        expect(result.type).toBe('stop');
        expect(result.doNothing).toBe(true);
    });

    it('case 4: returns type=continue with pageToken when last job has importStatus=error', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-001',
            Realm: 'TestRealm',
            type: 'SLP',
            importStatus: 'error',
            pageToken: 'next-page-abc',
            filterCriteria: '{"from":"2024-01-01"}'
        });
        const result = await getJobFilterCriteria('TestRealm', 'SLP');
        expect(result.type).toBe('continue');
        expect(result.pageToken).toBe('next-page-abc');
        expect(result.filterCriteria).toBe('{"from":"2024-01-01"}');
        expect(result.initialLoad).toBe(false);
    });

    it('does not confuse jobs from different realms', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-001',
            Realm: 'OtherRealm',
            type: 'SLP',
            importStatus: 'stopped'
        });
        // TestRealm has no SLP job → should return type=new
        const result = await getJobFilterCriteria('TestRealm', 'SLP');
        expect(result.type).toBe('new');
    });

    it('does not confuse jobs of different types in the same realm', async () => {
        await INSERT.into('sap.ariba.Jobs').entries({
            jobId: 'job-001',
            Realm: 'TestRealm',
            type: 'Risk',
            importStatus: 'stopped'
        });
        // SLP type has no job → should return type=new
        const result = await getJobFilterCriteria('TestRealm', 'SLP');
        expect(result.type).toBe('new');
    });
});

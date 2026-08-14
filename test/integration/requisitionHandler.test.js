'use strict';

require('../helpers/cdsTestHelper');
const { insertData } = require('../../srv/handlers/Operational/requisitions/requisitionHandler');

async function cleanRequisitionTables(realm, uniqueName) {
    await DELETE('sap.ariba.Requisition_ApprovalRequests_Approver_OP').where({
        RequisitionApprovalRequests_Requisition_Realm: realm,
        RequisitionApprovalRequests_Requisition_UniqueName: uniqueName
    });
    await DELETE('sap.ariba.Requisition_ApprovalRequests_OP').where({
        Requisition_Realm: realm,
        Requisition_UniqueName: uniqueName
    });
    await DELETE('sap.ariba.Requisition_ApprovalRecords_OP').where({
        Requisition_Realm: realm,
        Requisition_UniqueName: uniqueName
    });
    await DELETE('sap.ariba.Requisition_LineItem_SplitAccountings_OP').where({
        LineItem_Requisition_Realm: realm,
        LineItem_Requisition_UniqueName: uniqueName
    });
    await DELETE('sap.ariba.Requisition_LineItem_OP').where({
        Requisition_Realm: realm,
        Requisition_UniqueName: uniqueName
    });
    await DELETE('sap.ariba.Requisition_OP').where({ Realm: realm, UniqueName: uniqueName });
}

afterEach(async () => {
    await DELETE.from('sap.ariba.Requisition_ApprovalRequests_Approver_OP');
    await DELETE.from('sap.ariba.Requisition_ApprovalRequests_OP');
    await DELETE.from('sap.ariba.Requisition_ApprovalRecords_OP');
    await DELETE.from('sap.ariba.Requisition_LineItem_SplitAccountings_OP');
    await DELETE.from('sap.ariba.Requisition_LineItem_OP');
    await DELETE.from('sap.ariba.Requisition_OP');
});

describe('requisitionHandler.insertData — cascade-delete then insert pattern', () => {
    it('resolves with 0 for null input', async () => {
        await expect(insertData(null, 'TestRealm')).resolves.toBe(0);
    });

    it('resolves with 0 for an empty array', async () => {
        await expect(insertData([], 'TestRealm')).resolves.toBe(0);
    });

    it('inserts a Requisition_OP parent record with correct Realm and UniqueName', async () => {
        await insertData([{ UniqueName: 'REQ-001' }], 'TestRealm');
        const rows = await SELECT.from('sap.ariba.Requisition_OP');
        expect(rows.length).toBe(1);
        expect(rows[0].UniqueName).toBe('REQ-001');
        expect(rows[0].Realm).toBe('TestRealm');
    });

    it('is idempotent: a second call with the same record leaves exactly one row', async () => {
        await insertData([{ UniqueName: 'REQ-001' }], 'TestRealm');
        await insertData([{ UniqueName: 'REQ-001' }], 'TestRealm');
        const rows = await SELECT.from('sap.ariba.Requisition_OP');
        expect(rows.length).toBe(1);
    });

    it('resolves with the count of input records', async () => {
        const count = await insertData(
            [{ UniqueName: 'REQ-001' }, { UniqueName: 'REQ-002' }],
            'TestRealm'
        );
        expect(count).toBe(2);
    });

    it('normalizes a single Approver object (not array) without throwing', async () => {
        const record = {
            UniqueName: 'REQ-003',
            ApprovalRequests: [{
                Approver: { UniqueName: 'approver1', PasswordAdapter: 'ldap' }
            }]
        };
        await expect(insertData([record], 'TestRealm')).resolves.toBeDefined();
    });

    it('inserts multiple records from a single batch', async () => {
        await insertData(
            [{ UniqueName: 'REQ-001' }, { UniqueName: 'REQ-002' }, { UniqueName: 'REQ-003' }],
            'TestRealm'
        );
        const rows = await SELECT.from('sap.ariba.Requisition_OP');
        expect(rows.length).toBe(3);
    });
});

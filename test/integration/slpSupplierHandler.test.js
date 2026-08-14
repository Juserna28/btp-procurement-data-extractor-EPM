'use strict';

require('../helpers/cdsTestHelper');
const { insertData } = require('../../srv/handlers/SupplierManagement/slpSupplierHandler');

afterEach(async () => {
    await DELETE.from('sap.ariba.SLPSuppliers_Questionnaires_SM');
    await DELETE.from('sap.ariba.SLPSuppliers_Qualifications_SM');
    await DELETE.from('sap.ariba.SLPSuppliers_RiskCategoryExposures_SM');
    await DELETE.from('sap.ariba.SLPSuppliers_Certificates_SM');
    await DELETE.from('sap.ariba.SLPSuppliers_SM');
});

function makeSupplier(smVendorId, overrides = {}) {
    return {
        'SM Vendor ID': smVendorId,
        'Supplier Name': 'Test Supplier ' + smVendorId,
        qualifications: [],
        questionnaires: [],
        ...overrides
    };
}

describe('slpSupplierHandler.insertData — upsert parent + full-replace children', () => {
    it('resolves with 0 for an empty input array', async () => {
        await expect(insertData([], 'TestRealm')).resolves.toBe(0);
    });

    it('inserts a new SLPSuppliers_SM parent record', async () => {
        await insertData([makeSupplier('V001')], 'TestRealm');
        const rows = await SELECT.from('sap.ariba.SLPSuppliers_SM');
        expect(rows.length).toBe(1);
        expect(rows[0].SMVendorId).toBe('V001');
        expect(rows[0].Realm).toBe('TestRealm');
    });

    it('updates an existing parent record without creating duplicates', async () => {
        await insertData([makeSupplier('V001', { 'Supplier Name': 'Original' })], 'TestRealm');
        await insertData([makeSupplier('V001', { 'Supplier Name': 'Updated' })], 'TestRealm');
        const rows = await SELECT.from('sap.ariba.SLPSuppliers_SM');
        expect(rows.length).toBe(1);
        expect(rows[0].SupplierName).toBe('Updated');
    });

    it('resolves with the count of input supplier records', async () => {
        const count = await insertData(
            [makeSupplier('V001'), makeSupplier('V002')],
            'TestRealm'
        );
        expect(count).toBe(2);
    });

    it('inserts Qualification child records linked to the parent', async () => {
        const supplier = makeSupplier('V001', {
            qualifications: [
                { 'Qualification Status': 'Approved', 'Category': 'IT', 'Region': 'EMEA', 'Preferred Status': '', 'Business Unit': '', 'Material ID': '', 'Process Type': '' }
            ]
        });
        await insertData([supplier], 'TestRealm');
        const quals = await SELECT.from('sap.ariba.SLPSuppliers_Qualifications_SM');
        expect(quals.length).toBe(1);
        expect(quals[0].QualificationStatus).toBe('Approved');
        expect(quals[0].SLPSupplier_Realm).toBe('TestRealm');
        expect(quals[0].SLPSupplier_SMVendorId).toBe('V001');
    });

    it('full-replaces Qualifications: old records deleted, new ones inserted on re-call', async () => {
        const first = makeSupplier('V001', {
            qualifications: [{ 'Qualification Status': 'Approved', 'Category': 'IT', 'Region': '', 'Preferred Status': '', 'Business Unit': '', 'Material ID': '', 'Process Type': '' }]
        });
        await insertData([first], 'TestRealm');

        const second = makeSupplier('V001', {
            qualifications: [
                { 'Qualification Status': 'Pending', 'Category': 'Finance', 'Region': '', 'Preferred Status': '', 'Business Unit': '', 'Material ID': '', 'Process Type': '' },
                { 'Qualification Status': 'Approved', 'Category': 'Legal', 'Region': '',  'Preferred Status': '', 'Business Unit': '', 'Material ID': '', 'Process Type': '' }
            ]
        });
        await insertData([second], 'TestRealm');

        const quals = await SELECT.from('sap.ariba.SLPSuppliers_Qualifications_SM')
            .where({ SLPSupplier_Realm: 'TestRealm', SLPSupplier_SMVendorId: 'V001' });
        // Old 'Approved/IT' replaced by two new records
        expect(quals.length).toBe(2);
    });

    it('leaves zero Qualification rows when qualifications array is empty', async () => {
        await insertData([makeSupplier('V001', { qualifications: [] })], 'TestRealm');
        const quals = await SELECT.from('sap.ariba.SLPSuppliers_Qualifications_SM');
        expect(quals.length).toBe(0);
    });

    it('inserts Questionnaire child records linked to the parent', async () => {
        const supplier = makeSupplier('V001', {
            questionnaires: [
                { questionnaireId: 'QN-01', questionnaireTitle: 'Safety', workspaceType: 'SM', workspaceId: 'WS-01' }
            ]
        });
        await insertData([supplier], 'TestRealm');
        const qns = await SELECT.from('sap.ariba.SLPSuppliers_Questionnaires_SM');
        expect(qns.length).toBe(1);
        expect(qns[0].QuestionnaireId).toBe('QN-01');
    });

    it('full-replaces Questionnaires on re-call (delete old, insert new)', async () => {
        await insertData([makeSupplier('V001', {
            questionnaires: [{ questionnaireId: 'QN-OLD', questionnaireTitle: 'Old', workspaceType: '', workspaceId: '' }]
        })], 'TestRealm');

        await insertData([makeSupplier('V001', {
            questionnaires: [{ questionnaireId: 'QN-NEW', questionnaireTitle: 'New', workspaceType: '', workspaceId: '' }]
        })], 'TestRealm');

        const qns = await SELECT.from('sap.ariba.SLPSuppliers_Questionnaires_SM')
            .where({ SLPSupplier_Realm: 'TestRealm', SLPSupplier_SMVendorId: 'V001' });
        expect(qns.length).toBe(1);
        expect(qns[0].QuestionnaireId).toBe('QN-NEW');
    });

    it('maps API field names with spaces to the correct CDS entity properties', async () => {
        const supplier = makeSupplier('V002', {
            'Address - City': 'Berlin',
            'Address - Country Code': 'DE',
            'ERP Vendor ID': 'ERP-001'
        });
        await insertData([supplier], 'TestRealm');
        const rows = await SELECT.from('sap.ariba.SLPSuppliers_SM').where({ SMVendorId: 'V002' });
        expect(rows[0].AddressCity).toBe('Berlin');
        expect(rows[0].AddressCountryCode).toBe('DE');
        expect(rows[0].ERPVendorId).toBe('ERP-001');
    });
});

'use strict';

require('../helpers/cdsTestHelper');
const { insertData } = require('../../srv/handlers/MasterData/commodityCodesHandler');

afterEach(async () => {
    await DELETE.from('sap.ariba.CommodityCode_MD');
});

describe('commodityCodesHandler.insertData — analytical upsert pattern', () => {
    it('resolves with 0 for null input without touching the DB', async () => {
        await expect(insertData(null, 'TestRealm')).resolves.toBe(0);
    });

    it('resolves with 0 for an empty array', async () => {
        await expect(insertData([], 'TestRealm')).resolves.toBe(0);
    });

    it('inserts a new record when no matching Realm+Domain+UniqueName exists', async () => {
        await insertData(
            [{ Domain: 'Goods', UniqueName: 'G001', Name_en: 'Office Supplies' }],
            'TestRealm'
        );
        const rows = await SELECT.from('sap.ariba.CommodityCode_MD');
        expect(rows.length).toBe(1);
        expect(rows[0].UniqueName).toBe('G001');
        expect(rows[0].Domain).toBe('Goods');
        expect(rows[0].Realm).toBe('TestRealm');
        expect(rows[0].Name_en).toBe('Office Supplies');
    });

    it('updates an existing record when composite key Realm+Domain+UniqueName matches', async () => {
        await insertData(
            [{ Domain: 'Goods', UniqueName: 'G001', Name_en: 'Original Name' }],
            'TestRealm'
        );
        await insertData(
            [{ Domain: 'Goods', UniqueName: 'G001', Name_en: 'Updated Name' }],
            'TestRealm'
        );
        const rows = await SELECT.from('sap.ariba.CommodityCode_MD');
        expect(rows.length).toBe(1);
        expect(rows[0].Name_en).toBe('Updated Name');
    });

    it('does not create duplicate rows on repeated insertion with the same key', async () => {
        const record = { Domain: 'Goods', UniqueName: 'G001', Name_en: 'Test' };
        await insertData([record], 'TestRealm');
        await insertData([record], 'TestRealm');
        const rows = await SELECT.from('sap.ariba.CommodityCode_MD');
        expect(rows.length).toBe(1);
    });

    it('resolves with the count of records in the input array', async () => {
        const count = await insertData(
            [
                { Domain: 'Goods', UniqueName: 'G001', Name_en: 'C1' },
                { Domain: 'Services', UniqueName: 'S001', Name_en: 'C2' }
            ],
            'TestRealm'
        );
        expect(count).toBe(2);
    });

    it('processes a batch with both new and existing records correctly', async () => {
        await insertData(
            [{ Domain: 'Goods', UniqueName: 'G001', Name_en: 'Original' }],
            'TestRealm'
        );
        await insertData(
            [
                { Domain: 'Goods',    UniqueName: 'G001', Name_en: 'Updated' },
                { Domain: 'Services', UniqueName: 'S001', Name_en: 'New' }
            ],
            'TestRealm'
        );
        const rows = await SELECT.from('sap.ariba.CommodityCode_MD');
        expect(rows.length).toBe(2);
        const updated = rows.find(r => r.UniqueName === 'G001');
        expect(updated.Name_en).toBe('Updated');
    });

    it('distinguishes records with the same UniqueName but different Realm', async () => {
        await insertData([{ Domain: 'Goods', UniqueName: 'G001', Name_en: 'A' }], 'Realm1');
        await insertData([{ Domain: 'Goods', UniqueName: 'G001', Name_en: 'B' }], 'Realm2');
        const rows = await SELECT.from('sap.ariba.CommodityCode_MD');
        expect(rows.length).toBe(2);
    });
});

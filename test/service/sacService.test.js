'use strict';

const srv = require('../helpers/cdsTestHelper');

describe('SAC OData Service /sac', () => {
    it('service boots and exposes a GET method', () => {
        expect(typeof srv.GET).toBe('function');
    });

    it('GET /sac/CommodityCode returns 200 with an empty value array when DB is empty', async () => {
        const { status, data } = await srv.GET('/sac/CommodityCode');
        expect(status).toBe(200);
        expect(Array.isArray(data.value)).toBe(true);
        expect(data.value.length).toBe(0);
    });

    it('GET /sac/SLPSuppliers returns 200', async () => {
        const { status } = await srv.GET('/sac/SLPSuppliers');
        expect(status).toBe(200);
    });

    it('GET /sac/ContractWorkspaces returns 200', async () => {
        const { status } = await srv.GET('/sac/ContractWorkspaces');
        expect(status).toBe(200);
    });

    it('GET /sac/Requisition returns 200', async () => {
        const { status } = await srv.GET('/sac/Requisition');
        expect(status).toBe(200);
    });

    it('GET /sac/PurchaseOrder returns 200', async () => {
        const { status } = await srv.GET('/sac/PurchaseOrder');
        expect(status).toBe(200);
    });

    describe('sacHandler truncation via after-READ hook', () => {
        afterEach(async () => {
            await DELETE.from('sap.ariba.CommodityCode_MD');
        });

        it('returns a CommodityCode record without truncation when Name_en is within its limit', async () => {
            await INSERT.into('sap.ariba.CommodityCode_MD').entries({
                UniqueName: 'G001', Domain: 'Goods', Realm: 'TestRealm', Name_en: 'Short'
            });
            const { data } = await srv.GET('/sac/CommodityCode');
            expect(data.value[0].Name_en).toBe('Short');
        });
    });
});

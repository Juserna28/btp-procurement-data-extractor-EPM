"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return [
        "AclId",
        "cus_sipmresplanvalefiepm_1zsji5",
        "cus_sipmresplanvalefiepm_S1_1zsji5",
        "cus_sipmresplanvalefiepm_S2_1zsji5",
        "cus_sipmresplanvalefiepm_S3_1zsji5",
        "cus_sipmresplanvalefiepm_S4_1zsji5",
        "cus_sipmresplanvalefiepm_S6_1zsji5",
        "cus_sipmresplanvalefiprov_1zsji5",
        "cus_sipmresplanvalefiprov_S1_1zsji5",
        "cus_sipmresplanvalefiprov_S2_1zsji5",
        "cus_sipmresplanvalefiprov_S3_1zsji5",
        "cus_sipmresplanvalefiprov_S4_1zsji5",
        "cus_sipmresplanvalefiprov_S6_1zsji5"
    ];
}

function insertData(aData, realm) {
    return new Promise(async function (resolve, reject) {

        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        }
        logger.info(`Processing ${aData.length} records`);
        var aCleaningProperties = _getAmountPropertiesForDataCleaning();
        let i = 0;
        for (const oData of aData) {

            var oDataCleansed = utils.cleanData(aCleaningProperties, oData, realm);
            oDataCleansed = utils.deduplicateKeys(oDataCleansed);
            oDataCleansed = utils.removeNullValues(oDataCleansed);

            oDataCleansed.cus_sipmresplancate_3xxp4o = utils.normalizeToArray(oDataCleansed.cus_sipmresplancate_3xxp4o);
            oDataCleansed.cus_sipmresplancrit_30acfm = utils.normalizeToArray(oDataCleansed.cus_sipmresplancrit_30acfm);
            oDataCleansed.cus_sipmresplanobj_3qb084 = utils.normalizeToArray(oDataCleansed.cus_sipmresplanobj_3qb084);
            oDataCleansed.cus_sipmresplanprov_fmu1v = utils.normalizeToArray(oDataCleansed.cus_sipmresplanprov_fmu1v);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN").entries(oDataCleansed);
                } else {
                    let cate = utils.normalizeToArray(oDataCleansed["cus_sipmresplancate_3xxp4o"]);
                    delete oDataCleansed["cus_sipmresplancate_3xxp4o"];

                    let crit = utils.normalizeToArray(oDataCleansed["cus_sipmresplancrit_30acfm"]);
                    delete oDataCleansed["cus_sipmresplancrit_30acfm"];

                    let obj = utils.normalizeToArray(oDataCleansed["cus_sipmresplanobj_3qb084"]);
                    delete oDataCleansed["cus_sipmresplanobj_3qb084"];

                    let prov = utils.normalizeToArray(oDataCleansed["cus_sipmresplanprov_fmu1v"]);
                    delete oDataCleansed["cus_sipmresplanprov_fmu1v"];

                    await UPDATE("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadCate(cate, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadCrit(crit, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadObj(obj, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadProv(prov, oDataCleansed.Realm, oDataCleansed.InternalId);
                }

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
            i++;
            if (i % 500 == 0) {
                logger.info(`Upsert ${i} records`);
            }
        }
        resolve(aData.length);
    });
}

const _FK_REALM = "DformSIPMResultadosdelPlandeDesarrollodeProveedor_Realm";
const _FK_INTERNALID = "DformSIPMResultadosdelPlandeDesarrollodeProveedor_InternalId";

async function _FullLoadCate(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancate_3xxp4o_AN").where({
                [_FK_REALM]: Realm,
                [_FK_INTERNALID]: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm;
                item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancate_3xxp4o_AN").entries(item);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadCrit(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancrit_30acfm_AN").where({
                [_FK_REALM]: Realm,
                [_FK_INTERNALID]: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm;
                item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancrit_30acfm_AN").entries(item);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadObj(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanobj_3qb084_AN").where({
                [_FK_REALM]: Realm,
                [_FK_INTERNALID]: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm;
                item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanobj_3qb084_AN").entries(item);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadProv(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanprov_fmu1v_AN").where({
                [_FK_REALM]: Realm,
                [_FK_INTERNALID]: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm;
                item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanprov_fmu1v_AN").entries(item);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

module.exports = {
    insertData
}

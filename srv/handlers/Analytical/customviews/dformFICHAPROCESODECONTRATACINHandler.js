"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return [
        "AclId",
        "cus_dfcupofinal_1zsji5",
        "cus_dfcupofinal_S1_1zsji5",
        "cus_dfcupofinal_S2_1zsji5",
        "cus_dfcupofinal_S3_1zsji5",
        "cus_dfcupofinal_S4_1zsji5",
        "cus_dfcupofinal_S6_1zsji5",
        "cus_dfcupoinicial_1zsji5",
        "cus_dfcupoinicial_S1_1zsji5",
        "cus_dfcupoinicial_S2_1zsji5",
        "cus_dfcupoinicial_S3_1zsji5",
        "cus_dfcupoinicial_S4_1zsji5",
        "cus_dfcupoinicial_S6_1zsji5"
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

            oDataCleansed.cus_customerResourcesIndiquelacausaldesi_30acfm = utils.normalizeToArray(oDataCleansed.cus_customerResourcesIndiquelacausaldesi_30acfm);
            oDataCleansed.cus_customerResourcesIndiquelacausalterm_3qb084 = utils.normalizeToArray(oDataCleansed.cus_customerResourcesIndiquelacausalterm_3qb084);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformFICHAPROCESODECONTRATACIN_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformFICHAPROCESODECONTRATACIN_AN").entries(oDataCleansed);
                } else {
                    let causaldesi = utils.normalizeToArray(oDataCleansed["cus_customerResourcesIndiquelacausaldesi_30acfm"]);
                    delete oDataCleansed["cus_customerResourcesIndiquelacausaldesi_30acfm"];

                    let causalterm = utils.normalizeToArray(oDataCleansed["cus_customerResourcesIndiquelacausalterm_3qb084"]);
                    delete oDataCleansed["cus_customerResourcesIndiquelacausalterm_3qb084"];

                    await UPDATE("sap.ariba.DformFICHAPROCESODECONTRATACIN_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadCausaldesi(causaldesi, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadCausalterm(causalterm, oDataCleansed.Realm, oDataCleansed.InternalId);
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

async function _FullLoadCausaldesi(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausaldesi_30acfm_AN").where({
                DformFICHAPROCESODECONTRATACIN_Realm: Realm,
                DformFICHAPROCESODECONTRATACIN_InternalId: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item["DformFICHAPROCESODECONTRATACIN_Realm"] = Realm;
                item["DformFICHAPROCESODECONTRATACIN_InternalId"] = InternalId;
                await INSERT.into("sap.ariba.DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausaldesi_30acfm_AN").entries(item);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadCausalterm(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausalterm_3qb084_AN").where({
                DformFICHAPROCESODECONTRATACIN_Realm: Realm,
                DformFICHAPROCESODECONTRATACIN_InternalId: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item["DformFICHAPROCESODECONTRATACIN_Realm"] = Realm;
                item["DformFICHAPROCESODECONTRATACIN_InternalId"] = InternalId;
                await INSERT.into("sap.ariba.DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausalterm_3qb084_AN").entries(item);
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

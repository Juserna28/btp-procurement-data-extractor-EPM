"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return [
        "AclId",
        "cus_DFvmpDecimalNumber0001_1zsji5",
        "cus_DFvmpDecimalNumber0002_1zsji5",
        "cus_DFvmpDecimalNumber0003_1zsji5",
        "cus_DFvmpMoney0001_1zsji5",
        "cus_DFvmpMoney0001_S1_1zsji5",
        "cus_DFvmpMoney0001_S2_1zsji5",
        "cus_DFvmpMoney0001_S3_1zsji5",
        "cus_DFvmpMoney0001_S4_1zsji5",
        "cus_DFvmpMoney0001_S6_1zsji5",
        "cus_DFvmpMoney0002_1zsji5",
        "cus_DFvmpMoney0002_S1_1zsji5",
        "cus_DFvmpMoney0002_S2_1zsji5",
        "cus_DFvmpMoney0002_S3_1zsji5",
        "cus_DFvmpMoney0002_S4_1zsji5",
        "cus_DFvmpMoney0002_S6_1zsji5",
        "cus_DFvmpMoney0003_1zsji5",
        "cus_DFvmpMoney0003_S1_1zsji5",
        "cus_DFvmpMoney0003_S2_1zsji5",
        "cus_DFvmpMoney0003_S3_1zsji5",
        "cus_DFvmpMoney0003_S4_1zsji5",
        "cus_DFvmpMoney0003_S6_1zsji5",
        "cus_DFvmpMoney0004_1zsji5",
        "cus_DFvmpMoney0004_S1_1zsji5",
        "cus_DFvmpMoney0004_S2_1zsji5",
        "cus_DFvmpMoney0004_S3_1zsji5",
        "cus_DFvmpMoney0004_S4_1zsji5",
        "cus_DFvmpMoney0004_S6_1zsji5",
        "cus_DFvmpPercentage0001_1zsji5",
        "cus_DFvmpPercentage0002_1zsji5",
        "cus_DFvmpPercentage0003_1zsji5"
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

            oDataCleansed.cus_DFvmpTextMSelect0001_30acfm = utils.normalizeToArray(oDataCleansed.cus_DFvmpTextMSelect0001_30acfm);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformVALIDACINMERCADODEPROVEEDORES_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformVALIDACINMERCADODEPROVEEDORES_AN").entries(oDataCleansed);
                } else {
                    let textMSelect = utils.normalizeToArray(oDataCleansed["cus_DFvmpTextMSelect0001_30acfm"]);
                    delete oDataCleansed["cus_DFvmpTextMSelect0001_30acfm"];

                    await UPDATE("sap.ariba.DformVALIDACINMERCADODEPROVEEDORES_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadTextMSelect(textMSelect, oDataCleansed.Realm, oDataCleansed.InternalId);
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

async function _FullLoadTextMSelect(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformVALIDACINMERCADODEPROVEEDORES_cus_DFvmpTextMSelect0001_30acfm_AN").where({
                DformVALIDACINMERCADODEPROVEEDORES_Realm: Realm,
                DformVALIDACINMERCADODEPROVEEDORES_InternalId: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item["DformVALIDACINMERCADODEPROVEEDORES_Realm"] = Realm;
                item["DformVALIDACINMERCADODEPROVEEDORES_InternalId"] = InternalId;
                await INSERT.into("sap.ariba.DformVALIDACINMERCADODEPROVEEDORES_cus_DFvmpTextMSelect0001_30acfm_AN").entries(item);
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

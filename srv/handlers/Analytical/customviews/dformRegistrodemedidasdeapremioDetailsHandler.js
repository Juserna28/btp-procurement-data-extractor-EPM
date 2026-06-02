"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return [
        "AclId",
        "cus_cmmevalor_22xqcb",
        "cus_cmmevalor_S1_22xqcb",
        "cus_cmmevalor_S2_22xqcb",
        "cus_cmmevalor_S3_22xqcb",
        "cus_cmmevalor_S4_22xqcb",
        "cus_cmmevalor_S6_22xqcb"
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
            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformRegistrodemedidasdeapremioDetails_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        DFormId: oDataCleansed.DFormId,
                        DetailLineNumber: oDataCleansed.DetailLineNumber
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformRegistrodemedidasdeapremioDetails_AN").entries(oDataCleansed);
                } else {
                    await UPDATE("sap.ariba.DformRegistrodemedidasdeapremioDetails_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            DFormId: oDataCleansed.DFormId,
                            DetailLineNumber: oDataCleansed.DetailLineNumber
                        });
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

module.exports = {
    insertData
}

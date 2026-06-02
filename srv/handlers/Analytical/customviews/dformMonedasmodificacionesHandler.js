"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return ["AclId"];
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

            oDataCleansed.cus_dform3_pby9w = utils.normalizeToArray(oDataCleansed.cus_dform3_pby9w);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformMonedasmodificaciones_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformMonedasmodificaciones_AN").entries(oDataCleansed);
                } else {
                    let dform3 = utils.normalizeToArray(oDataCleansed["cus_dform3_pby9w"]);
                    delete oDataCleansed["cus_dform3_pby9w"];

                    await UPDATE("sap.ariba.DformMonedasmodificaciones_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadDform3(dform3, oDataCleansed.Realm, oDataCleansed.InternalId);
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

async function _FullLoadDform3(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformMonedasmodificaciones_cus_dform3_pby9w_AN").where({
                DformMonedasmodificaciones_Realm: Realm,
                DformMonedasmodificaciones_InternalId: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item["DformMonedasmodificaciones_Realm"] = Realm;
                item["DformMonedasmodificaciones_InternalId"] = InternalId;
                await INSERT.into("sap.ariba.DformMonedasmodificaciones_cus_dform3_pby9w_AN").entries(item);
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

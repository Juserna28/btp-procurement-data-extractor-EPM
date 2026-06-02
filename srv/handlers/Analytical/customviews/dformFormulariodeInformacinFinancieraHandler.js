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

            oDataCleansed.cus_Proveedor_fmu1v = utils.normalizeToArray(oDataCleansed.cus_Proveedor_fmu1v);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformFormulariodeInformacinFinanciera_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformFormulariodeInformacinFinanciera_AN").entries(oDataCleansed);
                } else {
                    let proveedor = utils.normalizeToArray(oDataCleansed["cus_Proveedor_fmu1v"]);
                    delete oDataCleansed["cus_Proveedor_fmu1v"];

                    await UPDATE("sap.ariba.DformFormulariodeInformacinFinanciera_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadProveedor(proveedor, oDataCleansed.Realm, oDataCleansed.InternalId);
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

async function _FullLoadProveedor(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFormulariodeInformacinFinanciera_cus_Proveedor_fmu1v_AN").where({
                DformFormulariodeInformacinFinanciera_Realm: Realm,
                DformFormulariodeInformacinFinanciera_InternalId: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item["DformFormulariodeInformacinFinanciera_Realm"] = Realm;
                item["DformFormulariodeInformacinFinanciera_InternalId"] = InternalId;
                await INSERT.into("sap.ariba.DformFormulariodeInformacinFinanciera_cus_Proveedor_fmu1v_AN").entries(item);
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

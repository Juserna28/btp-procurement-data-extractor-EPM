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

            oDataCleansed.cus_DFArticulos2_4f9nvq = utils.normalizeToArray(oDataCleansed.cus_DFArticulos2_4f9nvq);
            oDataCleansed.cus_Requisitos_30acfm = utils.normalizeToArray(oDataCleansed.cus_Requisitos_30acfm);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformHomologacinProveedores_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformHomologacinProveedores_AN").entries(oDataCleansed);
                } else {
                    let articulos = utils.normalizeToArray(oDataCleansed["cus_DFArticulos2_4f9nvq"]);
                    delete oDataCleansed["cus_DFArticulos2_4f9nvq"];

                    let requisitos = utils.normalizeToArray(oDataCleansed["cus_Requisitos_30acfm"]);
                    delete oDataCleansed["cus_Requisitos_30acfm"];

                    await UPDATE("sap.ariba.DformHomologacinProveedores_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadArticulos(articulos, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadRequisitos(requisitos, oDataCleansed.Realm, oDataCleansed.InternalId);
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

async function _FullLoadArticulos(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformHomologacinProveedores_cus_DFArticulos2_4f9nvq_AN").where({
                DformHomologacinProveedores_Realm: Realm,
                DformHomologacinProveedores_InternalId: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item["DformHomologacinProveedores_Realm"] = Realm;
                item["DformHomologacinProveedores_InternalId"] = InternalId;
                await INSERT.into("sap.ariba.DformHomologacinProveedores_cus_DFArticulos2_4f9nvq_AN").entries(item);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadRequisitos(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformHomologacinProveedores_cus_Requisitos_30acfm_AN").where({
                DformHomologacinProveedores_Realm: Realm,
                DformHomologacinProveedores_InternalId: InternalId
            });
        } catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }
        for (const item of items) {
            try {
                item["DformHomologacinProveedores_Realm"] = Realm;
                item["DformHomologacinProveedores_InternalId"] = InternalId;
                await INSERT.into("sap.ariba.DformHomologacinProveedores_cus_Requisitos_30acfm_AN").entries(item);
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

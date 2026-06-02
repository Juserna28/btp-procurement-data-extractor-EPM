"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");


//Amount fields in object
function _getAmountPropertiesForDataCleaning() {
    return [
        "ProjectBaselineSpend",
        "BaselineSpend",
        "EstimatedSpend",
        "EstimatedSavings",
        "EstimatedSavingsPct",
        "NegotiatedSpend",
        "NegotiatedSavings",
        "NegotiatedSavingsPct",
        "ImplementedSpend",
        "ImplementedSavings",
        "ImplementedSavingsPct",
        "ActualSpend",
        "ActualSavings",
        "ActualSavingsPct",
        "ProjectBaselineSpendB",
        "ProjectBaselineSpendC",
        "BaselineSpendB",
        "BaselineSpendC",
        "EstimatedSpendB",
        "EstimatedSpendC",
        "EstimatedSavingsB",
        "EstimatedSavingsC",
        "NegotiatedSpendB",
        "NegotiatedSpendC",
        "NegotiatedSavingsB",
        "NegotiatedSavingsC",
        "ImplementedSpendB",
        "ImplementedSpendC",
        "ImplementedSavingsB",
        "ImplementedSavingsC",
        "ActualSpendB",
        "ActualSpendC",
        "ActualSavingsB",
        "ActualSavingsC"
    ];
}


function insertData(aData, realm) {
    return new Promise(async function (resolve, reject) {


        if (!aData || aData.length === 0) {
            resolve(0);
            return;
        } logger.info(`Processing ${aData.length} records`);
        var aCleaningProperties = _getAmountPropertiesForDataCleaning();
        let i = 0;
        for (const oData of aData) {

            var oDataCleansed = utils.cleanData(aCleaningProperties, oData, realm);
            oDataCleansed = utils.deduplicateKeys(oDataCleansed);
            oDataCleansed = utils.removeNullValues(oDataCleansed);
            // oDataCleansed = utils.processCustomFields(oDataCleansed);

            oDataCleansed.cus_tipocontrato_3dcan0 = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_3dcan0);
            oDataCleansed.cus_ProyectoyoProceso_agkd9 = utils.normalizeToArray(oDataCleansed.cus_ProyectoyoProceso_agkd9);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                //Select record by Unique key
                let res = await SELECT.from("sap.ariba.SavingsAllocationDetails_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        SavingsAllocationId: oDataCleansed.SavingsAllocationId
                    });

                if (res.length == 0) {
                    //New record, insert
                    await INSERT.into("sap.ariba.SavingsAllocationDetails_AN").entries(oDataCleansed);

                } else {
                    //Update existing record

                    let tipocontrato = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_3dcan0"]);
                    delete oDataCleansed["cus_tipocontrato_3dcan0"];

                    let proyectoyoProceso = utils.normalizeToArray(oDataCleansed["cus_ProyectoyoProceso_agkd9"]);
                    delete oDataCleansed["cus_ProyectoyoProceso_agkd9"];

                    await UPDATE("sap.ariba.SavingsAllocationDetails_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            SavingsAllocationId: oDataCleansed.SavingsAllocationId
                        });

                    await _FullLoadTipoContrato(tipocontrato, oDataCleansed.Realm, oDataCleansed.SavingsAllocationId);
                    await _FullLoadProyectoyoProceso(proyectoyoProceso, oDataCleansed.Realm, oDataCleansed.SavingsAllocationId);

                }

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                //abort full file
                reject(e);
                break;
            }
            //Monitoring
            i++;
            if (i % 500 == 0) {
                logger.info(`Upsert ${i} records`);
            }

        }
        resolve(aData.length);
    });

}




async function _FullLoadTipoContrato(tipocontrato, Realm, SavingsAllocationId) {
    return new Promise(async (resolve, reject) => {
        tipocontrato = utils.normalizeToArray(tipocontrato);
        //Delete old records
        try {
            await DELETE("sap.ariba.SavingsAllocationDetails_tipocontrato_AN").where({
                SavingsAllocation_Realm: Realm,
                SavingsAllocation_SavingsAllocationId: SavingsAllocationId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const tc of tipocontrato) {
            try {

                tc["SavingsAllocation_Realm"] = Realm;
                tc["SavingsAllocation_SavingsAllocationId"] = SavingsAllocationId;
                await INSERT.into("sap.ariba.SavingsAllocationDetails_tipocontrato_AN").entries(tc);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadProyectoyoProceso(proyectoyoProceso, Realm, SavingsAllocationId) {
    return new Promise(async (resolve, reject) => {
        proyectoyoProceso = utils.normalizeToArray(proyectoyoProceso);
        //Delete old records
        try {
            await DELETE("sap.ariba.SavingsAllocationDetails_ProyectoyoProceso_AN").where({
                SavingsAllocation_Realm: Realm,
                SavingsAllocation_SavingsAllocationId: SavingsAllocationId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const pp of proyectoyoProceso) {
            try {

                pp["SavingsAllocation_Realm"] = Realm;
                pp["SavingsAllocation_SavingsAllocationId"] = SavingsAllocationId;
                await INSERT.into("sap.ariba.SavingsAllocationDetails_ProyectoyoProceso_AN").entries(pp);

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
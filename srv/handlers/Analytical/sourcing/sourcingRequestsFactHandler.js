"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");


//Amount fields in object
function _getAmountPropertiesForDataCleaning() {
    return [
        "Duration",
        "BaselineSpend",
        "ActualSaving",
        "TargetSavingsPct",
        "ContractMonths"
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
            // oDataCleansed = utils.processCustomFields(oDataCleansed);
            oDataCleansed = utils.removeNullValues(oDataCleansed);

            oDataCleansed.Organization = utils.normalizeToArray(oDataCleansed.Organization);
            oDataCleansed.Commodity = utils.normalizeToArray(oDataCleansed.Commodity);
            oDataCleansed.AllOwners = utils.normalizeToArray(oDataCleansed.AllOwners);
            oDataCleansed.Suppliers = utils.normalizeToArray(oDataCleansed.Suppliers);
            oDataCleansed.Region = utils.normalizeToArray(oDataCleansed.Region);
            oDataCleansed.cus_tipocontrato_kaon8 = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_kaon8);
            oDataCleansed.cus_ProyectoyoProceso_1x8ghx = utils.normalizeToArray(oDataCleansed.cus_ProyectoyoProceso_1x8ghx);


            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                //Select record by Unique key
                let res = await SELECT.from("sap.ariba.SourcingRequests_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        ProjectId: oDataCleansed.ProjectId
                    });

                if (res.length == 0) {
                    //New record, insert
                    await INSERT.into("sap.ariba.SourcingRequests_AN").entries(oDataCleansed);

                } else {
                    //Update existing record
                    //Full Load of SourcingRequestss_Organization SourcingRequestss_AllOwners SourcingRequestss_Suppliers SourcingRequestss_Commodity SourcingRequestss_Region

                    let organizations = utils.normalizeToArray(oDataCleansed["Organization"]);
                    delete oDataCleansed["Organization"];

                    let commodities = utils.normalizeToArray(oDataCleansed["Commodity"]);
                    delete oDataCleansed["Commodity"];

                    let owners = utils.normalizeToArray(oDataCleansed["AllOwners"]);
                    delete oDataCleansed["AllOwners"];

                    let suppliers = utils.normalizeToArray(oDataCleansed["Suppliers"]);
                    delete oDataCleansed["Suppliers"];

                    let regions = utils.normalizeToArray(oDataCleansed["Region"]);
                    delete oDataCleansed["Region"];

                    let tipocontrato = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_kaon8"]);
                    delete oDataCleansed["cus_tipocontrato_kaon8"];

                    let proyectoyoProceso = utils.normalizeToArray(oDataCleansed["cus_ProyectoyoProceso_1x8ghx"]);
                    delete oDataCleansed["cus_ProyectoyoProceso_1x8ghx"];

                    await UPDATE("sap.ariba.SourcingRequests_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            ProjectId: oDataCleansed.ProjectId
                        });

                    await _FullLoadOrganization(organizations, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadOwners(owners, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadCommodities(commodities, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadSuppliers(suppliers, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadRegions(regions, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadTipoContrato(tipocontrato, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadProyectoyoProceso(proyectoyoProceso, oDataCleansed.Realm, oDataCleansed.ProjectId);


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

async function _FullLoadRegions(regions, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        regions = utils.normalizeToArray(regions);
        //Delete old records
        try {
            await DELETE("sap.ariba.SourcingRequests_Region_AN").where({
                SourcingRequests_Realm: Realm,
                SourcingRequests_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const re of regions) {
            try {

                re["SourcingRequests_Realm"] = Realm;
                re["SourcingRequests_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SourcingRequests_Region_AN").entries(re);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadSuppliers(suppliers, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        suppliers = utils.normalizeToArray(suppliers);
        //Delete old records
        try {
            await DELETE("sap.ariba.SourcingRequests_Suppliers_AN").where({
                SourcingRequests_Realm: Realm,
                SourcingRequests_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const supp of suppliers) {
            try {

                supp["SourcingRequests_Realm"] = Realm;
                supp["SourcingRequests_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SourcingRequests_Suppliers_AN").entries(supp);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadCommodities(commodities, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        commodities = utils.normalizeToArray(commodities);
        //Delete old records
        try {
            await DELETE("sap.ariba.SourcingRequests_Commodity_AN").where({
                SourcingRequests_Realm: Realm,
                SourcingRequests_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const comm of commodities) {
            try {

                comm["SourcingRequests_Realm"] = Realm;
                comm["SourcingRequests_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SourcingRequests_Commodity_AN").entries(comm);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadOwners(owners, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        owners = utils.normalizeToArray(owners);
        //Delete old records
        try {
            await DELETE("sap.ariba.SourcingRequests_AllOwners_AN").where({
                SourcingRequests_Realm: Realm,
                SourcingRequests_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const owner of owners) {
            try {

                owner["SourcingRequests_Realm"] = Realm;
                owner["SourcingRequests_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SourcingRequests_AllOwners_AN").entries(owner);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadOrganization(organizations, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        organizations = utils.normalizeToArray(organizations);
        //Delete old records
        try {
            await DELETE("sap.ariba.SourcingRequests_Organization_AN").where({
                SourcingRequests_Realm: Realm,
                SourcingRequests_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const org of organizations) {
            try {

                org["SourcingRequests_Realm"] = Realm;
                org["SourcingRequests_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SourcingRequests_Organization_AN").entries(org);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}


async function _FullLoadTipoContrato(tipocontrato, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        tipocontrato = utils.normalizeToArray(tipocontrato);
        //Delete old records
        try {
            await DELETE("sap.ariba.SourcingRequests_tipocontrato_AN").where({
                SourcingRequests_Realm: Realm,
                SourcingRequests_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const tc of tipocontrato) {
            try {

                tc["SourcingRequests_Realm"] = Realm;
                tc["SourcingRequests_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SourcingRequests_tipocontrato_AN").entries(tc);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadProyectoyoProceso(proyectoyoProceso, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        proyectoyoProceso = utils.normalizeToArray(proyectoyoProceso);
        //Delete old records
        try {
            await DELETE("sap.ariba.SourcingRequests_ProyectoyoProceso_AN").where({
                SourcingRequests_Realm: Realm,
                SourcingRequests_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const pp of proyectoyoProceso) {
            try {

                pp["SourcingRequests_Realm"] = Realm;
                pp["SourcingRequests_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SourcingRequests_ProyectoyoProceso_AN").entries(pp);

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
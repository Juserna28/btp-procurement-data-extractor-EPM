"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");


//Amount fields in object
function _getAmountPropertiesForDataCleaning() {
    return ["Duration",
        "Amount",
        "ProposedAmount",
        "OrigProposedAmount",
        "OrigAmount",
        "ComplexSpendAvailableAmount",
        "ProposedIncrementalAmount",
        "ApprovedAmount",
        "cus_valoriva_4am5bi",
        "cus_valoriva_S1_4am5bi",
        "cus_valoriva_S2_4am5bi",
        "cus_valoriva_S3_4am5bi",
        "cus_valoriva_S4_4am5bi",
        "cus_valoriva_S6_4am5bi"
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

            oDataCleansed.Commodity = utils.normalizeToArray(oDataCleansed.Commodity);
            oDataCleansed.Organization = utils.normalizeToArray(oDataCleansed.Organization);
            oDataCleansed.Region = utils.normalizeToArray(oDataCleansed.Region);
            oDataCleansed.AffectedParties = utils.normalizeToArray(oDataCleansed.AffectedParties);
            oDataCleansed.AllOwners = utils.normalizeToArray(oDataCleansed.AllOwners);
            oDataCleansed.cus_tipocontrato_2zjsst = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_2zjsst);
            oDataCleansed.cus_ProyectoyoProceso_4chkni = utils.normalizeToArray(oDataCleansed.cus_ProyectoyoProceso_4chkni);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                //Select record by Unique key
                let res = await SELECT.from("sap.ariba.ContractWorkspaces_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        ProjectId: oDataCleansed.ProjectId
                    });

                if (res.length == 0) {
                    //New record, insert
                    await INSERT.into("sap.ariba.ContractWorkspaces_AN").entries(oDataCleansed);

                } else {
                    //Update existing record
                    //Full Load of ContractWorkspaces_Organization ContractWorkspaces_AllOwners ContractWorkspaces_AffectedParties ContractWorkspaces_Commodity ContractWorkspaces_Region

                    let commodities = utils.normalizeToArray(oDataCleansed["Commodity"]);
                    delete oDataCleansed["Commodity"];

                    let organizations = utils.normalizeToArray(oDataCleansed["Organization"]);
                    delete oDataCleansed["Organization"];

                    let regions = utils.normalizeToArray(oDataCleansed["Region"]);
                    delete oDataCleansed["Region"];

                    let affectedParties = utils.normalizeToArray(oDataCleansed["AffectedParties"]);
                    delete oDataCleansed["AffectedParties"];

                    let allOwners = utils.normalizeToArray(oDataCleansed["AllOwners"]);
                    delete oDataCleansed["AllOwners"];

                    let tipocontrato = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_2zjsst"]);
                    delete oDataCleansed["cus_tipocontrato_2zjsst"];

                    let proyectoyoProceso = utils.normalizeToArray(oDataCleansed["cus_ProyectoyoProceso_4chkni"]);
                    delete oDataCleansed["cus_ProyectoyoProceso_4chkni"];

                    await UPDATE("sap.ariba.ContractWorkspaces_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            ProjectId: oDataCleansed.ProjectId
                        });

                    await _FullLoadOrganization(organizations, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadAllOwners(allOwners, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadCommodities(commodities, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadAffectedParties(affectedParties, oDataCleansed.Realm, oDataCleansed.ProjectId);
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
            await DELETE("sap.ariba.ContractWorkspaces_Region_AN").where({
                ContractWorkspace_Realm: Realm,
                ContractWorkspace_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const re of regions) {
            try {
                re["ContractWorkspace_Realm"] = Realm;
                re["ContractWorkspace_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.ContractWorkspaces_Region_AN").entries(re);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadAffectedParties(affectedParties, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        affectedParties = utils.normalizeToArray(affectedParties);
        //Delete old records
        try {
            await DELETE("sap.ariba.ContractWorkspaces_AffectedParties_AN").where({
                ContractWorkspace_Realm: Realm,
                ContractWorkspace_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const ap of affectedParties) {
            try {
                ap["ContractWorkspace_Realm"] = Realm;
                ap["ContractWorkspace_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.ContractWorkspaces_AffectedParties_AN").entries(ap);
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
            await DELETE("sap.ariba.ContractWorkspaces_Commodity_AN").where({
                ContractWorkspace_Realm: Realm,
                ContractWorkspace_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const comm of commodities) {
            try {
                comm["ContractWorkspace_Realm"] = Realm;
                comm["ContractWorkspace_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.ContractWorkspaces_Commodity_AN").entries(comm);
            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadAllOwners(allOwners, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        allOwners = utils.normalizeToArray(allOwners);
        //Delete old records
        try {
            await DELETE("sap.ariba.ContractWorkspaces_AllOwners_AN").where({
                ContractWorkspace_Realm: Realm,
                ContractWorkspace_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const owner of allOwners) {
            try {
                owner["ContractWorkspace_Realm"] = Realm;
                owner["ContractWorkspace_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.ContractWorkspaces_AllOwners_AN").entries(owner);
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
            await DELETE("sap.ariba.ContractWorkspaces_Organization_AN").where({
                ContractWorkspace_Realm: Realm,
                ContractWorkspace_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const org of organizations) {
            try {
                org["ContractWorkspace_Realm"] = Realm;
                org["ContractWorkspace_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.ContractWorkspaces_Organization_AN").entries(org);
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
            await DELETE("sap.ariba.ContractWorkspaces_tipocontrato_AN").where({
                ContractWorkspace_Realm: Realm,
                ContractWorkspace_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const tc of tipocontrato) {
            try {
                tc["ContractWorkspace_Realm"] = Realm;
                tc["ContractWorkspace_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.ContractWorkspaces_tipocontrato_AN").entries(tc);
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
            await DELETE("sap.ariba.ContractWorkspaces_ProyectoyoProceso_AN").where({
                ContractWorkspace_Realm: Realm,
                ContractWorkspace_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const pp of proyectoyoProceso) {
            try {
                pp["ContractWorkspace_Realm"] = Realm;
                pp["ContractWorkspace_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.ContractWorkspaces_ProyectoyoProceso_AN").entries(pp);
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
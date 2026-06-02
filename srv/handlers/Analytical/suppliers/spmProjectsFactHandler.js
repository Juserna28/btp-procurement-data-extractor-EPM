"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");


//Amount fields in object
function _getAmountPropertiesForDataCleaning() {
    return [
        "Duration"
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
            oDataCleansed.Region = utils.normalizeToArray(oDataCleansed.Region);
            oDataCleansed.cus_tipocontrato_jh6yz = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_jh6yz);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                //Select record by Unique key
                let res = await SELECT.from("sap.ariba.SPMProjects_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        ProjectId: oDataCleansed.ProjectId
                    });

                if (res.length == 0) {
                    //New record, insert
                    await INSERT.into("sap.ariba.SPMProjects_AN").entries(oDataCleansed);

                } else {

                    let organizations = utils.normalizeToArray(oDataCleansed["Organization"]);
                    delete oDataCleansed["Organization"];

                    let commodities = utils.normalizeToArray(oDataCleansed["Commodity"]);
                    delete oDataCleansed["Commodity"];

                    let allOwners = utils.normalizeToArray(oDataCleansed["AllOwners"]);
                    delete oDataCleansed["AllOwners"];

                    let regions = utils.normalizeToArray(oDataCleansed["Region"]);
                    delete oDataCleansed["Region"];

                    let tipocontrato = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_jh6yz"]);
                    delete oDataCleansed["cus_tipocontrato_jh6yz"];


                    //Update existing record
                    await UPDATE("sap.ariba.SPMProjects_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            ProjectId: oDataCleansed.ProjectId
                        });

                    await _FullLoadOrganization(organizations, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadCommodities(commodities, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadAllOwners(allOwners, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadRegions(regions, oDataCleansed.Realm, oDataCleansed.ProjectId);
                    await _FullLoadTipocontrato(tipocontrato, oDataCleansed.Realm, oDataCleansed.ProjectId);


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
            await DELETE("sap.ariba.SPMProjects_Region_AN").where({
                SPMProjects_Realm: Realm,
                SPMProjects_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const re of regions) {
            try {

                re["SPMProjects_Realm"] = Realm;
                re["SPMProjects_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SPMProjects_Region_AN").entries(re);

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
            await DELETE("sap.ariba.SPMProjects_AllOwners_AN").where({
                SPMProjects_Realm: Realm,
                SPMProjects_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const owner of allOwners) {
            try {

                owner["SPMProjects_Realm"] = Realm;
                owner["SPMProjects_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SPMProjects_AllOwners_AN").entries(owner);

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
            await DELETE("sap.ariba.SPMProjects_Commodity_AN").where({
                SPMProjects_Realm: Realm,
                SPMProjects_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const comm of commodities) {
            try {

                comm["SPMProjects_Realm"] = Realm;
                comm["SPMProjects_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SPMProjects_Commodity_AN").entries(comm);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadTipocontrato(tipocontrato, Realm, ProjectId) {
    return new Promise(async (resolve, reject) => {
        tipocontrato = utils.normalizeToArray(tipocontrato);
        //Delete old records
        try {
            await DELETE("sap.ariba.SPMProjects_tipocontrato_AN").where({
                SPMProjects_Realm: Realm,
                SPMProjects_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const tc of tipocontrato) {
            try {

                tc["SPMProjects_Realm"] = Realm;
                tc["SPMProjects_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SPMProjects_tipocontrato_AN").entries(tc);

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
            await DELETE("sap.ariba.SPMProjects_Organization_AN").where({
                SPMProjects_Realm: Realm,
                SPMProjects_ProjectId: ProjectId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const org of organizations) {
            try {

                org["SPMProjects_Realm"] = Realm;
                org["SPMProjects_ProjectId"] = ProjectId;
                await INSERT.into("sap.ariba.SPMProjects_Organization_AN").entries(org);

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
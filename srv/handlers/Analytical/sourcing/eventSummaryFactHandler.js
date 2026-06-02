"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");


//Amount fields in object
function _getAmountPropertiesForDataCleaning() {
    return [];
}

function _FlatteningData(oData) {

    //Structure flattening
    oData.EventId = oData.Event.EventId;
    oData.ItemId = oData.Event.ItemId;
    oData.EventVersion = oData.Event.VersionNumber;
    return oData;
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
            oDataCleansed = _FlatteningData(oDataCleansed);
            // oDataCleansed = utils.processCustomFields(oDataCleansed);
            oDataCleansed = utils.removeNullValues(oDataCleansed);

            oDataCleansed.Department = utils.normalizeToArray(oDataCleansed.Department);
            oDataCleansed.Commodity = utils.normalizeToArray(oDataCleansed.Commodity);
            oDataCleansed.BiddedSuppliers = utils.normalizeToArray(oDataCleansed.BiddedSuppliers);
            oDataCleansed.Region = utils.normalizeToArray(oDataCleansed.Region);
            oDataCleansed.cus_tipocontrato_31ofxv = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_31ofxv);
            oDataCleansed.cus_ProyectoyoProceso_4em7sk = utils.normalizeToArray(oDataCleansed.cus_ProyectoyoProceso_4em7sk);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                //Select record by Unique key
                let res = await SELECT.from("sap.ariba.EventSummary_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        EventId: oDataCleansed.EventId,
                        ItemId: oDataCleansed.ItemId,
                        EventVersion: oDataCleansed.EventVersion
                    });

                if (res.length == 0) {
                    //New record, insert
                    await INSERT.into("sap.ariba.EventSummary_AN").entries(oDataCleansed);

                } else {
                    //Update existing record
                    //Full Load of SourcingProjects_Organization SourcingProjects_AllOwners SourcingProjects_Suppliers SourcingProjects_Commodity SourcingProjects_Region

                    let departments = utils.normalizeToArray(oDataCleansed["Department"]);
                    delete oDataCleansed["Department"];

                    let commodities = utils.normalizeToArray(oDataCleansed["Commodity"]);
                    delete oDataCleansed["Commodity"];

                    let suppliers = utils.normalizeToArray(oDataCleansed["BiddedSuppliers"]);
                    delete oDataCleansed["BiddedSuppliers"];

                    let regions = utils.normalizeToArray(oDataCleansed["Region"]);
                    delete oDataCleansed["Region"];

                    let tipocontrato = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_31ofxv"]);
                    delete oDataCleansed["cus_tipocontrato_31ofxv"];

                    let proyectoyoProceso = utils.normalizeToArray(oDataCleansed["cus_ProyectoyoProceso_4em7sk"]);
                    delete oDataCleansed["cus_ProyectoyoProceso_4em7sk"];

                    await UPDATE("sap.ariba.EventSummary_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            EventId: oDataCleansed.EventId,
                            ItemId: oDataCleansed.ItemId,
                            EventVersion: oDataCleansed.EventVersion
                        });

                    await _FullLoadOrganization(departments, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.ItemId, oDataCleansed.EventVersion);
                    await _FullLoadCommodities(commodities, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.ItemId, oDataCleansed.EventVersion);
                    await _FullLoadSuppliers(suppliers, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.ItemId, oDataCleansed.EventVersion);
                    await _FullLoadRegions(regions, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.ItemId, oDataCleansed.EventVersion);
                    await _FullLoadTipoContrato(tipocontrato, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.ItemId, oDataCleansed.EventVersion);
                    await _FullLoadProyectoyoProceso(proyectoyoProceso, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.ItemId, oDataCleansed.EventVersion);

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

async function _FullLoadRegions(regions, Realm, EventId, ItemId, EventVersion) {
    return new Promise(async (resolve, reject) => {
        regions = utils.normalizeToArray(regions);
        //Delete old records
        try {
            await DELETE("sap.ariba.EventSummary_Region_AN").where({
                EventSummary_Realm: Realm,
                EventSummary_EventId: EventId,
                EventSummary_ItemId: ItemId,
                EventSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const re of regions) {
            try {

                re["EventSummary_Realm"] = Realm;
                re["EventSummary_EventId"] = EventId;
                re["EventSummary_ItemId"] = ItemId;
                re["EventSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventSummary_Region_AN").entries(re);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadSuppliers(suppliers, Realm, EventId, ItemId, EventVersion) {
    return new Promise(async (resolve, reject) => {
        suppliers = utils.normalizeToArray(suppliers);
        //Delete old records
        try {
            await DELETE("sap.ariba.EventSummary_BiddedSuppliers_AN").where({
                EventSummary_Realm: Realm,
                EventSummary_EventId: EventId,
                EventSummary_ItemId: ItemId,
                EventSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const supp of suppliers) {
            try {

                supp["EventSummary_Realm"] = Realm;
                supp["EventSummary_EventId"] = EventId;
                supp["EventSummary_ItemId"] = ItemId;
                supp["EventSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventSummary_BiddedSuppliers_AN").entries(supp);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadCommodities(commodities, Realm, EventId, ItemId, EventVersion) {
    return new Promise(async (resolve, reject) => {
        commodities = utils.normalizeToArray(commodities);
        //Delete old records
        try {
            await DELETE("sap.ariba.EventSummary_Commodity_AN").where({
                EventSummary_Realm: Realm,
                EventSummary_EventId: EventId,
                EventSummary_ItemId: ItemId,
                EventSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const comm of commodities) {
            try {

                comm["EventSummary_Realm"] = Realm;
                comm["EventSummary_EventId"] = EventId;
                comm["EventSummary_ItemId"] = ItemId;
                comm["EventSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventSummary_Commodity_AN").entries(comm);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}


async function _FullLoadOrganization(organizations, Realm, EventId, ItemId, EventVersion) {
    return new Promise(async (resolve, reject) => {
        organizations = utils.normalizeToArray(organizations);
        //Delete old records
        try {
            await DELETE("sap.ariba.EventSummary_Department_AN").where({
                EventSummary_Realm: Realm,
                EventSummary_EventId: EventId,
                EventSummary_ItemId: ItemId,
                EventSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const org of organizations) {
            try {

                org["EventSummary_Realm"] = Realm;
                org["EventSummary_EventId"] = EventId;
                org["EventSummary_ItemId"] = ItemId;
                org["EventSummary_EventVersion"] = EventVersion;

                await INSERT.into("sap.ariba.EventSummary_Department_AN").entries(org);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}


async function _FullLoadTipoContrato(tipocontrato, Realm, EventId, ItemId, EventVersion) {
    return new Promise(async (resolve, reject) => {
        tipocontrato = utils.normalizeToArray(tipocontrato);
        //Delete old records
        try {
            await DELETE("sap.ariba.EventSummary_tipocontrato_AN").where({
                EventSummary_Realm: Realm,
                EventSummary_EventId: EventId,
                EventSummary_ItemId: ItemId,
                EventSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const tc of tipocontrato) {
            try {

                tc["EventSummary_Realm"] = Realm;
                tc["EventSummary_EventId"] = EventId;
                tc["EventSummary_ItemId"] = ItemId;
                tc["EventSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventSummary_tipocontrato_AN").entries(tc);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadProyectoyoProceso(proyectoyoProceso, Realm, EventId, ItemId, EventVersion) {
    return new Promise(async (resolve, reject) => {
        proyectoyoProceso = utils.normalizeToArray(proyectoyoProceso);
        //Delete old records
        try {
            await DELETE("sap.ariba.EventSummary_ProyectoyoProceso_AN").where({
                EventSummary_Realm: Realm,
                EventSummary_EventId: EventId,
                EventSummary_ItemId: ItemId,
                EventSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const pp of proyectoyoProceso) {
            try {

                pp["EventSummary_Realm"] = Realm;
                pp["EventSummary_EventId"] = EventId;
                pp["EventSummary_ItemId"] = ItemId;
                pp["EventSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventSummary_ProyectoyoProceso_AN").entries(pp);

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
"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");


//Amount fields in object
function _getAmountPropertiesForDataCleaning() {
    return [
        "BaselineSpend",
        "ContractMonths",
        "ItemQuantity",
        "HistTotalCost",
        "ResvTotalCost",
        "IncumbentQuantity",
        "IncumbentTotalCost",
        "MktLeadQuantity",
        "MktLeadTotalCost",
        "InitialTotalCost",
        "LeadPreBidTotalCost",
        "AwardedQuantity",
        "AwardedTotalCost",
        "AwardedHistSpend",
        "PendingHistSpend",
        "LeadingSavings",
        "PendingSpend",
        "PendingSavings",
        "TargetSavings"
    ];
}

function _FlatteningData(oData) {
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
            oDataCleansed = _FlatteningData(oDataCleansed);
            oDataCleansed = utils.deduplicateKeys(oDataCleansed);
            // oDataCleansed = utils.processCustomFields(oDataCleansed);

            oDataCleansed.Department = utils.normalizeToArray(oDataCleansed.Department);
            oDataCleansed.ItemCommodity = utils.normalizeToArray(oDataCleansed.ItemCommodity);
            oDataCleansed.InvitedSuppliers = utils.normalizeToArray(oDataCleansed.InvitedSuppliers);
            oDataCleansed.Region = utils.normalizeToArray(oDataCleansed.Region);
            oDataCleansed.cus_tipocontrato_1p3634 = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_1p3634);
            oDataCleansed.cus_ProyectoyoProceso_320xxt = utils.normalizeToArray(oDataCleansed.cus_ProyectoyoProceso_320xxt);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                //Select record by Unique key
                let res = await SELECT.from("sap.ariba.EventItemSummary_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        EventId: oDataCleansed.EventId,
                        ItemId: oDataCleansed.ItemId,
                        EventVersion: oDataCleansed.EventVersion
                    });

                if (res.length == 0) {
                    //New record, insert
                    await INSERT.into("sap.ariba.EventItemSummary_AN").entries(oDataCleansed);

                } else {
                    //Update existing record
                    //Full Load of SourcingProjects_Organization SourcingProjects_AllOwners SourcingProjects_Suppliers SourcingProjects_Commodity SourcingProjects_Region

                    let departments = utils.normalizeToArray(oDataCleansed["Department"]);
                    delete oDataCleansed["Department"];

                    let commodities = utils.normalizeToArray(oDataCleansed["ItemCommodity"]);
                    delete oDataCleansed["ItemCommodity"];

                    let suppliers = utils.normalizeToArray(oDataCleansed["InvitedSuppliers"]);
                    delete oDataCleansed["InvitedSuppliers"];

                    let regions = utils.normalizeToArray(oDataCleansed["Region"]);
                    delete oDataCleansed["Region"];

                    let tipocontrato = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_1p3634"]);
                    delete oDataCleansed["cus_tipocontrato_1p3634"];

                    let proyectoyoProceso = utils.normalizeToArray(oDataCleansed["cus_ProyectoyoProceso_320xxt"]);
                    delete oDataCleansed["cus_ProyectoyoProceso_320xxt"];

                    await UPDATE("sap.ariba.EventItemSummary_AN").set(oDataCleansed).where(
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
        //Delete old records
        try {
            await DELETE("sap.ariba.EventItemSummary_Region_AN").where({
                EventItemSummary_Realm: Realm,
                EventItemSummary_EventId: EventId,
                EventItemSummary_ItemId: ItemId,
                EventItemSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const re of regions) {
            try {

                re["EventItemSummary_Realm"] = Realm;
                re["EventItemSummary_EventId"] = EventId;
                re["EventItemSummary_ItemId"] = ItemId;
                re["EventItemSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventItemSummary_Region_AN").entries(re);

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
            await DELETE("sap.ariba.EventItemSummary_InvitedSuppliers_AN").where({
                EventItemSummary_Realm: Realm,
                EventItemSummary_EventId: EventId,
                EventItemSummary_ItemId: ItemId,
                EventItemSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const supp of suppliers) {
            try {

                supp["EventItemSummary_Realm"] = Realm;
                supp["EventItemSummary_EventId"] = EventId;
                supp["EventItemSummary_ItemId"] = ItemId;
                supp["EventItemSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventItemSummary_InvitedSuppliers_AN").entries(supp);

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
            await DELETE("sap.ariba.EventItemSummary_ItemCommodity_AN").where({
                EventItemSummary_Realm: Realm,
                EventItemSummary_EventId: EventId,
                EventItemSummary_ItemId: ItemId,
                EventItemSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const comm of commodities) {
            try {

                comm["EventItemSummary_Realm"] = Realm;
                comm["EventItemSummary_EventId"] = EventId;
                comm["EventItemSummary_ItemId"] = ItemId;
                comm["EventItemSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventItemSummary_ItemCommodity_AN").entries(comm);

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
            await DELETE("sap.ariba.EventItemSummary_Department_AN").where({
                EventItemSummary_Realm: Realm,
                EventItemSummary_EventId: EventId,
                EventItemSummary_ItemId: ItemId,
                EventItemSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const org of organizations) {
            try {

                org["EventItemSummary_Realm"] = Realm;
                org["EventItemSummary_EventId"] = EventId;
                org["EventItemSummary_ItemId"] = ItemId;
                org["EventItemSummary_EventVersion"] = EventVersion;

                await INSERT.into("sap.ariba.EventItemSummary_Department_AN").entries(org);

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
            await DELETE("sap.ariba.EventItemSummary_tipocontrato_AN").where({
                EventItemSummary_Realm: Realm,
                EventItemSummary_EventId: EventId,
                EventItemSummary_ItemId: ItemId,
                EventItemSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const tc of tipocontrato) {
            try {

                tc["EventItemSummary_Realm"] = Realm;
                tc["EventItemSummary_EventId"] = EventId;
                tc["EventItemSummary_ItemId"] = ItemId;
                tc["EventItemSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventItemSummary_tipocontrato_AN").entries(tc);

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
            await DELETE("sap.ariba.EventItemSummary_ProyectoyoProceso_AN").where({
                EventItemSummary_Realm: Realm,
                EventItemSummary_EventId: EventId,
                EventItemSummary_ItemId: ItemId,
                EventItemSummary_EventVersion: EventVersion
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const pp of proyectoyoProceso) {
            try {

                pp["EventItemSummary_Realm"] = Realm;
                pp["EventItemSummary_EventId"] = EventId;
                pp["EventItemSummary_ItemId"] = ItemId;
                pp["EventItemSummary_EventVersion"] = EventVersion;
                await INSERT.into("sap.ariba.EventItemSummary_ProyectoyoProceso_AN").entries(pp);

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
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
    oData.SupplierId = oData.Supplier.SupplierId;
    oData.BidderUserId = oData.Bidder.UserId;
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

            oDataCleansed.ItemCommodity = utils.normalizeToArray(oDataCleansed.ItemCommodity);
            oDataCleansed.Region = utils.normalizeToArray(oDataCleansed.Region);
            oDataCleansed.Department = utils.normalizeToArray(oDataCleansed.Department);
            oDataCleansed.cus_tipocontrato_hhy1c = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_hhy1c);
            oDataCleansed.cus_ProyectoyoProceso_1ufpw1 = utils.normalizeToArray(oDataCleansed.cus_ProyectoyoProceso_1ufpw1);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                //Select record by Unique key
                let res = await SELECT.from("sap.ariba.SupplierParticipations_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        EventId: oDataCleansed.EventId,
                        ItemId: oDataCleansed.ItemId,
                        EventVersion: oDataCleansed.EventVersion,
                        SupplierId: oDataCleansed.SupplierId,
                        BidderUserId: oDataCleansed.BidderUserId
                    });

                if (res.length == 0) {
                    //New record, insert
                    await INSERT.into("sap.ariba.SupplierParticipations_AN").entries(oDataCleansed);

                } else {
                    //Update existing record
                    //Full Load of SourcingProjects_Organization SourcingProjects_AllOwners SourcingProjects_Suppliers SourcingProjects_Commodity SourcingProjects_Region

                    let itemCommodities = utils.normalizeToArray(oDataCleansed["ItemCommodity"]);
                    delete oDataCleansed["ItemCommodity"];

                    let regions = utils.normalizeToArray(oDataCleansed["Region"]);
                    delete oDataCleansed["Region"];

                    let organizations = utils.normalizeToArray(oDataCleansed["Department"]);
                    delete oDataCleansed["Department"];

                    let tipocontratos = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_hhy1c"]);
                    delete oDataCleansed["cus_tipocontrato_hhy1c"];

                    let proyectos = utils.normalizeToArray(oDataCleansed["cus_ProyectoyoProceso_1ufpw1"]);
                    delete oDataCleansed["cus_ProyectoyoProceso_1ufpw1"];

                    await UPDATE("sap.ariba.SupplierParticipations_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            EventId: oDataCleansed.EventId,
                            ItemId: oDataCleansed.ItemId,
                            EventVersion: oDataCleansed.EventVersion,
                            SupplierId: oDataCleansed.SupplierId,
                            BidderUserId: oDataCleansed.BidderUserId
                        });

                    await _FullLoadItemCommodities(itemCommodities, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.EventVersion, oDataCleansed.ItemId,
                        oDataCleansed.SupplierId, oDataCleansed.BidderUserId);
                    await _FullLoadRegions(regions, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.EventVersion, oDataCleansed.ItemId,
                        oDataCleansed.SupplierId, oDataCleansed.BidderUserId);
                    await _FullLoadOrganization(organizations, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.EventVersion, oDataCleansed.ItemId,
                        oDataCleansed.SupplierId, oDataCleansed.BidderUserId);
                    await _FullLoadTipocontrato(tipocontratos, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.EventVersion, oDataCleansed.ItemId,
                        oDataCleansed.SupplierId, oDataCleansed.BidderUserId);
                    await _FullLoadProyectoyoProceso(proyectos, oDataCleansed.Realm, oDataCleansed.EventId, oDataCleansed.EventVersion, oDataCleansed.ItemId,
                        oDataCleansed.SupplierId, oDataCleansed.BidderUserId);


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

async function _FullLoadRegions(regions, Realm, EventId, EventVersion, ItemId, SupplierId, BidderUserId) {
    return new Promise(async (resolve, reject) => {
        regions = utils.normalizeToArray(regions);
        //Delete old records
        try {
            await DELETE("sap.ariba.SupplierParticipations_Region_AN").where({
                SupplierParticipation_EventId: EventId,
                SupplierParticipation_Realm: Realm,
                SupplierParticipation_ItemId: ItemId,
                SupplierParticipation_EventVersion: EventVersion,
                SupplierParticipation_SupplierId: SupplierId,
                SupplierParticipation_BidderUserId: BidderUserId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const re of regions) {
            try {

                re["SupplierParticipation_Realm"] = Realm;
                re["SupplierParticipation_EventId"] = EventId;
                re["SupplierParticipation_ItemId"] = ItemId;
                re["SupplierParticipation_EventVersion"] = EventVersion;
                re["SupplierParticipation_SupplierId"] = SupplierId;
                re["SupplierParticipation_BidderUserId"] = BidderUserId;
                await INSERT.into("sap.ariba.SupplierParticipations_Region_AN").entries(re);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadItemCommodities(commodities, Realm, EventId, EventVersion, ItemId, SupplierId, BidderUserId) {
    return new Promise(async (resolve, reject) => {
        commodities = utils.normalizeToArray(commodities);
        //Delete old records
        try {
            await DELETE("sap.ariba.SupplierParticipations_ItemCommodity_AN").where({
                SupplierParticipation_EventId: EventId,
                SupplierParticipation_Realm: Realm,
                SupplierParticipation_ItemId: ItemId,
                SupplierParticipation_EventVersion: EventVersion,
                SupplierParticipation_SupplierId: SupplierId,
                SupplierParticipation_BidderUserId: BidderUserId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const comm of commodities) {
            try {

                comm["SupplierParticipation_Realm"] = Realm;
                comm["SupplierParticipation_EventId"] = EventId;
                comm["SupplierParticipation_ItemId"] = ItemId;
                comm["SupplierParticipation_EventVersion"] = EventVersion;
                comm["SupplierParticipation_SupplierId"] = SupplierId;
                comm["SupplierParticipation_BidderUserId"] = BidderUserId;
                await INSERT.into("sap.ariba.SupplierParticipations_ItemCommodity_AN").entries(comm);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadOrganization(organizations, Realm, EventId, EventVersion, ItemId, SupplierId, BidderUserId) {
    return new Promise(async (resolve, reject) => {
        organizations = utils.normalizeToArray(organizations);
        //Delete old records
        try {
            await DELETE("sap.ariba.SupplierParticipations_Department_AN").where({
                SupplierParticipation_EventId: EventId,
                SupplierParticipation_Realm: Realm,
                SupplierParticipation_ItemId: ItemId,
                SupplierParticipation_EventVersion: EventVersion,
                SupplierParticipation_SupplierId: SupplierId,
                SupplierParticipation_BidderUserId: BidderUserId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const org of organizations) {
            try {

                org["SupplierParticipation_Realm"] = Realm;
                org["SupplierParticipation_EventId"] = EventId;
                org["SupplierParticipation_ItemId"] = ItemId;
                org["SupplierParticipation_EventVersion"] = EventVersion;
                org["SupplierParticipation_SupplierId"] = SupplierId;
                org["SupplierParticipation_BidderUserId"] = BidderUserId;
                await INSERT.into("sap.ariba.SupplierParticipations_Department_AN").entries(org);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}


async function _FullLoadTipocontrato(tipocontratos, Realm, EventId, EventVersion, ItemId, SupplierId, BidderUserId) {
    return new Promise(async (resolve, reject) => {
        tipocontratos = utils.normalizeToArray(tipocontratos);
        //Delete old records
        try {
            await DELETE("sap.ariba.SupplierParticipations_tipocontrato_AN").where({
                SupplierParticipation_EventId: EventId,
                SupplierParticipation_Realm: Realm,
                SupplierParticipation_ItemId: ItemId,
                SupplierParticipation_EventVersion: EventVersion,
                SupplierParticipation_SupplierId: SupplierId,
                SupplierParticipation_BidderUserId: BidderUserId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const o of tipocontratos) {
            try {

                o["SupplierParticipation_Realm"] = Realm;
                o["SupplierParticipation_EventId"] = EventId;
                o["SupplierParticipation_ItemId"] = ItemId;
                o["SupplierParticipation_EventVersion"] = EventVersion;
                o["SupplierParticipation_SupplierId"] = SupplierId;
                o["SupplierParticipation_BidderUserId"] = BidderUserId;
                await INSERT.into("sap.ariba.SupplierParticipations_tipocontrato_AN").entries(o);

            } catch (e) {
                logger.error(`Error on inserting data in database, aborting file processing, details ${e} `);
                reject(e);
                break;
            }
        }
        resolve();
    });
}

async function _FullLoadProyectoyoProceso(proyectos, Realm, EventId, EventVersion, ItemId, SupplierId, BidderUserId) {
    return new Promise(async (resolve, reject) => {
        proyectos = utils.normalizeToArray(proyectos);
        //Delete old records
        try {
            await DELETE("sap.ariba.SupplierParticipations_ProyectoyoProceso_AN").where({
                SupplierParticipation_EventId: EventId,
                SupplierParticipation_Realm: Realm,
                SupplierParticipation_ItemId: ItemId,
                SupplierParticipation_EventVersion: EventVersion,
                SupplierParticipation_SupplierId: SupplierId,
                SupplierParticipation_BidderUserId: BidderUserId
            });
        }
        catch (e) {
            logger.error(`Error on deleting from database, aborting file processing, details ${e} `);
            reject(e);
        }

        //Insert new records
        for (const o of proyectos) {
            try {

                o["SupplierParticipation_Realm"] = Realm;
                o["SupplierParticipation_EventId"] = EventId;
                o["SupplierParticipation_ItemId"] = ItemId;
                o["SupplierParticipation_EventVersion"] = EventVersion;
                o["SupplierParticipation_SupplierId"] = SupplierId;
                o["SupplierParticipation_BidderUserId"] = BidderUserId;
                await INSERT.into("sap.ariba.SupplierParticipations_ProyectoyoProceso_AN").entries(o);

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
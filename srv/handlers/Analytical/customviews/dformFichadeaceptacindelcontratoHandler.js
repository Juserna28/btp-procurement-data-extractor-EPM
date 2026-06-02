"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return [
        "AclId",
        "cus_customerResourcesdfFACValorDesFijLab_1zsji5",
        "cus_customerResourcesdfFACValorDesFijLab_S1_1zsji5",
        "cus_customerResourcesdfFACValorDesFijLab_S2_1zsji5",
        "cus_customerResourcesdfFACValorDesFijLab_S3_1zsji5",
        "cus_customerResourcesdfFACValorDesFijLab_S4_1zsji5",
        "cus_customerResourcesdfFACValorDesFijLab_S6_1zsji5",
        "cus_Valordelanticipoopagoanticipado_1zsji5",
        "cus_Valordelanticipoopagoanticipado_S1_1zsji5",
        "cus_Valordelanticipoopagoanticipado_S2_1zsji5",
        "cus_Valordelanticipoopagoanticipado_S3_1zsji5",
        "cus_Valordelanticipoopagoanticipado_S4_1zsji5",
        "cus_Valordelanticipoopagoanticipado_S6_1zsji5"
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
            oDataCleansed = utils.removeNullValues(oDataCleansed);

            oDataCleansed.cus_Amparos_3qb084 = utils.normalizeToArray(oDataCleansed.cus_Amparos_3qb084);
            oDataCleansed.cus_GruposPoblacionales_20d1t2 = utils.normalizeToArray(oDataCleansed.cus_GruposPoblacionales_20d1t2);
            oDataCleansed.cus_Indiquelosprocesosalosqueobedecelane_30acfm = utils.normalizeToArray(oDataCleansed.cus_Indiquelosprocesosalosqueobedecelane_30acfm);
            oDataCleansed.cus_Indiquelosproyectosalosqueobedecelan_nf9yd = utils.normalizeToArray(oDataCleansed.cus_Indiquelosproyectosalosqueobedecelan_nf9yd);
            oDataCleansed.cus_customerResourcesdfFACCompAcepOfLabe_pby9w = utils.normalizeToArray(oDataCleansed.cus_customerResourcesdfFACCompAcepOfLabe_pby9w);
            oDataCleansed.cus_customerResourcesdfFACPaisOriLabel_uk4vv = utils.normalizeToArray(oDataCleansed.cus_customerResourcesdfFACPaisOriLabel_uk4vv);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformFichadeaceptacindelcontrato_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformFichadeaceptacindelcontrato_AN").entries(oDataCleansed);
                } else {
                    let amparos = utils.normalizeToArray(oDataCleansed["cus_Amparos_3qb084"]);
                    delete oDataCleansed["cus_Amparos_3qb084"];

                    let gruposPoblacionales = utils.normalizeToArray(oDataCleansed["cus_GruposPoblacionales_20d1t2"]);
                    delete oDataCleansed["cus_GruposPoblacionales_20d1t2"];

                    let procesos = utils.normalizeToArray(oDataCleansed["cus_Indiquelosprocesosalosqueobedecelane_30acfm"]);
                    delete oDataCleansed["cus_Indiquelosprocesosalosqueobedecelane_30acfm"];

                    let proyectos = utils.normalizeToArray(oDataCleansed["cus_Indiquelosproyectosalosqueobedecelan_nf9yd"]);
                    delete oDataCleansed["cus_Indiquelosproyectosalosqueobedecelan_nf9yd"];

                    let compAcep = utils.normalizeToArray(oDataCleansed["cus_customerResourcesdfFACCompAcepOfLabe_pby9w"]);
                    delete oDataCleansed["cus_customerResourcesdfFACCompAcepOfLabe_pby9w"];

                    let paisOri = utils.normalizeToArray(oDataCleansed["cus_customerResourcesdfFACPaisOriLabel_uk4vv"]);
                    delete oDataCleansed["cus_customerResourcesdfFACPaisOriLabel_uk4vv"];

                    await UPDATE("sap.ariba.DformFichadeaceptacindelcontrato_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadAmparos(amparos, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadGruposPoblacionales(gruposPoblacionales, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadProcesos(procesos, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadProyectos(proyectos, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadCompAcep(compAcep, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadPaisOri(paisOri, oDataCleansed.Realm, oDataCleansed.InternalId);
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

const _FK_REALM = "DformFichadeaceptacindelcontrato_Realm";
const _FK_INTERNALID = "DformFichadeaceptacindelcontrato_InternalId";

async function _FullLoadAmparos(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFichadeaceptacindelcontrato_cus_Amparos_3qb084_AN").where({
                [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId
            });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformFichadeaceptacindelcontrato_cus_Amparos_3qb084_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadGruposPoblacionales(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFichadeaceptacindelcontrato_cus_GruposPoblacionales_20d1t2_AN").where({
                [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId
            });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformFichadeaceptacindelcontrato_cus_GruposPoblacionales_20d1t2_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadProcesos(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFichadeaceptacindelcontrato_cus_Indiquelosprocesosalosqueobedecelane_30acfm_AN").where({
                [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId
            });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformFichadeaceptacindelcontrato_cus_Indiquelosprocesosalosqueobedecelane_30acfm_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadProyectos(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFichadeaceptacindelcontrato_cus_Indiquelosproyectosalosqueobedecelan_nf9yd_AN").where({
                [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId
            });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformFichadeaceptacindelcontrato_cus_Indiquelosproyectosalosqueobedecelan_nf9yd_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadCompAcep(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACCompAcepOfLabe_pby9w_AN").where({
                [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId
            });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACCompAcepOfLabe_pby9w_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadPaisOri(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACPaisOriLabel_uk4vv_AN").where({
                [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId
            });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACPaisOriLabel_uk4vv_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

module.exports = {
    insertData
}

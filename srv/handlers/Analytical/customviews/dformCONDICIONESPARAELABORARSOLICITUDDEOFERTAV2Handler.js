"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return [
        "AclId",
        "cus_dfporcentaje_1zsji5"
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

            oDataCleansed.cus_dfcertificados5_nf9yd = utils.normalizeToArray(oDataCleansed.cus_dfcertificados5_nf9yd);
            oDataCleansed.cus_dfcertificados_20d1t2 = utils.normalizeToArray(oDataCleansed.cus_dfcertificados_20d1t2);
            oDataCleansed.cus_dfgrupos_407xpy = utils.normalizeToArray(oDataCleansed.cus_dfgrupos_407xpy);
            oDataCleansed.cus_dfindique_3qb084 = utils.normalizeToArray(oDataCleansed.cus_dfindique_3qb084);
            oDataCleansed.cus_dfmodalidad_30acfm = utils.normalizeToArray(oDataCleansed.cus_dfmodalidad_30acfm);
            oDataCleansed.cus_dfmonedas_4d84ab = utils.normalizeToArray(oDataCleansed.cus_dfmonedas_4d84ab);
            oDataCleansed.cus_dfpersonas_fmu1v = utils.normalizeToArray(oDataCleansed.cus_dfpersonas_fmu1v);
            oDataCleansed.cus_dftipoparticipantes_2na5v9 = utils.normalizeToArray(oDataCleansed.cus_dftipoparticipantes_2na5v9);
            oDataCleansed.cus_tipocontrato_1ace0k = utils.normalizeToArray(oDataCleansed.cus_tipocontrato_1ace0k);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN").entries(oDataCleansed);
                } else {
                    let certificados5 = utils.normalizeToArray(oDataCleansed["cus_dfcertificados5_nf9yd"]);
                    delete oDataCleansed["cus_dfcertificados5_nf9yd"];

                    let certificados = utils.normalizeToArray(oDataCleansed["cus_dfcertificados_20d1t2"]);
                    delete oDataCleansed["cus_dfcertificados_20d1t2"];

                    let grupos = utils.normalizeToArray(oDataCleansed["cus_dfgrupos_407xpy"]);
                    delete oDataCleansed["cus_dfgrupos_407xpy"];

                    let indique = utils.normalizeToArray(oDataCleansed["cus_dfindique_3qb084"]);
                    delete oDataCleansed["cus_dfindique_3qb084"];

                    let modalidad = utils.normalizeToArray(oDataCleansed["cus_dfmodalidad_30acfm"]);
                    delete oDataCleansed["cus_dfmodalidad_30acfm"];

                    let monedas = utils.normalizeToArray(oDataCleansed["cus_dfmonedas_4d84ab"]);
                    delete oDataCleansed["cus_dfmonedas_4d84ab"];

                    let personas = utils.normalizeToArray(oDataCleansed["cus_dfpersonas_fmu1v"]);
                    delete oDataCleansed["cus_dfpersonas_fmu1v"];

                    let tipoParticipantes = utils.normalizeToArray(oDataCleansed["cus_dftipoparticipantes_2na5v9"]);
                    delete oDataCleansed["cus_dftipoparticipantes_2na5v9"];

                    let tipoContrato = utils.normalizeToArray(oDataCleansed["cus_tipocontrato_1ace0k"]);
                    delete oDataCleansed["cus_tipocontrato_1ace0k"];

                    await UPDATE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadCertificados5(certificados5, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadCertificados(certificados, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadGrupos(grupos, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadIndique(indique, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadModalidad(modalidad, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadMonedas(monedas, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadPersonas(personas, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadTipoParticipantes(tipoParticipantes, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadTipoContrato(tipoContrato, oDataCleansed.Realm, oDataCleansed.InternalId);
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

const _FK_REALM = "DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_Realm";
const _FK_INTERNALID = "DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_InternalId";

async function _FullLoadCertificados5(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados5_nf9yd_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados5_nf9yd_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadCertificados(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados_20d1t2_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados_20d1t2_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadGrupos(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfgrupos_407xpy_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfgrupos_407xpy_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadIndique(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfindique_3qb084_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfindique_3qb084_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadModalidad(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmodalidad_30acfm_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmodalidad_30acfm_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadMonedas(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmonedas_4d84ab_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmonedas_4d84ab_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadPersonas(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfpersonas_fmu1v_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfpersonas_fmu1v_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadTipoParticipantes(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dftipoparticipantes_2na5v9_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dftipoparticipantes_2na5v9_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

async function _FullLoadTipoContrato(items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_tipocontrato_1ace0k_AN").where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into("sap.ariba.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_tipocontrato_1ace0k_AN").entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

module.exports = {
    insertData
}

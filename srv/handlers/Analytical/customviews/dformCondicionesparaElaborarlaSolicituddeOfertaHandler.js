"use strict";

const cds = require("@sap/cds");
const logger = cds.log('logger');
const utils = require("../../../utils/Utils");

function _getAmountPropertiesForDataCleaning() {
    return [
        "AclId",
        "cus_customerResourcesPorcentajeAnticipoL_1zsji5"
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

            oDataCleansed.cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l = utils.normalizeToArray(oDataCleansed.cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l);
            oDataCleansed.cus_customerResourcesCertificadosAplicab_2na5v9 = utils.normalizeToArray(oDataCleansed.cus_customerResourcesCertificadosAplicab_2na5v9);
            oDataCleansed.cus_customerResourcesEnfoqueComercialLab_kc0vu = utils.normalizeToArray(oDataCleansed.cus_customerResourcesEnfoqueComercialLab_kc0vu);
            oDataCleansed.cus_customerResourcesEstrategiaNegociaci_4d84ab = utils.normalizeToArray(oDataCleansed.cus_customerResourcesEstrategiaNegociaci_4d84ab);
            oDataCleansed.cus_customerResourcesFocoNegociacionAbas_30acfm = utils.normalizeToArray(oDataCleansed.cus_customerResourcesFocoNegociacionAbas_30acfm);
            oDataCleansed.cus_customerResourcesFocoNegociacionCons_xc7g7 = utils.normalizeToArray(oDataCleansed.cus_customerResourcesFocoNegociacionCons_xc7g7);
            oDataCleansed.cus_customerResourcesFocoNegociacionMejo_20d1t2 = utils.normalizeToArray(oDataCleansed.cus_customerResourcesFocoNegociacionMejo_20d1t2);
            oDataCleansed.cus_customerResourcesFocoNegociacionRedi_2a9zaw = utils.normalizeToArray(oDataCleansed.cus_customerResourcesFocoNegociacionRedi_2a9zaw);
            oDataCleansed.cus_customerResourcesFocoNegociacionRela_3qb084 = utils.normalizeToArray(oDataCleansed.cus_customerResourcesFocoNegociacionRela_3qb084);
            oDataCleansed.cus_customerResourcesIndiqueCertificados_1ace0k = utils.normalizeToArray(oDataCleansed.cus_customerResourcesIndiqueCertificados_1ace0k);
            oDataCleansed.cus_customerResourcesPersonasAInvitarLab_fmu1v = utils.normalizeToArray(oDataCleansed.cus_customerResourcesPersonasAInvitarLab_fmu1v);
            oDataCleansed.cus_customerResourcesTipoContratoLabel_nf9yd = utils.normalizeToArray(oDataCleansed.cus_customerResourcesTipoContratoLabel_nf9yd);
            oDataCleansed.cus_customerResourcesTipoParticipantesLa_407xpy = utils.normalizeToArray(oDataCleansed.cus_customerResourcesTipoParticipantesLa_407xpy);

            oDataCleansed = utils.flattenTypes(oDataCleansed);

            try {
                let res = await SELECT.from("sap.ariba.DformCondicionesparaElaborarlaSolicituddeOferta_AN").where(
                    {
                        Realm: oDataCleansed.Realm,
                        InternalId: oDataCleansed.InternalId
                    });

                if (res.length == 0) {
                    await INSERT.into("sap.ariba.DformCondicionesparaElaborarlaSolicituddeOferta_AN").entries(oDataCleansed);
                } else {
                    let tipoExp = utils.normalizeToArray(oDataCleansed["cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l"]);
                    delete oDataCleansed["cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l"];

                    let certAplicab = utils.normalizeToArray(oDataCleansed["cus_customerResourcesCertificadosAplicab_2na5v9"]);
                    delete oDataCleansed["cus_customerResourcesCertificadosAplicab_2na5v9"];

                    let enfoque = utils.normalizeToArray(oDataCleansed["cus_customerResourcesEnfoqueComercialLab_kc0vu"]);
                    delete oDataCleansed["cus_customerResourcesEnfoqueComercialLab_kc0vu"];

                    let estrategia = utils.normalizeToArray(oDataCleansed["cus_customerResourcesEstrategiaNegociaci_4d84ab"]);
                    delete oDataCleansed["cus_customerResourcesEstrategiaNegociaci_4d84ab"];

                    let focoAbas = utils.normalizeToArray(oDataCleansed["cus_customerResourcesFocoNegociacionAbas_30acfm"]);
                    delete oDataCleansed["cus_customerResourcesFocoNegociacionAbas_30acfm"];

                    let focoCons = utils.normalizeToArray(oDataCleansed["cus_customerResourcesFocoNegociacionCons_xc7g7"]);
                    delete oDataCleansed["cus_customerResourcesFocoNegociacionCons_xc7g7"];

                    let focoMejo = utils.normalizeToArray(oDataCleansed["cus_customerResourcesFocoNegociacionMejo_20d1t2"]);
                    delete oDataCleansed["cus_customerResourcesFocoNegociacionMejo_20d1t2"];

                    let focoRedi = utils.normalizeToArray(oDataCleansed["cus_customerResourcesFocoNegociacionRedi_2a9zaw"]);
                    delete oDataCleansed["cus_customerResourcesFocoNegociacionRedi_2a9zaw"];

                    let focoRela = utils.normalizeToArray(oDataCleansed["cus_customerResourcesFocoNegociacionRela_3qb084"]);
                    delete oDataCleansed["cus_customerResourcesFocoNegociacionRela_3qb084"];

                    let indiqueCert = utils.normalizeToArray(oDataCleansed["cus_customerResourcesIndiqueCertificados_1ace0k"]);
                    delete oDataCleansed["cus_customerResourcesIndiqueCertificados_1ace0k"];

                    let personas = utils.normalizeToArray(oDataCleansed["cus_customerResourcesPersonasAInvitarLab_fmu1v"]);
                    delete oDataCleansed["cus_customerResourcesPersonasAInvitarLab_fmu1v"];

                    let tipoContrato = utils.normalizeToArray(oDataCleansed["cus_customerResourcesTipoContratoLabel_nf9yd"]);
                    delete oDataCleansed["cus_customerResourcesTipoContratoLabel_nf9yd"];

                    let tipoParticipantes = utils.normalizeToArray(oDataCleansed["cus_customerResourcesTipoParticipantesLa_407xpy"]);
                    delete oDataCleansed["cus_customerResourcesTipoParticipantesLa_407xpy"];

                    await UPDATE("sap.ariba.DformCondicionesparaElaborarlaSolicituddeOferta_AN").set(oDataCleansed).where(
                        {
                            Realm: oDataCleansed.Realm,
                            InternalId: oDataCleansed.InternalId
                        });

                    await _FullLoadTipoExp(tipoExp, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadCertAplicab(certAplicab, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadEnfoque(enfoque, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadEstrategia(estrategia, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadFocoAbas(focoAbas, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadFocoCons(focoCons, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadFocoMejo(focoMejo, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadFocoRedi(focoRedi, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadFocoRela(focoRela, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadIndiqueCert(indiqueCert, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadPersonas(personas, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadTipoContrato(tipoContrato, oDataCleansed.Realm, oDataCleansed.InternalId);
                    await _FullLoadTipoParticipantes(tipoParticipantes, oDataCleansed.Realm, oDataCleansed.InternalId);
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

const _FK_REALM = "DformCondicionesparaElaborarlaSolicituddeOferta_Realm";
const _FK_INTERNALID = "DformCondicionesparaElaborarlaSolicituddeOferta_InternalId";

async function _fullLoad(tableName, items, Realm, InternalId) {
    return new Promise(async (resolve, reject) => {
        items = utils.normalizeToArray(items);
        try {
            await DELETE(tableName).where({ [_FK_REALM]: Realm, [_FK_INTERNALID]: InternalId });
        } catch (e) { logger.error(`Error on deleting from database, aborting file processing, details ${e} `); reject(e); }
        for (const item of items) {
            try {
                item[_FK_REALM] = Realm; item[_FK_INTERNALID] = InternalId;
                await INSERT.into(tableName).entries(item);
            } catch (e) { logger.error(`Error on inserting data in database, aborting file processing, details ${e} `); reject(e); break; }
        }
        resolve();
    });
}

const _PREFIX = "sap.ariba.DformCondicionesparaElaborarlaSolicituddeOferta_";

async function _FullLoadTipoExp(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l_AN`, items, Realm, InternalId);
}
async function _FullLoadCertAplicab(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesCertificadosAplicab_2na5v9_AN`, items, Realm, InternalId);
}
async function _FullLoadEnfoque(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesEnfoqueComercialLab_kc0vu_AN`, items, Realm, InternalId);
}
async function _FullLoadEstrategia(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesEstrategiaNegociaci_4d84ab_AN`, items, Realm, InternalId);
}
async function _FullLoadFocoAbas(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesFocoNegociacionAbas_30acfm_AN`, items, Realm, InternalId);
}
async function _FullLoadFocoCons(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesFocoNegociacionCons_xc7g7_AN`, items, Realm, InternalId);
}
async function _FullLoadFocoMejo(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesFocoNegociacionMejo_20d1t2_AN`, items, Realm, InternalId);
}
async function _FullLoadFocoRedi(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesFocoNegociacionRedi_2a9zaw_AN`, items, Realm, InternalId);
}
async function _FullLoadFocoRela(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesFocoNegociacionRela_3qb084_AN`, items, Realm, InternalId);
}
async function _FullLoadIndiqueCert(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesIndiqueCertificados_1ace0k_AN`, items, Realm, InternalId);
}
async function _FullLoadPersonas(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesPersonasAInvitarLab_fmu1v_AN`, items, Realm, InternalId);
}
async function _FullLoadTipoContrato(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesTipoContratoLabel_nf9yd_AN`, items, Realm, InternalId);
}
async function _FullLoadTipoParticipantes(items, Realm, InternalId) {
    return _fullLoad(`${_PREFIX}cus_customerResourcesTipoParticipantesLa_407xpy_AN`, items, Realm, InternalId);
}

module.exports = {
    insertData
}

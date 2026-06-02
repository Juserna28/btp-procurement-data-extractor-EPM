namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformSIPMRegistrodeExperienciaDetails
    Description:     DformSIPMRegistrodeExperienciaDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_SIPMRegistrodeExperienciaDetailsFact
*/
entity DformSIPMRegistrodeExperienciaDetails_AN : managed {
    key Realm                        : String(50); // Realm
    key DFormId                      : String(30); // Contract Form ID
    key DetailLineNumber             : String(30); // Detail Line Number
        AclId                        : Double; // AclId
        cus_Nombredelarchivo_p58et   : String(1000); // Nombre del archivo
        cus_regexpcodunspsc_1wrtrq   : types.commodity; // Código del commodity
        cus_regexpencalidad_p58et    : String(1000); // En calidad de
        cus_regexpfechafin_36k5ok_Day    : DateTime; // Fecha de terminación del contrato
        cus_regexpfechainicio_36k5ok_Day : DateTime; // Fecha de inicio del contrato
        cus_regexpidcon_p58et        : String(1000); // Identificador del contrato
        cus_regexpobcon_p58et        : String(1000); // Objeto del contrato
        cus_regexpporcentaje_22xqcb  : Double; // % asignado
        cus_regexpvalor_22xqcb       : Double; // Valor del contrato Amount (COP)
        cus_regexpvalor_p58et        : String(10); // Valor del contrato Currency Code
        cus_regexpvalor_S1_22xqcb    : Double; // Valor del contrato Amount (CLP)
        cus_regexpvalor_S2_22xqcb    : Double; // Valor del contrato Amount (USD)
        cus_regexpvalor_S3_22xqcb    : Double; // Valor del contrato Amount (EUR)
        cus_regexpvalor_S4_22xqcb    : Double; // Valor del contrato Amount (GTQ)
        cus_regexpvalor_S6_22xqcb    : Double; // Valor del contrato Amount (MXN)
        FlexTypeId                   : String(300); // FlexTypeId
        LoadCreateTime               : DateTime; // Load Create Time
        LoadUpdateTime               : DateTime; // Load Update Time
        ParentAgreement              : types.projectInfo; // Parent Agreement
        SourceSystem                 : types.sourceSystem; // Source System
        TimeCreated                  : DateTime; // Time Created
        TimeUpdated                  : DateTime; // Time Updated
}

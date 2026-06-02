namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformRegistrodemedidasdeapremioDetails
    Description:     DformRegistrodemedidasdeapremioDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_CONTRACTRegistrodemedidasdeapremioDetailsFact
*/
entity DformRegistrodemedidasdeapremioDetails_AN : managed {
    key Realm                      : String(50); // Realm
    key DFormId                    : String(30); // Contract Form ID
    key DetailLineNumber           : String(30); // Detail Line Number
        AclId                      : Double; // AclId
        cus_cmmedesc_p58et         : String(1000); // Descripción
        cus_cmmedradicadomul_p58et : String(1000); // Not used
        cus_cmmefecha_36k5ok_Day   : DateTime; // Fecha de comunicación
        cus_cmmencont_p58et        : String(1000); // N° Contrato
        cus_cmmeobs_p58et          : String(1000); // Observaciones
        cus_cmmeprov_3q5d1f        : types.supplier; // Proveedor
        cus_cmmerad_p58et          : String(1000); // Radicado comunicación
        cus_cmmetipomed_p58et      : String(1000); // Tipo de medida de apremio
        cus_cmmevalor_22xqcb       : Double; // Valor de la medida de apremio Amount (COP)
        cus_cmmevalor_p58et        : String(10); // Valor de la medida de apremio Currency Code
        cus_cmmevalor_S1_22xqcb    : Double; // Valor de la medida de apremio Amount (CLP)
        cus_cmmevalor_S2_22xqcb    : Double; // Valor de la medida de apremio Amount (USD)
        cus_cmmevalor_S3_22xqcb    : Double; // Valor de la medida de apremio Amount (EUR)
        cus_cmmevalor_S4_22xqcb    : Double; // Valor de la medida de apremio Amount (GTQ)
        cus_cmmevalor_S6_22xqcb    : Double; // Valor de la medida de apremio Amount (MXN)
        cus_TipodeRegistro_p58et   : String(1000); // Tipo de Registro
        FlexTypeId                 : String(300); // FlexTypeId
        LoadCreateTime             : DateTime; // Load Create Time
        LoadUpdateTime             : DateTime; // Load Update Time
        ParentAgreement            : types.projectInfo; // Parent Agreement
        SourceSystem               : types.sourceSystem; // Source System
        TimeCreated                : DateTime; // Time Created
        TimeUpdated                : DateTime; // Time Updated
}

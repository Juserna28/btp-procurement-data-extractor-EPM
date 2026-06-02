namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformDocumentosTransaccionales
    Description:     DformDocumentosTransaccionales
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_DocumentosTransaccionalesFact
*/
entity DformDocumentosTransaccionales_AN : managed {
    key Realm                                   : String(50); // Realm
    key InternalId                              : String(30); // Document Id
        AclId                                   : Double; // AclId
        cus_Descripciondelcontrato_m01kn        : String(1000); // Descripción del Contrato
        cus_Nombre_m01kn                        : String(1000); // Nombre
        cus_ResultadopreclasificacionNIIF_m01kn : String(1000); // Resultado preclasificacion NIIF
        cus_Valor_1zsji5                        : Double; // Valor referente (sin IVA) Amount (COP)
        cus_Valor_m01kn                         : String(10); // Valor referente (sin IVA) Currency Code
        cus_Valor_S1_1zsji5                     : Double; // Valor (sin IVA) Amount (CLP)
        cus_Valor_S2_1zsji5                     : Double; // Valor (sin IVA) Amount (USD)
        cus_Valor_S3_1zsji5                     : Double; // Valor (sin IVA) Amount (EUR)
        cus_Valor_S4_1zsji5                     : Double; // Valor (sin IVA) Amount (GTQ)
        cus_Valor_S6_1zsji5                     : Double; // Valor (sin IVA) Amount (MXN)
        FlexTypeId                              : String(300); // FlexTypeId
        IsTestForm                              : Boolean; // Test Form
        LoadCreateTime                          : DateTime; // Load Create Time
        LoadUpdateTime                          : DateTime; // Load Update Time
        ParentAgreement                         : types.projectInfo; // Parent Agreement
        SourceSystem                            : types.sourceSystem; // Source System
        Title                                   : String(50); // Title
        TimeCreated                             : DateTime; // Time Created
        TimeUpdated                             : DateTime; // Time Updated
}

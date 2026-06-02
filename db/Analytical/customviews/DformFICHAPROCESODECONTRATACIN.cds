namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformFICHAPROCESODECONTRATACIN
    Description:     DformFICHAPROCESODECONTRATACIN
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_FICHAPROCESODECONTRATACINFact
*/
entity DformFICHAPROCESODECONTRATACIN_AN : managed {
    key Realm                                           : String(50); // Realm
    key InternalId                                      : String(30); // Document Id
        AclId                                           : Double; // AclId
        cus_dfcupofinal_1zsji5                          : Double; // Cupo / Proyección Final Amount (COP)
        cus_dfcupofinal_m01kn                           : String(10); // Cupo / Proyección Final Currency Code
        cus_dfcupofinal_S1_1zsji5                       : Double; // Cupo Final Amount (CLP)
        cus_dfcupofinal_S2_1zsji5                       : Double; // Cupo Final Amount (USD)
        cus_dfcupofinal_S3_1zsji5                       : Double; // Cupo Final Amount (EUR)
        cus_dfcupofinal_S4_1zsji5                       : Double; // Cupo Final Amount (GTQ)
        cus_dfcupofinal_S6_1zsji5                       : Double; // Cupo Final Amount (MXN)
        cus_dfcupoinicial_1zsji5                        : Double; // Cupo / Proyección Inicial Amount (COP)
        cus_dfcupoinicial_m01kn                         : String(10); // Cupo / Proyección Inicial Currency Code
        cus_dfcupoinicial_S1_1zsji5                     : Double; // Cupo Inicial Amount (CLP)
        cus_dfcupoinicial_S2_1zsji5                     : Double; // Cupo Inicial Amount (USD)
        cus_dfcupoinicial_S3_1zsji5                     : Double; // Cupo Inicial Amount (EUR)
        cus_dfcupoinicial_S4_1zsji5                     : Double; // Cupo Inicial Amount (GTQ)
        cus_dfcupoinicial_S6_1zsji5                     : Double; // Cupo Inicial Amount (MXN)
        cus_DFProcesoContratacion_43zzy2                : Boolean; // ¿El proceso de contratación fue limitado a MiPymes?
        cus_dfprocesocuantiaindeter_43zzy2              : Boolean; // ¿El proceso genera contratos de cuantía indeterminada?
        cus_Indiquelacausaldesierto_m01kn               : String(1000); // Indique la causa que generó que el proceso se declarara desierto
        cus_Indiquelacausalterminado_m01kn              : String(1000); // Indique la causa que generó que el proceso se declarara terminado
        cus_Indiqueladecision_m01kn                     : String(1000); // Indique la decisión que se tomó en relación con el proceso contractual
        cus_Observacionesadicionales_m01kn              : String(1000); // Observaciones adicionales
        DocumentVersion                                 : String(30); // Document Version
        FlexTypeId                                      : String(300); // FlexTypeId
        IsTestForm                                      : Boolean; // Test Form
        LoadCreateTime                                  : DateTime; // Load Create Time
        LoadUpdateTime                                  : DateTime; // Load Update Time
        ParentAgreement                                 : types.projectInfo; // Parent Agreement
        SourceSystem                                    : types.sourceSystem; // Source System
        Title                                           : String(50); // Title
        TimeCreated                                     : DateTime; // Time Created
        TimeUpdated                                     : DateTime; // Time Updated
        cus_customerResourcesIndiquelacausaldesi_30acfm : Composition of many DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausaldesi_30acfm_AN
                                                              on cus_customerResourcesIndiquelacausaldesi_30acfm.DformFICHAPROCESODECONTRATACIN = $self;
        cus_customerResourcesIndiquelacausalterm_3qb084 : Composition of many DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausalterm_3qb084_AN
                                                              on cus_customerResourcesIndiquelacausalterm_3qb084.DformFICHAPROCESODECONTRATACIN = $self;
}

entity DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausaldesi_30acfm_AN : cuid {
    key DformFICHAPROCESODECONTRATACIN : Association to DformFICHAPROCESODECONTRATACIN_AN;
        VUF_1string                    : String(1000); // Indique la causa que generó que el proceso se declarara desierto
}

entity DformFICHAPROCESODECONTRATACIN_cus_customerResourcesIndiquelacausalterm_3qb084_AN : cuid {
    key DformFICHAPROCESODECONTRATACIN : Association to DformFICHAPROCESODECONTRATACIN_AN;
        VUF_10string                   : String(1000); // Indique la causa que generó que el proceso se declarara terminado
}

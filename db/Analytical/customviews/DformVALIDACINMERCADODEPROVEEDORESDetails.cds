namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformVALIDACINMERCADODEPROVEEDORESDetails
    Description:     DformVALIDACINMERCADODEPROVEEDORESDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_VALIDACINMERCADODEPROVEEDORESDetailsFact
*/
entity DformVALIDACINMERCADODEPROVEEDORESDetails_AN : managed {
    key Realm                                : String(50); // Realm
    key DFormId                              : String(30); // Contract Form ID
    key DetailLineNumber                     : String(30); // Detail Line Number
        AclId                                : Double; // AclId
        cus_DFvmpLBoolean0001_4756s8         : Boolean; // cus_DFvmpLBoolean0001
        cus_DFvmpLBoolean0002_4756s8         : Boolean; // cus_DFvmpLBoolean0002
        cus_DFvmpLBoolean0003_4756s8         : Boolean; // cus_DFvmpLBoolean0003
        cus_DFvmpLBoolean0004_4756s8         : Boolean; // cus_DFvmpLBoolean0004
        cus_DFvmpLBoolean0005_4756s8         : Boolean; // cus_DFvmpLBoolean0005
        cus_DFvmpLFlexMasterDataSS0001_p58et : String(1000); // ¿Cumple aspectos técnicos?
        cus_DFvmpLFlexMasterDataSS0002_p58et : String(1000); // ¿Cumple experiencia?
        cus_DFvmpLFlexMasterDataSS0003_p58et : String(1000); // ¿Cumple requisitos financieros?
        cus_DFvmpLFlexMasterDataSS0004_p58et : String(1000); // ¿Cumple certificaciones y/o permisos?
        cus_DFvmpLFlexMasterDataSS0005_p58et : String(1000); // ¿Cumple otro(s) requisito(s)?
        cus_DFvmpLLongRichText0001_p58et     : String(1000); // Observaciones
        cus_DFvmpLText0001_p58et             : String(1000); // Identificación del proveedor
        cus_DFvmpLText0002_p58et             : String(1000); // Nombre del proveedor
        cus_DFvmpLText0003_p58et             : String(1000); // Naturaleza jurídica
        cus_DFvmpLText0004_p58et             : String(1000); // Nacionalidad
        cus_DFvmpLText0005_p58et             : String(1000); // Tipo de empresa
        cus_DFvmpLText0006_p58et             : String(1000); // Actividad comercial
        cus_DFvmpLText0007_p58et             : String(1000); // cus_DFvmpLText0007
        FlexTypeId                           : String(300); // FlexTypeId
        LoadCreateTime                       : DateTime; // Load Create Time
        LoadUpdateTime                       : DateTime; // Load Update Time
        ParentAgreement                      : types.projectInfo; // Parent Agreement
        SourceSystem                         : types.sourceSystem; // Source System
        TimeCreated                          : DateTime; // Time Created
        TimeUpdated                          : DateTime; // Time Updated
}

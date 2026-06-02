namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformFormulariodeInformacinFinanciera
    Description:     DformFormulariodeInformacinFinanciera
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_FormulariodeInformacinFinancieraFact
*/
entity DformFormulariodeInformacinFinanciera_AN : managed {
    key Realm                       : String(50); // Realm
    key InternalId                  : String(30); // Document Id
        AclId                       : Double; // AclId
        cus_IDFiscalproveedor_m01kn : String(1000); // ID Fiscal proveedor
        DocumentVersion             : String(30); // Document Version
        FlexTypeId                  : String(300); // FlexTypeId
        IsTestForm                  : Boolean; // Test Form
        LoadCreateTime              : DateTime; // Load Create Time
        LoadUpdateTime              : DateTime; // Load Update Time
        ParentAgreement             : types.projectInfo; // Parent Agreement
        SourceSystem                : types.sourceSystem; // Source System
        Title                       : String(50); // Title
        TimeCreated                 : DateTime; // Time Created
        TimeUpdated                 : DateTime; // Time Updated
        cus_Proveedor_fmu1v         : Composition of many DformFormulariodeInformacinFinanciera_cus_Proveedor_fmu1v_AN
                                          on cus_Proveedor_fmu1v.DformFormulariodeInformacinFinanciera = $self;
}

entity DformFormulariodeInformacinFinanciera_cus_Proveedor_fmu1v_AN : cuid {
    key DformFormulariodeInformacinFinanciera : Association to DformFormulariodeInformacinFinanciera_AN;
        VUF_Supplier1                         : types.supplier; // Proveedor
}

namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformSeguimientoPoblacionVulnerable
    Description:     DformSeguimientoPoblacionVulnerable
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_SeguimientoPoblacinVulnerableFact
*/
entity DformSeguimientoPoblacionVulnerable_AN : managed {
    key Realm                          : String(50); // Realm
    key InternalId                     : String(30); // Document Id
        AclId                          : Double; // AclId
        cus_DFCantidadMinima_31j8n5    : Double; // cus_DFCantidadMinima
        cus_DFNumerodeEmpleados_31j8n5 : Double; // cus_DFNumerodeEmpleados
        DocumentVersion                : String(30); // Document Version
        FlexTypeId                     : String(300); // FlexTypeId
        IsTestForm                     : Boolean; // Test Form
        LoadCreateTime                 : DateTime; // Load Create Time
        LoadUpdateTime                 : DateTime; // Load Update Time
        ParentAgreement                : types.projectInfo; // Parent Agreement
        SourceSystem                   : types.sourceSystem; // Source System
        Title                          : String(50); // Title
        TimeCreated                    : DateTime; // Time Created
        TimeUpdated                    : DateTime; // Time Updated
}

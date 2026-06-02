namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformSIPMRegistrodeExperiencia
    Description:     DformSIPMRegistrodeExperiencia
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_SIPMRegistrodeExperienciaFact
*/
entity DformSIPMRegistrodeExperiencia_AN : managed {
    key Realm                     : String(50); // Realm
    key InternalId                : String(30); // Document Id
        AclId                     : Double; // AclId
        cus_regexpnombreorg_m01kn : String(1000); // Nombre de la organización
        cus_regexpnumid_m01kn     : String(1000); // Número de identificación
        FlexTypeId                : String(300); // FlexTypeId
        IsTestForm                : Boolean; // Test Form
        LoadCreateTime            : DateTime; // Load Create Time
        LoadUpdateTime            : DateTime; // Load Update Time
        ParentAgreement           : types.projectInfo; // Parent Agreement
        SourceSystem              : types.sourceSystem; // Source System
        Title                     : String(50); // Title
        TimeCreated               : DateTime; // Time Created
        TimeUpdated               : DateTime; // Time Updated
}

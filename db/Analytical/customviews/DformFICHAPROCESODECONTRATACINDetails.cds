namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformFICHAPROCESODECONTRATACINDetails
    Description:     DformFICHAPROCESODECONTRATACINDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_FICHAPROCESODECONTRATACINDetailsFact
*/
entity DformFICHAPROCESODECONTRATACINDetails_AN : managed {
    key Realm                   : String(50); // Realm
    key DFormId                 : String(30); // Contract Form ID
    key DetailLineNumber        : String(30); // Detail Line Number
        AclId                   : Double; // AclId
        cus_Causal_p58et        : String(1000); // Causal
        cus_Nombreadenda_p58et  : String(1000); // Nombre adenda
        cus_Observaciones_p58et : String(1000); // Observaciones
        FlexTypeId              : String(300); // FlexTypeId
        LoadCreateTime          : DateTime; // Load Create Time
        LoadUpdateTime          : DateTime; // Load Update Time
        ParentAgreement         : types.projectInfo; // Parent Agreement
        SourceSystem            : types.sourceSystem; // Source System
        TimeCreated             : DateTime; // Time Created
        TimeUpdated             : DateTime; // Time Updated
}

namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformMonedasmodificaciones
    Description:     DformMonedasmodificaciones
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_MonedasmodificacionesFact
*/
entity DformMonedasmodificaciones_AN : managed {
    key Realm            : String(50); // Realm
    key InternalId       : String(30); // Document Id
        AclId            : Double; // AclId
        cus_dform1_m01kn : String(1000); // ID
        cus_dform2_m01kn : String(1000); // Nombre
        DocumentVersion  : String(30); // Document Version
        FlexTypeId       : String(300); // FlexTypeId
        IsTestForm       : Boolean; // Test Form
        LoadCreateTime   : DateTime; // Load Create Time
        LoadUpdateTime   : DateTime; // Load Update Time
        ParentAgreement  : types.projectInfo; // Parent Agreement
        SourceSystem     : types.sourceSystem; // Source System
        Title            : String(50); // Title
        TimeCreated      : DateTime; // Time Created
        TimeUpdated      : DateTime; // Time Updated
        cus_dform3_pby9w : Composition of many DformMonedasmodificaciones_cus_dform3_pby9w_AN
                               on cus_dform3_pby9w.DformMonedasmodificaciones = $self;
}

entity DformMonedasmodificaciones_cus_dform3_pby9w_AN : cuid {
    key DformMonedasmodificaciones : Association to DformMonedasmodificaciones_AN;
        VUF_User1                  : types.user; // Jefe área requeridora
}

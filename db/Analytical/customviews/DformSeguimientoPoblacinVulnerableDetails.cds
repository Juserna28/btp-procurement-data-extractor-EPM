namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformSeguimientoPoblacinVulnerableDetails
    Description:     DformSeguimientoPoblacinVulnerableDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_SeguimientoPoblacinVulnerableDetailsFact
*/
entity DformSeguimientoPoblacinVulnerableDetails_AN : managed {
    key Realm                             : String(50); // Realm
    key DFormId                           : String(30); // Contract Form ID
    key DetailLineNumber                  : String(30); // Detail Line Number
        AclId                             : Double; // AclId
        cus_DFCantidadEmpleados_34ofhb    : Double; // Cantidad empleados de Grupos Poblacionales Vulnerables
        cus_DFCumplimiento_p58et          : String(1000); // Cumplimiento cantidad población vulnerable
        cus_DFFechaSeguimiento_36k5ok_Day : DateTime; // Fecha del seguimiento
        cus_DFGrupoPoblacional_p58et      : String(1000); // Grupo poblacional vulnerable
        cus_DFObservaciones_p58et         : String(1000); // Observaciones
        FlexTypeId                        : String(300); // FlexTypeId
        LoadCreateTime                    : DateTime; // Load Create Time
        LoadUpdateTime                    : DateTime; // Load Update Time
        ParentAgreement                   : types.projectInfo; // Parent Agreement
        SourceSystem                      : types.sourceSystem; // Source System
        TimeCreated                       : DateTime; // Time Created
        TimeUpdated                       : DateTime; // Time Updated
}

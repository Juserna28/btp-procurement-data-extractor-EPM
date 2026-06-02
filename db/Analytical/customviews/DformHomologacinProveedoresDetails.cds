namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformHomologacinProveedoresDetails
    Description:     DformHomologacinProveedoresDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_HomologacinProveedoresDetailsFact
*/
entity DformHomologacinProveedoresDetails_AN : managed {
    key Realm                        : String(50); // Realm
    key DetailLineNumber             : String(30); // Detail Line Number
    key DFormId                      : String(30); // Contract Form ID
        AclId                        : Double; // AclId
        cus_Clasificacion_p58et      : String(1000); // Clasificación
        cus_DFNombreProveed_3q5d1f   : types.supplier; // Nombre Proveedor
        cus_EstadoLista_p58et        : String(1000); // Estado en lista
        cus_FechaRegistro_36k5ok_Day : DateTime; // Fecha registro lista
        cus_Observaciones_p58et      : String(1000); // Observaciones
        FlexTypeId                   : String(300); // FlexTypeId
        LoadCreateTime               : DateTime; // Load Create Time
        LoadUpdateTime               : DateTime; // Load Update Time
        ParentAgreement              : types.projectInfo; // Parent Agreement
        SourceSystem                 : types.sourceSystem; // Source System
        TimeCreated                  : DateTime; // Time Created
        TimeUpdated                  : DateTime; // Time Updated
}

namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformHomologacinProveedores
    Description:     DformHomologacinProveedores
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_HomologacinProveedoresFact
*/
entity DformHomologacinProveedores_AN : managed {
    key Realm                               : String(50); // Realm
    key InternalId                          : String(30); // Document Id
        AclId                               : Double; // AclId
        cus_DFArticulos_m01kn               : String(1000); // Artículos
        cus_DFFechaActualizacion_33eyue_Day : DateTime; // Fecha actualización
        cus_DFIDLista_m01kn                 : String(1000); // ID Lista
        cus_Familia_m01kn                   : String(1000); // Familia
        cus_FechaVigencia_33eyue_Day        : DateTime; // Fecha vigencia
        cus_FMDCategoria_m01kn              : String(1000); // Categoría
        cus_Marca_m01kn                     : String(1000); // Marca
        cus_NombreLista_m01kn               : String(1000); // Nombre lista homologación
        cus_Subcategoria1_m01kn             : String(1000); // Subcategoria 1
        cus_Subcategoria2_m01kn             : String(1000); // Subcategoria 2
        cus_Subcatgoria3_m01kn              : String(1000); // Subcategoria 3
        DocumentVersion                     : String(30); // Document Version
        FlexTypeId                          : String(300); // FlexTypeId
        IsTestForm                          : Boolean; // Test Form
        LoadCreateTime                      : DateTime; // Load Create Time
        LoadUpdateTime                      : DateTime; // Load Update Time
        ParentAgreement                     : types.projectInfo; // Parent Agreement
        SourceSystem                        : types.sourceSystem; // Source System
        Title                               : String(50); // Title
        TimeCreated                         : DateTime; // Time Created
        TimeUpdated                         : DateTime; // Time Updated
        cus_DFArticulos2_4f9nvq             : Composition of many DformHomologacinProveedores_cus_DFArticulos2_4f9nvq_AN
                                                  on cus_DFArticulos2_4f9nvq.DformHomologacinProveedores = $self;
        cus_Requisitos_30acfm               : Composition of many DformHomologacinProveedores_cus_Requisitos_30acfm_AN
                                                  on cus_Requisitos_30acfm.DformHomologacinProveedores = $self;
}

entity DformHomologacinProveedores_cus_DFArticulos2_4f9nvq_AN : cuid {
    key DformHomologacinProveedores : Association to DformHomologacinProveedores_AN;
        VUF_1flexmasterdata         : String(1000); // Artículos
}

entity DformHomologacinProveedores_cus_Requisitos_30acfm_AN : cuid {
    key DformHomologacinProveedores : Association to DformHomologacinProveedores_AN;
        VUF_1string                 : String(1000); // Requisitos
}

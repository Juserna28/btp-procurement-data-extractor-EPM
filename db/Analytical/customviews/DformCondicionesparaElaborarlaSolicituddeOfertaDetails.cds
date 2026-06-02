namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformCondicionesparaElaborarlaSolicituddeOfertaDetails
    Description:     DformCondicionesparaElaborarlaSolicituddeOfertaDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_CONTRACTCondicionesparaElaborarlaSolicituddeOfertaDetailsFact
*/
entity DformCondicionesparaElaborarlaSolicituddeOfertaDetails_AN : managed {
    key Realm                        : String(50); // Realm
    key DFormId                      : String(30); // Contract Form ID
    key DetailLineNumber             : String(30); // Detail Line Number
        AclId                        : Double; // AclId
        cus_cmcondanos_34ofhb        : Double; // Años de Experiencia
        cus_cmcondcargo_p58et        : String(1000); // Cargo
        cus_cmcondexperiencia_p58et  : String(1000); // Experiencia en:
        cus_cmcondtiempo_22xqcb      : Double; // Tiempo de Dedicación
        cus_cmcondtitulo_p58et       : String(1000); // Título Académico
        cus_TiempodeDedicacion_p58et : String(1000); // Tiempo de Dedicación
        FlexTypeId                   : String(300); // FlexTypeId
        LoadCreateTime               : DateTime; // Load Create Time
        LoadUpdateTime               : DateTime; // Load Update Time
        ParentAgreement              : types.projectInfo; // Parent Agreement
        SourceSystem                 : types.sourceSystem; // Source System
        TimeCreated                  : DateTime; // Time Created
        TimeUpdated                  : DateTime; // Time Updated
}

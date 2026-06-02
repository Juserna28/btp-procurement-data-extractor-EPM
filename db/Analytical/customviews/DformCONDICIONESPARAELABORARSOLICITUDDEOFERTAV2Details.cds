namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2Details
    Description:     DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2Details
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_CONDICIONESPARAELABORARSOLICITUDDEOFERTAV2DetailsFact
*/
entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2Details_AN : managed {
    key Realm                   : String(50); // Realm
    key DFormId                 : String(30); // Contract Form ID
    key DetailLineNumber        : String(30); // Detail Line Number
        AclId                   : Double; // AclId
        cus_dfAnos_34ofhb       : Double; // Años de Experiencia
        cus_dfcargo_p58et       : String(1000); // Cargo
        cus_dfexperiencia_p58et : String(1000); // Experiencia en:
        cus_dftitulo_p58et      : String(1000); // Título Académico
        FlexTypeId              : String(300); // FlexTypeId
        LoadCreateTime          : DateTime; // Load Create Time
        LoadUpdateTime          : DateTime; // Load Update Time
        ParentAgreement         : types.projectInfo; // Parent Agreement
        SourceSystem            : types.sourceSystem; // Source System
        TimeCreated             : DateTime; // Time Created
        TimeUpdated             : DateTime; // Time Updated
}

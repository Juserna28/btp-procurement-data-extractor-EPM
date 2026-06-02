namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformDocumentosTransaccionalesDetails
    Description:     DformDocumentosTransaccionalesDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_DocumentosTransaccionalesDetailsFact
*/
entity DformDocumentosTransaccionalesDetails_AN : managed {
    key Realm                       : String(50); // Realm
    key DFormId                     : String(30); // Contract Form ID
    key DetailLineNumber            : String(30); // Detail Line Number
        AclId                       : Double; // AclId
        cus_Nombredelaempresa_p58et : String(1000); // Nombre de la empresa
        cus_Notasdocumentos_p58et   : String(1000); // Notas Documentos
        cus_Numerodocumento_34ofhb  : Double; // Número de Documento
        cus_Tipodocumento_p58et     : String(1000); // Tipo documento
        FlexTypeId                  : String(300); // FlexTypeId
        LoadCreateTime              : DateTime; // Load Create Time
        LoadUpdateTime              : DateTime; // Load Update Time
        ParentAgreement             : types.projectInfo; // Parent Agreement
        SourceSystem                : types.sourceSystem; // Source System
        TimeCreated                 : DateTime; // Time Created
        TimeUpdated                 : DateTime; // Time Updated
}

namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformFichadeaceptacindelcontratoDetails
    Description:     DformFichadeaceptacindelcontratoDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_CONTRACTFichadeaceptacindelcontratoDetailsFact
*/
entity DformFichadeaceptacindelcontratoDetails_AN : managed {
    key Realm                                              : String(50); // Realm
    key DFormId                                            : String(30); // Contract Form ID
    key DetailLineNumber                                   : String(30); // Detail Line Number
        AclId                                              : Double; // AclId
        cus_customerResourcesdfFACMonAceptLabel_p58et      : String(1000); // Codigo moneda local
        cus_customerResourcesdfFACValorMonAcepLa_22xqcb    : Double; // Valor en la moneda de aceptación Amount (COP)
        cus_customerResourcesdfFACValorMonAcepLa_p58et     : String(10); // Valor en la moneda de aceptación Currency Code
        cus_customerResourcesdfFACValorMonAcepLa_S1_22xqcb : Double; // Valor en la moneda de aceptación Amount (CLP)
        cus_customerResourcesdfFACValorMonAcepLa_S2_22xqcb : Double; // Valor en la moneda de aceptación Amount (USD)
        cus_customerResourcesdfFACValorMonAcepLa_S3_22xqcb : Double; // Valor en la moneda de aceptación Amount (EUR)
        cus_customerResourcesdfFACValorMonAcepLa_S4_22xqcb : Double; // Valor en la moneda de aceptación Amount (GTQ)
        cus_customerResourcesdfFACValorMonAcepLa_S6_22xqcb : Double; // Valor en la moneda de aceptación Amount (MXN)
        cus_Tasadecambioamonedalocal_22xqcb                : Double; // Tasa de cambio a moneda local
        FlexTypeId                                         : String(300); // FlexTypeId
        LoadCreateTime                                     : DateTime; // Load Create Time
        LoadUpdateTime                                     : DateTime; // Load Update Time
        ParentAgreement                                    : types.projectInfo; // Parent Agreement
        SourceSystem                                       : types.sourceSystem; // Source System
        TimeCreated                                        : DateTime; // Time Created
        TimeUpdated                                        : DateTime; // Time Updated
}

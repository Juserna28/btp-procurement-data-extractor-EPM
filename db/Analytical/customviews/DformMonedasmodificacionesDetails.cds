namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformMonedasmodificacionesDetails
    Description:     DformMonedasmodificacionesDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_MonedasmodificacionesDetailsFact
*/
entity DformMonedasmodificacionesDetails_AN : managed {
    key Realm                : String(50); // Realm
    key DFormId              : String(30); // Contract Form ID
    key DetailLineNumber     : String(30); // Detail Line Number
        AclId                : Double; // AclId
        cus_dform4_22xqcb    : Double; // Valor moneda Original modificación Amount (COP)
        cus_dform4_p58et     : String(10); // Valor moneda Original modificación Currency Code
        cus_dform4_S1_22xqcb : Double; // Valor moneda Original modificación Amount (CLP)
        cus_dform4_S2_22xqcb : Double; // Valor moneda Original modificación Amount (USD)
        cus_dform4_S3_22xqcb : Double; // Valor moneda Original modificación Amount (EUR)
        cus_dform4_S4_22xqcb : Double; // Valor moneda Original modificación Amount (GTQ)
        cus_dform4_S6_22xqcb : Double; // Valor moneda Original modificación Amount (MXN)
        cus_dform5_22xqcb    : Double; // Tasa de cambio a moneda local
        cus_dform7_p58et     : String(1000); // Codigo moneda local
        FlexTypeId           : String(300); // FlexTypeId
        LoadCreateTime       : DateTime; // Load Create Time
        LoadUpdateTime       : DateTime; // Load Update Time
        ParentAgreement      : types.projectInfo; // Parent Agreement
        SourceSystem         : types.sourceSystem; // Source System
        TimeCreated          : DateTime; // Time Created
        TimeUpdated          : DateTime; // Time Updated
}

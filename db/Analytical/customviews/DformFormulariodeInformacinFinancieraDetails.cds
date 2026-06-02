namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformFormulariodeInformacinFinancieraDetails
    Description:     DformFormulariodeInformacinFinancieraDetails
    Database Source: Analytical Reporting API
    Document Type:   ContractsDFormDetail_vrealm_50251_FormulariodeInformacinFinancieraDetailsFact
*/
entity DformFormulariodeInformacinFinancieraDetails_AN : managed {
    key Realm                                  : String(50); // Realm
    key DFormId                                : String(30); // Contract Form ID
    key DetailLineNumber                       : String(30); // Detail Line Number
        cus_Activocorriente2_p58et             : String(1000); // Activo corriente
        cus_Activototal2_p58et                 : String(1000); // Activo Total
        cus_CapitaldeTrabajoNeto3_p58et        : String(1000); // Utilidad neta
        cus_CapitaldeTrabajoNetoReport_22xqcb  : Double; // Capital de Trabajo Neto Report
        cus_Fechacierrefiscal_36k5ok_Day       : DateTime; // Fecha cierre fiscal
        cus_IndicedeendeudamientoReport_22xqcb : Double; // Indice de endeudamiento Report
        cus_IndicedeliquidezReport_22xqcb      : Double; // Indice de liquidez Report
        cus_Monedainformacionfinanciera_p58et  : String(1000); // Moneda informacion financiera
        cus_Pasivocorriente2_p58et             : String(1000); // Pasivo corriente
        cus_Pasivototal2_p58et                 : String(1000); // Pasivo total
        FlexTypeId                             : String(300); // FlexTypeId
        LoadCreateTime                         : DateTime; // Load Create Time
        LoadUpdateTime                         : DateTime; // Load Update Time
        ParentAgreement                        : types.projectInfo; // Parent Agreement
        SourceSystem                           : types.sourceSystem; // Source System
        TimeCreated                            : DateTime; // Time Created
        TimeUpdated                            : DateTime; // Time Updated
}

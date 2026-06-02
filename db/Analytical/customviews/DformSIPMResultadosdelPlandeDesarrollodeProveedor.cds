namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformSIPMResultadosdelPlandeDesarrollodeProveedor
    Description:     DformSIPMResultadosdelPlandeDesarrollodeProveedor
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_SIPMResultadosdelPlandeDesarrollodeProveedorFact
*/
entity DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN : managed {
    key Realm                                : String(50); // Realm
    key InternalId                           : String(30); // Document Id
        AclId                                : Double; // AclId
        cus_ObservacionesGrupoEPM_m01kn      : String(1000); // Observaciones
        cus_ObservacionesProveedor_m01kn     : String(1000); // Observaciones
        cus_ResultadoobtenidoGrupoEPM_m01kn  : String(1000); // Resultado obtenido (Grupo EPM)
        cus_ResultadoobtenidoProveedor_m01kn : String(1000); // Resultado obtenido (Proveedor)
        cus_sipmresplancategoria_m01kn       : String(1000); // Categoría
        cus_sipmresplanconcl_m01kn           : String(1000); // Conclusiones
        cus_sipmresplandiagn_m01kn           : String(1000); // Diagnóstico del proveedor
        cus_sipmresplaneficepm_43zzy2        : Boolean; // ¿El programa generó eficiencias para el Grupo EPM?
        cus_sipmresplaneficprov_43zzy2       : Boolean; // ¿El programa generó eficiencias para el proveedor?
        cus_sipmresplanfefin_33eyue_Day      : DateTime; // Fecha finalización
        cus_sipmresplanfeini_33eyue_Day      : DateTime; // Fecha de inicio
        cus_sipmresplanid_m01kn              : String(1000); // ID
        cus_sipmresplanvalefiepm_1zsji5      : Double; // Valor de eficiencias (Grupo EPM) Amount (COP)
        cus_sipmresplanvalefiepm_m01kn       : String(10); // Valor de eficiencias (Grupo EPM) Currency Code
        cus_sipmresplanvalefiepm_S1_1zsji5   : Double; // Valor de eficiencias (Grupo EPM) Amount (CLP)
        cus_sipmresplanvalefiepm_S2_1zsji5   : Double; // Valor de eficiencias (Grupo EPM) Amount (USD)
        cus_sipmresplanvalefiepm_S3_1zsji5   : Double; // Valor de eficiencias (Grupo EPM) Amount (EUR)
        cus_sipmresplanvalefiepm_S4_1zsji5   : Double; // Valor de eficiencias (Grupo EPM) Amount (GTQ)
        cus_sipmresplanvalefiepm_S6_1zsji5   : Double; // Valor de eficiencias (Grupo EPM) Amount (MXN)
        cus_sipmresplanvalefiprov_1zsji5     : Double; // Valor de eficiencias (Proveedor) Amount (COP)
        cus_sipmresplanvalefiprov_m01kn      : String(10); // Valor de eficiencias (Proveedor) Currency Code
        cus_sipmresplanvalefiprov_S1_1zsji5  : Double; // Valor de eficiencias (Proveedor) Amount (CLP)
        cus_sipmresplanvalefiprov_S2_1zsji5  : Double; // Valor de eficiencias (Proveedor) Amount (USD)
        cus_sipmresplanvalefiprov_S3_1zsji5  : Double; // Valor de eficiencias (Proveedor) Amount (EUR)
        cus_sipmresplanvalefiprov_S4_1zsji5  : Double; // Valor de eficiencias (Proveedor) Amount (GTQ)
        cus_sipmresplanvalefiprov_S6_1zsji5  : Double; // Valor de eficiencias (Proveedor) Amount (MXN)
        cus_sipmresplanvalora_m01kn          : String(1000); // Valoración
        FlexTypeId                           : String(300); // FlexTypeId
        IsTestForm                           : Boolean; // Test Form
        LoadCreateTime                       : DateTime; // Load Create Time
        LoadUpdateTime                       : DateTime; // Load Update Time
        ParentAgreement                      : types.projectInfo; // Parent Agreement
        SourceSystem                         : types.sourceSystem; // Source System
        Title                                : String(50); // Title
        TimeCreated                          : DateTime; // Time Created
        TimeUpdated                          : DateTime; // Time Updated
        cus_sipmresplancate_3xxp4o           : Composition of many DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancate_3xxp4o_AN
                                                   on cus_sipmresplancate_3xxp4o.DformSIPMResultadosdelPlandeDesarrollodeProveedor = $self;
        cus_sipmresplancrit_30acfm           : Composition of many DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancrit_30acfm_AN
                                                   on cus_sipmresplancrit_30acfm.DformSIPMResultadosdelPlandeDesarrollodeProveedor = $self;
        cus_sipmresplanobj_3qb084            : Composition of many DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanobj_3qb084_AN
                                                   on cus_sipmresplanobj_3qb084.DformSIPMResultadosdelPlandeDesarrollodeProveedor = $self;
        cus_sipmresplanprov_fmu1v            : Composition of many DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanprov_fmu1v_AN
                                                   on cus_sipmresplanprov_fmu1v.DformSIPMResultadosdelPlandeDesarrollodeProveedor = $self;
}

entity DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancrit_30acfm_AN : cuid {
    key DformSIPMResultadosdelPlandeDesarrollodeProveedor : Association to DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN;
        VUF_1string                                       : String(1000); // Criterios de selección del proveedor
}

entity DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanobj_3qb084_AN : cuid {
    key DformSIPMResultadosdelPlandeDesarrollodeProveedor : Association to DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN;
        VUF_10string                                      : String(1000); // Objetivos del plan
}

entity DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplancate_3xxp4o_AN : cuid {
    key DformSIPMResultadosdelPlandeDesarrollodeProveedor : Association to DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN;
        VUF_Commodity1                                    : types.commodity; // Categoría
}

entity DformSIPMResultadosdelPlandeDesarrollodeProveedor_cus_sipmresplanprov_fmu1v_AN : cuid {
    key DformSIPMResultadosdelPlandeDesarrollodeProveedor : Association to DformSIPMResultadosdelPlandeDesarrollodeProveedor_AN;
        VUF_Supplier1                                     : types.supplier; // Proveedor
}

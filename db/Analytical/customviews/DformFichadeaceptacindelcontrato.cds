namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformFichadeaceptacindelcontrato
    Description:     DformFichadeaceptacindelcontrato
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_CONTRACTFichadeaceptacindelcontratoFact
*/
entity DformFichadeaceptacindelcontrato_AN : managed {
    key Realm                                               : String(50); // Realm
    key InternalId                                          : String(30); // Document Id
        AclId                                               : Double; // AclId
        cus_Apellidosdelcontactodelproveedor_m01kn          : String(1000); // Apellidos del contacto del proveedor
        cus_Apellidosdelrepresentantelegaldelcon_m01kn      : String(1000); // Apellidos del representante legal del contratista
        cus_Cantidaddeadendas_31j8n5                        : Double; // Cantidad de adendas
        cus_ContCorAlianzaEstrategica_43zzy2                : Boolean; // ¿El contrato generado corresponde a una alianza estratégica?
        cus_ContratoEntregaBEX_43zzy2                       : Boolean; // Contrato con entrega de bienes en el exterior
        cus_Cuanta_m01kn                                    : String(1000); // Cuantía
        cus_customerResourcesdFACclasifGpoEPMLab_m01kn      : String(1000); // Clase de Contratacion
        cus_customerResourcesdfFACClasifNIIFLabe_m01kn      : String(1000); // Clasificación NIIF
        cus_customerResourcesdfFACContAntoPgAntL_m01kn      : String(1000); // ¿El contrato tiene anticipo o pago anticipado?
        cus_customerResourcesdfFACContLiqLabel_43zzy2       : Boolean; // ¿El contrato debe ser liquidado?
        cus_customerResourcesdfFACContObdNecProL_43zzy2     : Boolean; // ¿El contrato obedece a la necesidad de un Proyecto?
        cus_customerResourcesdfFACContRenovLabel_43zzy2     : Boolean; // ¿El contrato es renovable?
        cus_customerResourcesdfFACContTnPVLabel_43zzy2      : Boolean; // ¿El contrato tiene pago variable?
        cus_customerResourcesdfFACDescActBsLabel_m01kn      : String(1000); // Descripción de los activos o bienes
        cus_customerResourcesdfFACDesembPerFijLa_43zzy2     : Boolean; // ¿El contrato tiene desembolsos periódicos fijos?
        cus_customerResourcesdfFACemailContProLa_m01kn      : String(1000); // Correo electrónico del contacto del proveedor
        cus_customerResourcesdfFACfechacepLabel_33eyue_Day  : DateTime; // Fecha de liquidacion
        cus_customerResourcesdfFACfechacomacepof_33eyue_Day : DateTime; // Fecha de recibo comunicación aceptación de oferta
        cus_customerResourcesdfFACIndAplicLabel_m01kn       : String(1000); // Índice aplicable
        cus_customerResourcesdfFACJustNIIFLabel_m01kn       : String(1000); // Justificación reclasificación NIIF
        cus_customerResourcesdfFACPropBnServLabe_43zzy2     : Boolean; // ¿La propiedad del activo o bien al final del contrato quedará para el contratante?
        cus_customerResourcesdfFACReClasifNIIFLa_m01kn      : String(1000); // Reclasificación NIIF
        cus_customerResourcesdfFACTelContProLabe_m01kn      : String(1000); // Teléfono del contacto del proveedor
        cus_customerResourcesdfFACTipoNIIFLabel_m01kn       : String(1000); // Tipología de contrato NIIF
        cus_customerResourcesdfFACUsoActLabel_43zzy2        : Boolean; // ¿La ejecución del contrato depende del uso de un activo y que el mismo esté explícito en el contrato?
        cus_customerResourcesdfFACValorDesFijLab_1zsji5     : Double; // Valor desembolsos periódicos fijos Amount (COP)
        cus_customerResourcesdfFACValorDesFijLab_m01kn      : String(10); // Valor desembolsos periódicos fijos Currency Code
        cus_customerResourcesdfFACValorDesFijLab_S1_1zsji5  : Double; // Valor desembolsos periódicos fijos Amount (CLP)
        cus_customerResourcesdfFACValorDesFijLab_S2_1zsji5  : Double; // Valor desembolsos periódicos fijos Amount (USD)
        cus_customerResourcesdfFACValorDesFijLab_S3_1zsji5  : Double; // Valor desembolsos periódicos fijos Amount (EUR)
        cus_customerResourcesdfFACValorDesFijLab_S4_1zsji5  : Double; // Valor desembolsos periódicos fijos Amount (GTQ)
        cus_customerResourcesdfFACValorDesFijLab_S6_1zsji5  : Double; // Valor desembolsos periódicos fijos Amount (MXN)
        cus_cutomerResourcesdfFACSancMultLabel_43zzy2       : Boolean; // ¿El contrato tiene pactadas sanciones o multas diferentes a las definidas en el Grupo EPM?
        cus_DFContratoIncluyo_43zzy2                        : Boolean; // ¿En el contrato se incluyó personal de especial protección o población vulnerable?
        cus_Elcontratogeneraempleoexterno_43zzy2            : Boolean; // ¿El contrato genera empleo externo?
        cus_ElcontratotieneTopesSalarialesMinimo_43zzy2     : Boolean; // El contrato tiene Topes Salariales Minimos?
        cus_ElProcesodeContrataciontuvoajusteeco_m01kn      : String(1000); // ¿El proceso de contratación tuvo Ajuste económico o Negociación directa?
        cus_Empresa_m01kn                                   : String(1000); // Empresa
        cus_Firmasdelcontrato_m01kn                         : String(1000); // Firmas del contrato
        cus_IDdeContrato_m01kn                              : String(1000); // ID de Contrato
        cus_Indiquecual_m01kn                               : String(1000); // Indique cual
        cus_Indiquelassancionesomultasdiferentes_m01kn      : String(1000); // Indique las sanciones o multas diferentes a las definidas en el Grupo EPM
        cus_InterventoriaTerceros_43zzy2                    : Boolean; // Interventoria con Terceros
        cus_JustNoClauPEP_m01kn                             : String(1000); // Justificación no cláusula personal especial protección
        cus_LicenciamUnico_43zzy2                           : Boolean; // Licenciamiento Único (Software)
        cus_modcontra_m01kn                                 : String(1000); // Modalidad de Contratación
        cus_Nombredelcontactodelproveedor_m01kn             : String(1000); // Nombre del contacto del proveedor
        cus_Nombresdelrepresentantelegaldelcontr_m01kn      : String(1000); // Nombres del representante legal del contratista
        cus_Numerodedocumentodeidentificaciondel_m01kn      : String(1000); // Número de documento de identificación del representante legal del contratista
        cus_Numeroderenovaciones_31j8n5                     : Double; // Numero de renovaciones
        cus_Procedimiento_m01kn                             : String(1000); // Procedimiento
        cus_Razonparasolicitudunicaprivadadeofer_m01kn      : String(1000); // Razon para solicitud unica/privada de oferta
        cus_Valordelanticipoopagoanticipado_1zsji5          : Double; // Valor del anticipo o pago anticipado Amount (COP)
        cus_Valordelanticipoopagoanticipado_m01kn           : String(10); // Valor del anticipo o pago anticipado Currency Code
        cus_Valordelanticipoopagoanticipado_S1_1zsji5       : Double; // Valor del anticipo o pago anticipado Amount (CLP)
        cus_Valordelanticipoopagoanticipado_S2_1zsji5       : Double; // Valor del anticipo o pago anticipado Amount (USD)
        cus_Valordelanticipoopagoanticipado_S3_1zsji5       : Double; // Valor del anticipo o pago anticipado Amount (EUR)
        cus_Valordelanticipoopagoanticipado_S4_1zsji5       : Double; // Valor del anticipo o pago anticipado Amount (GTQ)
        cus_Valordelanticipoopagoanticipado_S6_1zsji5       : Double; // Valor del anticipo o pago anticipado Amount (MXN)
        DocumentVersion                                     : String(30); // Document Version
        FlexTypeId                                          : String(300); // FlexTypeId
        IsTestForm                                          : Boolean; // Test Form
        LoadCreateTime                                      : DateTime; // Load Create Time
        LoadUpdateTime                                      : DateTime; // Load Update Time
        ParentAgreement                                     : types.projectInfo; // Parent Agreement
        SourceSystem                                        : types.sourceSystem; // Source System
        Title                                               : String(50); // Title
        TimeCreated                                         : DateTime; // Time Created
        TimeUpdated                                         : DateTime; // Time Updated
        cus_Amparos_3qb084                                  : Composition of many DformFichadeaceptacindelcontrato_cus_Amparos_3qb084_AN
                                                                  on cus_Amparos_3qb084.DformFichadeaceptacindelcontrato = $self;
        cus_GruposPoblacionales_20d1t2                      : Composition of many DformFichadeaceptacindelcontrato_cus_GruposPoblacionales_20d1t2_AN
                                                                  on cus_GruposPoblacionales_20d1t2.DformFichadeaceptacindelcontrato = $self;
        cus_Indiquelosprocesosalosqueobedecelane_30acfm     : Composition of many DformFichadeaceptacindelcontrato_cus_Indiquelosprocesosalosqueobedecelane_30acfm_AN
                                                                  on cus_Indiquelosprocesosalosqueobedecelane_30acfm.DformFichadeaceptacindelcontrato = $self;
        cus_Indiquelosproyectosalosqueobedecelan_nf9yd      : Composition of many DformFichadeaceptacindelcontrato_cus_Indiquelosproyectosalosqueobedecelan_nf9yd_AN
                                                                  on cus_Indiquelosproyectosalosqueobedecelan_nf9yd.DformFichadeaceptacindelcontrato = $self;
        cus_customerResourcesdfFACCompAcepOfLabe_pby9w      : Composition of many DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACCompAcepOfLabe_pby9w_AN
                                                                  on cus_customerResourcesdfFACCompAcepOfLabe_pby9w.DformFichadeaceptacindelcontrato = $self;
        cus_customerResourcesdfFACPaisOriLabel_uk4vv        : Composition of many DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACPaisOriLabel_uk4vv_AN
                                                                  on cus_customerResourcesdfFACPaisOriLabel_uk4vv.DformFichadeaceptacindelcontrato = $self;
}

entity DformFichadeaceptacindelcontrato_cus_Indiquelosprocesosalosqueobedecelane_30acfm_AN : cuid {
    key DformFichadeaceptacindelcontrato : Association to DformFichadeaceptacindelcontrato_AN;
        VUF_1string                      : String(1000); // Indique los procesos a los que obedece la necesidad del contrato
}

entity DformFichadeaceptacindelcontrato_cus_Amparos_3qb084_AN : cuid {
    key DformFichadeaceptacindelcontrato : Association to DformFichadeaceptacindelcontrato_AN;
        VUF_10string                     : String(1000); // Amparos
}

entity DformFichadeaceptacindelcontrato_cus_Indiquelosproyectosalosqueobedecelan_nf9yd_AN : cuid {
    key DformFichadeaceptacindelcontrato : Association to DformFichadeaceptacindelcontrato_AN;
        VUF_11string                     : String(1000); // Indique los proyectos a los que obedece la necesidad del contrato
}

entity DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACPaisOriLabel_uk4vv_AN : cuid {
    key DformFichadeaceptacindelcontrato : Association to DformFichadeaceptacindelcontrato_AN;
        VUF_Region1                      : types.region; // País de origen del bien o servicio
}

entity DformFichadeaceptacindelcontrato_cus_customerResourcesdfFACCompAcepOfLabe_pby9w_AN : cuid {
    key DformFichadeaceptacindelcontrato : Association to DformFichadeaceptacindelcontrato_AN;
        VUF_User1                        : types.user; // Competente de aceptación de oferta
}

entity DformFichadeaceptacindelcontrato_cus_GruposPoblacionales_20d1t2_AN : cuid {
    key DformFichadeaceptacindelcontrato : Association to DformFichadeaceptacindelcontrato_AN;
        VUF_12string                     : String(1000); // cus_GruposPoblacionales
}

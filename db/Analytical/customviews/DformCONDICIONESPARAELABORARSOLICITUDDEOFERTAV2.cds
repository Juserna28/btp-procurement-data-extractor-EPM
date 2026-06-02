namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2
    Description:     DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_CONDICIONESPARAELABORARSOLICITUDDEOFERTAV2Fact
*/
entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN : managed {
    key Realm                               : String(50); // Realm
    key InternalId                          : String(30); // Document Id
        AclId                               : Double; // AclId
        cus_dfactividades_m01kn             : String(1000); // Describa las actividades que se pueden subcontratar
        cus_dfadicionales_m01kn             : String(1000); // Observaciones adicionales
        cus_dfadmiten_43zzy2                : Boolean; // ¿Se admiten ofertas alternativas?
        cus_dfajuste_43zzy2                 : Boolean; // ¿Se requiere reajuste de precios del contrato?
        cus_dfalcance_m01kn                 : String(1000); // Alcance de los certificados del sistema de gestión
        cus_dfaplicareno_43zzy2             : Boolean; // ¿Aplica renovación?
        cus_dfaspectos_m01kn                : String(1000); // ASPECTOS ADICIONALES DEL PROCESO
        cus_dfautorizacion_43zzy2           : Boolean; // ¿Se requiere autorización de distribución / comercialización?
        cus_dfbancodedatos_m01kn            : String(1000); // BANCO DE DATOS
        cus_dfbienes_m01kn                  : String(1000); // Bienes nacionales, importados o ambos
        cus_dfcapacitacion_31j8n5           : Double; // Plazo estimado de capacitación (en días)
        cus_dfcategoriasubcategoria_43zzy2  : Boolean; // ¿La categoría / subcategoría del proceso de contratación tiene Bancos de Datos de Criterios de Participación y Ponderación Homologados?
        cus_dfcertificados2_m01kn           : String(1000); // Indique los certificados de calidad a solicitar
        cus_dfcertificados4_m01kn           : String(1000); // Certificados aplicables al producto
        cus_dfcondiciones_m01kn             : String(1000); // CONDICIONES DEL CONTRATO
        cus_dfdescripcion_m01kn             : String(1000); // Descripción de muestras y pruebas
        cus_dfdetalle_m01kn                 : String(1000); // Detalle de la experiencia a solicitar o la justificación por no solicitar experiencia
        cus_dfdetalleforma_m01kn            : String(1000); // Detalle de forma de pago
        cus_dfdetallerequi_m01kn            : String(1000); // Detalle los requisitos financieros que aplican
        cus_dfexcepcion_m01kn               : String(1000); // Excepción al estándar de ponderación y otros factores
        cus_dfexisten_43zzy2                : Boolean; // ¿Existen contratos previos?
        cus_dffactores_m01kn                : String(1000); // FACTORES DE EVALUACIÓN
        cus_dffases_31j8n5                  : Double; // Plazo estimado de otras posibles fases del contrato (en días)
        cus_dffechaconsultabanco_33eyue_Day : DateTime; // Fecha de consulta Banco de Datos
        cus_dffinancieros_43zzy2            : Boolean; // ¿Aplican requisitos financieros?
        cus_dfforma_m01kn                   : String(1000); // Forma de aceptación de ofertas
        cus_dfformula_m01kn                 : String(1000); // Forma o fórmula de reajuste
        cus_dfindiquenumero_m01kn           : String(1000); // Indique el número (s) de contrato (s)
        cus_dfjustificacion_m01kn           : String(1000); // Justificación de solicitud única / privada
        cus_dfjustificaciontipo_m01kn       : String(1000); // Justificación sobre el tipo de participantes
        cus_dflugar_m01kn                   : String(1000); // Lugar de entrega de los bienes y/o prestación de los servicios
        cus_dfmarcaespe_m01kn               : String(1000); // Detalle y justificación de marca específica
        cus_dfmedidas_m01kn                 : String(1000); // Medidas de apremio y/o descuentos operativos
        cus_dfmodelotipo_m01kn              : String(1000); // ESTRATEGIA MODELO
        cus_dfmuestra_43zzy2                : Boolean; // ¿Se requieren muestras y/o realizar pruebas?
        cus_dfobservaciones2_m01kn          : String(1000); // Observaciones a los plazos
        cus_dfobservaciones3_m01kn          : String(1000); // Observaciones Estrategia Modelo – Análisis mercado de proveedores
        cus_dfobservaciones4_m01kn          : String(1000); // Observaciones Estrategia Modelo - Análisis de Riegos
        cus_dfobservaciones_m01kn           : String(1000); // Observaciones Estrategia Modelo - Análisis de Costos
        cus_dfoferta_43zzy2                 : Boolean; // ¿Se requiere que la oferta sea abonada (convalidada por técnico)?
        cus_dfotros_m01kn                   : String(1000); // ¿Cuáles otros certificados de producto deben solicitarse al oferente?
        cus_dfotrosrequi_m01kn              : String(1000); // Otros requisitos de participación
        cus_dfpactar_m01kn                  : String(1000); // ¿Se requiere pactar anticipo o pago anticipado?
        cus_dfparticipantes_m01kn           : String(1000); // PARTICIPANTES Y REQUISITOS
        cus_dfpersonal_43zzy2               : Boolean; // En el proceso contractual indique si ¿es viable o no incluir la cláusula de vinculación de personal con especial protección constitucional?
        cus_dfplazo_31j8n5                  : Double; // Plazo estimado de entrega de bienes (en días)
        cus_dfplazoestimado_31j8n5          : Double; // Plazo estimado de prestación de servicios o ejecución de obras (en días)
        cus_dfporcentaje_1zsji5             : Double; // Porcentaje anticipo / pago anticipado
        cus_dfproceso_43zzy2                : Boolean; // ¿El proceso se tramitará como Oferta no Vinculante?
        cus_dfprofesional2_m01kn            : String(1000); // Profesional que debe abonar la oferta
        cus_dfprofesional_m01kn             : String(1000); // Profesional que debe asistir a la reunión y/o visita
        cus_dfrazon_m01kn                   : String(1000); // Razón para solicitud única / privada de oferta
        cus_dfreferente_43zzy2              : Boolean; // ¿La categoría / subcategoría del proceso de contratación tiene desarrollo de Estrategia Modelo?
        cus_dfreunion_43zzy2                : Boolean; // ¿Se requiere reunión informativa y/o visita técnica?
        cus_dfriesgo_m01kn                  : String(1000); // Riesgo cambiario
        cus_dfsubcontratar_43zzy2           : Boolean; // ¿Se puede subcontratar?
        cus_dftratamiento_43zzy2            : Boolean; // ¿El proceso y / o contrato tendrá un tratamiento de confidencialidad?
        cus_dftributario_43zzy2             : Boolean; // ¿Aplica beneficio tributario, IVA descontable de renta?
        cus_dfutiliza2_43zzy2               : Boolean; // ¿Utiliza como referente la Estrategia Modelo – Análisis mercado de proveedores?
        cus_dfutiliza3_43zzy2               : Boolean; // ¿Utiliza como Referente la Estrategia Modelo - Análisis de Riegos?
        cus_dfutiliza_43zzy2                : Boolean; // ¿Utiliza como Referente la Estrategia Modelo - Análisis de Costos?
        cus_dfvigencia_33eyue_Day           : DateTime; // Vigencia de la Estrategia Modelo utilizada
        cus_dfvinculante_m01kn              : String(1000); // Justificación de Oferta no Vinculante
        cus_JustNoClausPEP_m01kn            : String(1000); // Justificación no cláusula personal especial protección
        cus_modcontra_m01kn                 : String(1000); // Modalidad de Contratación
        cus_Tipodesolicitud_m01kn           : String(1000); // Tipo de solicitud
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
        cus_dfcertificados5_nf9yd           : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados5_nf9yd_AN
                                                  on cus_dfcertificados5_nf9yd.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_dfcertificados_20d1t2           : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados_20d1t2_AN
                                                  on cus_dfcertificados_20d1t2.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_dfgrupos_407xpy                 : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfgrupos_407xpy_AN
                                                  on cus_dfgrupos_407xpy.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_dfindique_3qb084                : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfindique_3qb084_AN
                                                  on cus_dfindique_3qb084.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_dfmodalidad_30acfm              : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmodalidad_30acfm_AN
                                                  on cus_dfmodalidad_30acfm.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_dfmonedas_4d84ab                : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmonedas_4d84ab_AN
                                                  on cus_dfmonedas_4d84ab.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_dfpersonas_fmu1v                : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfpersonas_fmu1v_AN
                                                  on cus_dfpersonas_fmu1v.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_dftipoparticipantes_2na5v9      : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dftipoparticipantes_2na5v9_AN
                                                  on cus_dftipoparticipantes_2na5v9.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
        cus_tipocontrato_1ace0k             : Composition of many DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_tipocontrato_1ace0k_AN
                                                  on cus_tipocontrato_1ace0k.DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 = $self;
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmodalidad_30acfm_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_1string                                     : String(255); // VUF_1string
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfmonedas_4d84ab_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_2string                                     : String(255); // VUF_2string
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_tipocontrato_1ace0k_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_3string                                     : String(255); // VUF_3string
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dftipoparticipantes_2na5v9_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_4string                                     : String(255); // VUF_4string
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfindique_3qb084_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_10string                                    : String(255); // VUF_10string
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados5_nf9yd_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_11string                                    : String(255); // VUF_11string
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfcertificados_20d1t2_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_12string                                    : String(255); // VUF_12string
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfpersonas_fmu1v_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_Supplier1                                   : types.supplier; // VUF_Supplier1
}

entity DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_cus_dfgrupos_407xpy_AN : cuid {
    key DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2 : Association to DformCONDICIONESPARAELABORARSOLICITUDDEOFERTAV2_AN;
        VUF_5string                                     : String(255); // VUF_5string
}

namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformCondicionesparaElaborarlaSolicituddeOferta
    Description:     DformCondicionesparaElaborarlaSolicituddeOferta
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_CONTRACTCondicionesparaElaborarlaSolicituddeOfertaFact
*/
entity DformCondicionesparaElaborarlaSolicituddeOferta_AN : managed {
    key Realm                                           : String(50); // Realm
    key InternalId                                      : String(30); // Document Id
        AclId                                           : Double; // AclId
        cus_certificadoscalidadsolicitar_m01kn          : String(1000); // Indique los certificados de calidad a solicitar
        cus_customerResourcesAlcanceCertificados_m01kn  : String(1000); // Alcance de los certificados del sistema de gestión
        cus_customerResourcesAplicaBeneficioTrib_43zzy2 : Boolean; // ¿Aplica beneficio tributario, IVA descontable de renta?
        cus_customerResourcesBienesNacionalesImp_m01kn  : String(1000); // Bienes nacionales, importados o ambos
        cus_customerResourcescategoria_m01kn            : String(1000); // Categoría
        cus_customerResourcesDescripcionMuestras_m01kn  : String(1000); // Descripción de muestras y pruebas
        cus_customerResourcesDetalleAbastecimien_m01kn  : String(1000); // Medidas de apremio y/o descuentos operativos
        cus_customerResourcesDetalleConsolidacio_m01kn  : String(1000); // HIDE_Detalle de Consolidacion de volumen
        cus_customerResourcesDetalleEnfoqueLabel_m01kn  : String(1000); // HIDE_Detalle del enfoque
        cus_customerResourcesDetalleEstrategiaLa_m01kn  : String(1000); // HIDE Detalle de la Estrategia
        cus_customerResourcesDetalleJustificacio_m01kn  : String(1000); // Detalle y justificación de marca específica
        cus_customerResourcesDetalleMejorPrecioL_m01kn  : String(1000); // HIDE_Detalle de Mejor Precio
        cus_customerResourcesDetalleRedisenoLabe_m01kn  : String(1000); // HIDE_Detalle de Rediseno del Bien o servicio
        cus_customerResourcesDetalleRelacionesLa_m01kn  : String(1000); // HIDE_Detalle de Relaciones estrategicas con los proveedores
        cus_customerResourcesDetalleSeleccionLab_m01kn  : String(1000); // Detalle de la selección
        cus_customerResourcesDetallesExperiencia_m01kn  : String(1000); // Detalle de la experiencia requerida
        cus_customerResourcesEstrategiaMateriale_m01kn  : String(1000); // HIDE_Estrategia de materiales y servicios
        cus_customerResourcesExcepcionEstandarPo_m01kn  : String(1000); // Excepción al estándar de ponderación y otros factores
        cus_customerResourcesFormulaReajusteLabe_m01kn  : String(1000); // Forma o fórmula de reajuste
        cus_customerResourcesJustificacionNoCert_m01kn  : String(1000); // Justificación para no exigir certificado de calidad
        cus_customerResourcesJustificacionSolici_m01kn  : String(1000); // Justificación de solicitud única / privada
        cus_customerResourcesJustificacionTipoPa_m01kn  : String(1000); // Justificación sobre el tipo de participantes
        cus_customerResourcesJustiOferNoVinLabel_m01kn  : String(1000); // Justificación de Oferta no Vinculante
        cus_customerResourcesModalidadContrataci_m01kn  : String(1000); // Modalidad de contratación (Selección de proveedores)
        cus_customerResourcesOtrosCertificadosLa_m01kn  : String(1000); // ¿Cuáles otros certificados de producto deben solicitarse al oferente?
        cus_customerResourcesOtrosRequisitosLabe_m01kn  : String(1000); // Otros requisitos de participación
        cus_customerResourcesPlazoEstimadoCapaci_31j8n5 : Double; // Plazo estimado de capacitación (en días)
        cus_customerResourcesPlazoEstimadoEntreg_31j8n5 : Double; // Plazo estimado de entrega de bienes (en días)
        cus_customerResourcesPlazoEstimadoOtrasF_31j8n5 : Double; // Plazo estimado de otras posibles fases del contrato (en días)
        cus_customerResourcesPlazoEstimadoPresta_31j8n5 : Double; // Plazo estimado de prestación de servicios (en días)
        cus_customerResourcesPorcentajeAnticipoL_1zsji5 : Double; // Porcentaje anticipo / pago anticipado
        cus_customerResourcesProcTramOferNoVinLa_43zzy2 : Boolean; // ¿El proceso se tramitará como Oferta no Vinculante?
        cus_customerResourcesProfesionalQueAbona_m01kn  : String(1000); // Profesional que debe abonar la oferta
        cus_customerResourcesProfesionalQueAsist_m01kn  : String(1000); // Profesional que debe asistir a la reunión y/o visita
        cus_customerResourcesRazonSolicitudUnica_m01kn  : String(1000); // Razón para solicitud única/privada de oferta
        cus_customerResourcesSeRequiereAbonoLabe_43zzy2 : Boolean; // ¿Se requiere que la oferta sea abonada (convalidada por técnico)?
        cus_customerResourcesSeRequiereAutorizac_43zzy2 : Boolean; // ¿Se requiere autorización de distribución / comercialización?
        cus_customerResourcesSeRequierenMuestras_43zzy2 : Boolean; // ¿Se requieren muestras y/o realizar pruebas?
        cus_customerResourcesSeRequierePactarAnt_m01kn  : String(1000); // ¿Se requiere pactar anticipo o pago anticipado?
        cus_customerResourcesSeRequiereReajusteL_43zzy2 : Boolean; // ¿Se requiere reajuste de precios del contrato?
        cus_customerResourcesSeRequiereReunionIn_43zzy2 : Boolean; // ¿Se requiere reunión informativa y/o visita técnica?
        cus_Detalledeformadepago_m01kn                  : String(1000); // Detalle de forma de pago
        cus_DetalledeMejoramientodelprocesodeap2_m01kn  : String(1000); // HIDE_Detalle de Mejoramiento del proceso de aprovisionamiento
        cus_Lugardeentregadelosbienesy_m01kn            : String(1000); // HIDE_Lugardeentrega
        cus_Lugardeentregadelosbienesy_o_m01kn          : String(1000); // Lugar de entrega de los bienes y/o prestación de los servicios
        cus_Observacionesadicionales_m01kn              : String(1000); // Observaciones adicionales
        cus_Observacionesalosplazos_m01kn               : String(1000); // Observaciones a los plazos
        cus_Riesgocambiario__m01kn                      : String(1000); // HIDE_Riesgo cambiario
        cus_Riesgocambiariom_m01kn                      : String(1000); // Riesgo cambiario
        cus_Tipodesolicitud_m01kn                       : String(1000); // Tipo de solicitud
        FlexTypeId                                      : String(300); // FlexTypeId
        IsTestForm                                      : Boolean; // Test Form
        LoadCreateTime                                  : DateTime; // Load Create Time
        LoadUpdateTime                                  : DateTime; // Load Update Time
        ParentAgreement                                 : types.projectInfo; // Parent Agreement
        SourceSystem                                    : types.sourceSystem; // Source System
        Title                                           : String(50); // Title
        TimeCreated                                     : DateTime; // Time Created
        TimeUpdated                                     : DateTime; // Time Updated
        cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l_AN
                                                              on cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesCertificadosAplicab_2na5v9 : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesCertificadosAplicab_2na5v9_AN
                                                              on cus_customerResourcesCertificadosAplicab_2na5v9.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesEnfoqueComercialLab_kc0vu  : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesEnfoqueComercialLab_kc0vu_AN
                                                              on cus_customerResourcesEnfoqueComercialLab_kc0vu.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesEstrategiaNegociaci_4d84ab : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesEstrategiaNegociaci_4d84ab_AN
                                                              on cus_customerResourcesEstrategiaNegociaci_4d84ab.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesFocoNegociacionAbas_30acfm : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionAbas_30acfm_AN
                                                              on cus_customerResourcesFocoNegociacionAbas_30acfm.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesFocoNegociacionCons_xc7g7  : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionCons_xc7g7_AN
                                                              on cus_customerResourcesFocoNegociacionCons_xc7g7.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesFocoNegociacionMejo_20d1t2 : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionMejo_20d1t2_AN
                                                              on cus_customerResourcesFocoNegociacionMejo_20d1t2.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesFocoNegociacionRedi_2a9zaw : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionRedi_2a9zaw_AN
                                                              on cus_customerResourcesFocoNegociacionRedi_2a9zaw.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesFocoNegociacionRela_3qb084 : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionRela_3qb084_AN
                                                              on cus_customerResourcesFocoNegociacionRela_3qb084.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesIndiqueCertificados_1ace0k : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesIndiqueCertificados_1ace0k_AN
                                                              on cus_customerResourcesIndiqueCertificados_1ace0k.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesPersonasAInvitarLab_fmu1v  : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesPersonasAInvitarLab_fmu1v_AN
                                                              on cus_customerResourcesPersonasAInvitarLab_fmu1v.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesTipoContratoLabel_nf9yd    : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesTipoContratoLabel_nf9yd_AN
                                                              on cus_customerResourcesTipoContratoLabel_nf9yd.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
        cus_customerResourcesTipoParticipantesLa_407xpy : Composition of many DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesTipoParticipantesLa_407xpy_AN
                                                              on cus_customerResourcesTipoParticipantesLa_407xpy.DformCondicionesparaElaborarlaSolicituddeOferta = $self;
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionAbas_30acfm_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_1string                                     : String(1000); // Modalidad de entrega
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesEstrategiaNegociaci_4d84ab_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_2string                                     : String(1000); // HIDE_Estrategia de Negociacion
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesIndiqueCertificados_1ace0k_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_3string                                     : String(1000); // HIDE_Foco de negociacion - Mejoramiento del proceso de aprovisionamiento
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesCertificadosAplicab_2na5v9_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_4string                                     : String(1000); // Certificados aplicables al producto
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesTipoParticipantesLa_407xpy_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_5string                                     : String(1000); // Tipo de participantes
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionCons_xc7g7_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_6string                                     : String(1000); // Monedas admitidas
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionRedi_2a9zaw_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_7string                                     : String(1000); // HIDE_Foco de negociacion Rediseno del bien o servicio
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_Indiqueeltipodeexperienciaasolicitar_3n7r5l_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_8string                                     : String(1000); // Indique el tipo de experiencia a solicitar
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesEnfoqueComercialLab_kc0vu_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_9string                                     : String(1000); // HIDE_Enfoque comercial
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionRela_3qb084_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_10string                                    : String(1000); // HIDE_Foco de negociacion Relaciones estrategicas con los proveedores
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesTipoContratoLabel_nf9yd_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_11string                                    : String(1000); // Tipo de Contrato
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesFocoNegociacionMejo_20d1t2_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_12string                                    : String(1000); // HIDE_Foco de negociacion Mejor precio
}

entity DformCondicionesparaElaborarlaSolicituddeOferta_cus_customerResourcesPersonasAInvitarLab_fmu1v_AN : cuid {
    key DformCondicionesparaElaborarlaSolicituddeOferta : Association to DformCondicionesparaElaborarlaSolicituddeOferta_AN;
        VUF_Supplier1                                   : types.supplier; // Personas jurídicas / naturales a invitar
}

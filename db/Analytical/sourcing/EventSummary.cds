namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
    Name:                Event Level Summary
    Class Name:          ariba.analytics.fact.EventSummary
    Description:         Event Level Summary
    Database Table Name: FACT_EVENT_SUMMARY
*/

entity EventSummary_AN : managed, types.customFields {
    key Realm                                   : String(50);
    key EventId                                 : String(50);
    key ItemId                                  : String(50);
    key EventVersion                            : Integer;
        LoadCreateTime                          : DateTime;
        LoadUpdateTime                          : DateTime;
        Event                                   : types.event;
        ProjectInfo                             : types.projectInfo;
        SourceSystem                            : types.sourceSystem;
        EventStartDate                          : types.singleDate;
        EventEndDate                            : types.singleDate;
        EstAwardDate                            : types.singleDate;
        ContractEffectiveDate                   : types.singleDate;
        EventCreateDate                         : types.singleDate;
        PreviewBeginDate                        : types.singleDate;
        BiddingStartDate                        : types.singleDate;
        BiddingEndDate                          : types.singleDate;
        Owner                                   : types.owner;
        Origin                                  : Double;
        AclId                                   : Double;
        BaselineSpend                           : Double;
        TargetSavingsPct                        : Double;
        ContractMonths                          : Double;
        BidsSubmitted                           : Double;
        BidsRemoved                             : Double;
        SurrogateBids                           : Double;
        NumQuestions                            : Double;
        InvitedSuppliers                        : Double;
        AcceptedSuppliers                       : Double;
        DeclinedSuppliers                       : Double;
        ParticipSuppliers                       : Double;

        cus_Categoria_4981p9                    : String(255);
        cus_Dependencianegociadora_4981p9       : String(255);
        cus_Empresa_4981p9                      : String(255);
        cus_Justificaciondenopublicacion_4981p9 : String(1000);
        cus_modcontra_4981p9                    : String(255);
        cus_plazodias_28xqnb                    : Int32;
        cus_Procedimiento_4981p9                : String(255);
        cus_Tipodeprocedimiento_4981p9          : String(255);

        BiddedSuppliers                         : Composition of many EventSummary_BiddedSuppliers_AN
                                                      on BiddedSuppliers.EventSummary = $self;
        Commodity                               : Composition of many EventSummary_Commodity_AN
                                                      on Commodity.EventSummary = $self;
        Region                                  : Composition of many EventSummary_Region_AN
                                                      on Region.EventSummary = $self;
        Department                              : Composition of many EventSummary_Department_AN
                                                      on Department.EventSummary = $self;

        cus_tipocontrato_31ofxv                 : Composition of many EventSummary_tipocontrato_AN
                                                      on cus_tipocontrato_31ofxv.EventSummary = $self;
        cus_ProyectoyoProceso_4em7sk            : Composition of many EventSummary_ProyectoyoProceso_AN
                                                      on cus_ProyectoyoProceso_4em7sk.EventSummary = $self;


}

entity EventSummary_BiddedSuppliers_AN : cuid {
    BiddedSuppliers : types.supplier;
    EventSummary    : Association to EventSummary_AN;
}

entity EventSummary_Commodity_AN : cuid {
    Commodity    : types.commodity;
    EventSummary : Association to EventSummary_AN;
}

entity EventSummary_Region_AN : cuid {
    Region       : types.region;
    EventSummary : Association to EventSummary_AN;
}

entity EventSummary_Department_AN : cuid {
    Department   : types.organization;
    EventSummary : Association to EventSummary_AN;
}

entity EventSummary_tipocontrato_AN : cuid {
    VUF_1string  : String(255);
    EventSummary : Association to EventSummary_AN;
}

entity EventSummary_ProyectoyoProceso_AN : cuid {
    VUF_2string  : String(255);
    EventSummary : Association to EventSummary_AN;
}

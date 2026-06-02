namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
    Name:                Event Participation
    Class Name:          ariba.analytics.fact.EventParticipation
    Description:         Event Participation
    Database Table Name: FACT_EVENT_PARTICIPATION
*/
entity EventParticipations_AN : managed, types.customFields {
    key Realm                                   : String(50);
    key EventId                                 : String(50);
    key ItemId                                  : String(50);
    key EventVersion                            : Integer;
    key BidderUserId                            : String(255);
    key SupplierId                              : String(50);

        Event                                   : types.event;
        LoadCreateTime                          : DateTime;
        LoadUpdateTime                          : DateTime;
        Bidder                                  : types.contact;
        SourceSystem                            : types.sourceSystem;
        Supplier                                : types.supplier;
        EventStartDate                          : types.day;
        EventEndDate                            : types.day;
        EstAwardDate                            : types.day;
        ContractEffectiveDate                   : types.day;
        EventCreateDate                         : types.day;
        PreviewBeginDate                        : types.day;
        BiddingStartDate                        : types.day;
        BiddingEndDate                          : types.day;
        Owner                                   : types.contact;
        AcceptedFlag                            : Boolean;
        DeclinedFlag                            : Boolean;
        IntendToRespondFlag                     : Boolean;
        DeclinedToRespondFlag                   : Boolean;
        ParticipatedFlag                        : Boolean;
        AwardedFlag                             : Boolean;
        AclId                                   : Double;
        BaselineSpend                           : Double;
        TargetSavingsPct                        : Double;
        ContractMonths                          : Double;
        NumEventAwarded                         : Integer;
        NumEventAccepted                        : Integer;
        NumEventDeclined                        : Integer;
        NumIntendToRespond                      : Integer;
        NumDeclinedToRespond                    : Integer;
        NumEventBidOn                           : Integer;
        BidsSubmitted                           : Integer;

        cus_Categoria_4981p9                    : String(255);
        cus_Dependencianegociadora_4981p9       : String(255);
        cus_Empresa_4981p9                      : String(255);
        cus_Justificaciondenopublicacion_4981p9 : String(1000);
        cus_modcontra_4981p9                    : String(255);
        cus_plazodias_28xqnb                    : Int32;
        cus_Procedimiento_4981p9                : String(255);
        cus_Tipodeprocedimiento_4981p9          : String(255);

        Commodity                               : Composition of many EventParticipations_Commodity_AN
                                                      on Commodity.EventParticipations = $self;
        Department                              : Composition of many EventParticipations_Department_AN
                                                      on Department.EventParticipations = $self;
        Region                                  : Composition of many EventParticipations_Region_AN
                                                      on Region.EventParticipations = $self;
        cus_tipocontrato_1iwf08                 : Composition of many EventParticipations_tipocontrato_AN
                                                      on cus_tipocontrato_1iwf08.EventParticipations = $self;
        cus_ProyectoyoProceso_2vu6ux            : Composition of many EventParticipations_ProyectoyoProceso_AN
                                                      on cus_ProyectoyoProceso_2vu6ux.EventParticipations = $self;
}

entity EventParticipations_Commodity_AN : cuid {
    Commodity           : types.commodity;
    EventParticipations : Association to EventParticipations_AN;
}

entity EventParticipations_Region_AN : cuid {
    Region              : types.region;
    EventParticipations : Association to EventParticipations_AN;
}

entity EventParticipations_Department_AN : cuid {
    Department          : types.organization;
    EventParticipations : Association to EventParticipations_AN;
}

entity EventParticipations_tipocontrato_AN : cuid {
    VUF_1string         : String(255);
    EventParticipations : Association to EventParticipations_AN;
}

entity EventParticipations_ProyectoyoProceso_AN : cuid {
    VUF_2string         : String(255);
    EventParticipations : Association to EventParticipations_AN;
}

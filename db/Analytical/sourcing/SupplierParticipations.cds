namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
Name:                Supplier Participation
Class Name:          ariba.analytics.fact.SupplierParticipation
Description:         Supplier Participation
Database Table Name: FACT_SUPPLIER_PARTICIPATION
*/
entity SupplierParticipations_AN : managed, types.customFields {

    key EventId                                 : String(50);
    key ItemId                                  : String(50);
    key EventVersion                            : Integer;
    key SupplierId                              : String(50);
    key BidderUserId                            : String(255);

        LoadCreateTime                          : DateTime;
        LoadUpdateTime                          : DateTime;
        Supplier                                : types.supplier;
        SourceSystem                            : types.sourceSystem;
        Bidder                                  : types.user;
        Event                                   : types.event;
        EventInfo                               : types.event;
        EventStartDate                          : types.day;
        EventEndDate                            : types.day;
        EstAwardDate                            : types.day;
        ContractEffectiveDate                   : types.day;
        EventCreateDate                         : types.day;
        PreviewBeginDate                        : types.day;
        BiddingStartDate                        : types.day;
        BiddingEndDate                          : types.day;
        Owner                                   : types.user;
        IncumbentFlag                           : Boolean;
        SurrogateFlag                           : Boolean;
        Surrogate                               : types.surrogate;
        AwardedFlag                             : Boolean;
        InvitedFlag                             : Boolean;
        AcceptedFlag                            : Boolean;
        DeclinedFlag                            : Boolean;
        DeclinedReason                          : String(255);
        DeclinedReasonName                      : String(1000);
        DeclinedComment                         : String(1000);
        ParticipatedFlag                        : Boolean;
        AclId                                   : Double;
        BaselineSpend                           : Double;
        TargetSavingsPct                        : Double;
        ContractMonths                          : Double;
        BidQuantity                             : Double;
        BidTotalCost                            : Double;
        AwardedAmount                           : Double;
        PotentialSavings                        : Double;
        SupplierAwardedHist                     : Double;
        NumItemAwarded                          : Double;
        NumItemAccepted                         : Double;
        NumItemDeclined                         : Double;
        NumItemBidOn                            : Double;
        BidsSubmitted                           : Double;
        DeclineToRespondReason                  : String(1000);

        cus_Categoria_4981p9                    : String(255);
        cus_Dependencianegociadora_4981p9       : String(255);
        cus_Empresa_4981p9                      : String(255);
        cus_Justificaciondenopublicacion_4981p9 : String(1000);
        cus_modcontra_4981p9                    : String(255);
        cus_plazodias_28xqnb                    : Int32;
        cus_Procedimiento_4981p9                : String(255);
        cus_Tipodeprocedimiento_4981p9          : String(255);

        ItemCommodity                           : Composition of many SupplierParticipations_ItemCommodity_AN
                                                      on ItemCommodity.SupplierParticipation = $self;
        Region                                  : Composition of many SupplierParticipations_Region_AN
                                                      on Region.SupplierParticipation = $self;
        Department                              : Composition of many SupplierParticipations_Department_AN
                                                      on Department.SupplierParticipation = $self;
    key Realm                                   : String(50);

        cus_tipocontrato_hhy1c                  : Composition of many SupplierParticipations_tipocontrato_AN
                                                      on cus_tipocontrato_hhy1c.SupplierParticipation = $self;
        cus_ProyectoyoProceso_1ufpw1            : Composition of many SupplierParticipations_ProyectoyoProceso_AN
                                                      on cus_ProyectoyoProceso_1ufpw1.SupplierParticipation = $self;
}

entity SupplierParticipations_ItemCommodity_AN : cuid {
    ItemCommodity         : types.commodity;
    SupplierParticipation : Association to SupplierParticipations_AN;
}

entity SupplierParticipations_Region_AN : cuid {
    Region                : types.region;
    SupplierParticipation : Association to SupplierParticipations_AN;
}

entity SupplierParticipations_Department_AN : cuid {
    Department            : types.organization;
    SupplierParticipation : Association to SupplierParticipations_AN;
}

entity SupplierParticipations_tipocontrato_AN : cuid {
    VUF_1string           : String(255);
    SupplierParticipation : Association to SupplierParticipations_AN;
}

entity SupplierParticipations_ProyectoyoProceso_AN : cuid {
    VUF_2string           : String(255);
    SupplierParticipation : Association to SupplierParticipations_AN;
}

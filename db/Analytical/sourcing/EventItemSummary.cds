namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
    Name:                Event Item Summary
    Class Name:          ariba.analytics.fact.RfxItemSummary
    Description:         Event Item Summary
    Database Table Name: FACT_RFX_ITEM_SUMMARY
*/

entity EventItemSummary_AN : managed, types.customFields {
    key Realm                                   : String(50);
    key EventId                                 : String(50);
    key ItemId                                  : String(50);
    key EventVersion                            : Integer;

        Event                                   : types.event;
        EventInfo                               : types.event;
        SourceSystem                            : types.sourceSystem;
        LoadCreateTime                          : DateTime;
        LoadUpdateTime                          : DateTime;
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
        EventTypeIdentifier                     : Integer;
        BaselineSpend                           : Double;
        ContractMonths                          : Double;
        ItemQuantity                            : Double;
        HistTotalCost                           : Double;
        ResvTotalCost                           : Double;
        IncumbentQuantity                       : Double;
        IncumbentTotalCost                      : Double;
        MktLeadQuantity                         : Double;
        MktLeadTotalCost                        : Double;
        InitialTotalCost                        : Double;
        LeadPreBidTotalCost                     : Double;
        AwardedQuantity                         : Double;
        AwardedTotalCost                        : Double;
        AwardedHistSpend                        : Double;
        PendingHistSpend                        : Double;
        LeadingSavings                          : Double;
        PendingSpend                            : Double;
        PendingSavings                          : Double;
        SubmitBidsForItem                       : Integer;
        SurrogtBidsForItem                      : Integer;
        RemvdBidsForItem                        : Integer;
        NumItemAwarded                          : Integer;
        NumItemPending                          : Integer;
        NumItemClosed                           : Integer;
        TargetSavings                           : Double;

        cus_Categoria_4981p9                    : String(255);
        cus_Dependencianegociadora_4981p9       : String(255);
        cus_Empresa_4981p9                      : String(255);
        cus_Justificaciondenopublicacion_4981p9 : String(1000);
        cus_plazodias_28xqnb                    : String(255);
        cus_Tipodeprocedimiento_4981p9          : String(255);

        Region                                  : Composition of many EventItemSummary_Region_AN
                                                      on Region.EventItemSummary = $self;
        ItemCommodity                           : Composition of many EventItemSummary_ItemCommodity_AN
                                                      on ItemCommodity.EventItemSummary = $self;
        InvitedSuppliers                        : Composition of many EventItemSummary_InvitedSuppliers_AN
                                                      on InvitedSuppliers.EventItemSummary = $self;
        Department                              : Composition of many EventItemSummary_Department_AN
                                                      on Department.EventItemSummary = $self;

        cus_tipocontrato_1p3634                 : Composition of many EventItemSummary_tipocontrato_AN
                                                      on cus_tipocontrato_1p3634.EventItemSummary = $self;
        cus_ProyectoyoProceso_320xxt            : Composition of many EventItemSummary_ProyectoyoProceso_AN
                                                      on cus_ProyectoyoProceso_320xxt.EventItemSummary = $self;

}

entity EventItemSummary_ItemCommodity_AN : cuid {
    ItemCommodity    : types.commodity;
    EventItemSummary : Association to EventItemSummary_AN;
}

entity EventItemSummary_Region_AN : cuid {
    Region           : types.region;
    EventItemSummary : Association to EventItemSummary_AN;
}

entity EventItemSummary_InvitedSuppliers_AN : cuid {
    InvitedSuppliers : types.supplier;
    EventItemSummary : Association to EventItemSummary_AN;
}

entity EventItemSummary_Department_AN : cuid {
    Department       : types.organization;
    EventItemSummary : Association to EventItemSummary_AN;
}

entity EventItemSummary_tipocontrato_AN : cuid {
    VUF_1string      : String(255);
    EventItemSummary : Association to EventItemSummary_AN;
}

entity EventItemSummary_ProyectoyoProceso_AN : cuid {
    VUF_2string      : String(255);
    EventItemSummary : Association to EventItemSummary_AN;
}

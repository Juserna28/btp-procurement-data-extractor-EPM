namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
Name:        Sourcing Requests
Class Name:  ariba.analytics.fact.SourcingRequests
Description: Sourcing Requests
**/

entity SourcingRequests_AN : managed, types.customFields {
    key Realm                                   : String(50);
    key ProjectId                               : String(50);

        LoadCreateTime                          : DateTime;
        LoadUpdateTime                          : DateTime;
        Description                             : String(1000);
        AclId                                   : Double;
        Duration                                : Double;
        BeginDate                               : types.day;
        DueDate                                 : types.day;
        EndDate                                 : types.day;
        Status                                  : String(30);
        State                                   : String(20);
        OnTimeOrLate                            : String(10);
        Owner                                   : types.user;
        ProjectInfo                             : types.projectInfo;
        DependsOnProject                        : types.projectInfo;
        ContainerProject                        : types.projectInfo;
        Process                                 : types.process;
        IsTestProject                           : Boolean;
        SourceSystem                            : types.sourceSystem;
        ProcessStatus                           : String(50);
        BaselineSpend                           : Double;
        ActualSaving                            : Double;
        TargetSavingsPct                        : Double;
        ContractMonths                          : Double;
        Currency                                : String(1000);
        EventType                               : types.eventType;
        ContractEffectiveDate                   : types.day;
        ResultsDescription                      : String(1000);
        AwardJustification                      : String(1000);
        PlannedStartDate                        : types.day;
        PlannedEndDate                          : types.day;
        SourcingMechanism                       : String(50);
        ExecutionStrategy                       : String(50);
        ProjectReason                           : String(50);
        PlannedEventType                        : types.eventType;
        Origin                                  : Integer;

        cus_Categoria_4981p9                    : String(255);
        cus_Contratooriginal_45u0dv             : String(255);
        cus_Dependencianegociadora_4981p9       : String(255);
        cus_Empresa_4981p9                      : String(255);
        cus_Fechadeinicio_27ffj6_Day            : DateTime;
        cus_IDRFQ_45u0dv                        : String(255);
        cus_Justificaciondenopublicacion_4981p9 : String(1000);
        cus_modcontra_4981p9                    : String(255);
        cus_plazodias_28xqnb                    : Int32;
        cus_Procedimiento_4981p9                : String(255);
        cus_Tipodeprocedimiento_4981p9          : String(255);
        cus_Tipodesolicitud_45u0dv              : String(255);

        Organization                            : Composition of many SourcingRequests_Organization_AN
                                                      on Organization.SourcingRequests = $self;
        Suppliers                               : Composition of many SourcingRequests_Suppliers_AN
                                                      on Suppliers.SourcingRequests = $self;
        AllOwners                               : Composition of many SourcingRequests_AllOwners_AN
                                                      on AllOwners.SourcingRequests = $self;
        Commodity                               : Composition of many SourcingRequests_Commodity_AN
                                                      on Commodity.SourcingRequests = $self;
        Region                                  : Composition of many SourcingRequests_Region_AN
                                                      on Region.SourcingRequests = $self;

        cus_tipocontrato_kaon8                  : Composition of many SourcingRequests_tipocontrato_AN
                                                      on cus_tipocontrato_kaon8.SourcingRequests = $self;
        cus_ProyectoyoProceso_1x8ghx            : Composition of many SourcingRequests_ProyectoyoProceso_AN
                                                      on cus_ProyectoyoProceso_1x8ghx.SourcingRequests = $self;
}

entity SourcingRequests_Organization_AN : cuid {
    Organization     : types.organization;
    SourcingRequests : Association to SourcingRequests_AN;
}

entity SourcingRequests_Commodity_AN : cuid {
    Commodity        : types.commodity;
    SourcingRequests : Association to SourcingRequests_AN;
}

entity SourcingRequests_Region_AN : cuid {
    Region           : types.region;
    SourcingRequests : Association to SourcingRequests_AN;
}

entity SourcingRequests_Suppliers_AN : cuid {
    Suppliers        : types.supplier;
    SourcingRequests : Association to SourcingRequests_AN;
}

entity SourcingRequests_AllOwners_AN : cuid {
    AllOwners        : types.owner;
    SourcingRequests : Association to SourcingRequests_AN;
}

entity SourcingRequests_tipocontrato_AN : cuid {
    VUF_1string      : String(255);
    SourcingRequests : Association to SourcingRequests_AN;
}

entity SourcingRequests_ProyectoyoProceso_AN : cuid {
    VUF_2string      : String(255);
    SourcingRequests : Association to SourcingRequests_AN;
}

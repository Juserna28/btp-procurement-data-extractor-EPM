namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
    Name:                ContractRequests
    Class Name:          ariba.analytics.fact.ContractRequestFact
    Description:         ContractRequest
    Database Table Name: FACT_CONTRACTREQUEST_FACT
*/
entity ContractRequests_AN : managed, types.customFields {
    key Realm                                       : String(50);
    key ProjectId                                   : String(50);
        ContractId                                  : String(50);
        LoadCreateTime                              : DateTime;
        LoadUpdateTime                              : DateTime;
        Description                                 : String(1000);
        AclId                                       : Double;
        Duration                                    : Double;
        BeginDate                                   : types.singleDate;
        DueDate                                     : types.singleDate;
        EndDate                                     : types.singleDate;
        Status                                      : String(30);
        State                                       : String(20);
        OnTimeOrLate                                : String(10);
        Owner                                       : types.owner;
        ProjectInfo                                 : types.projectInfo;
        DependsOnProject                            : types.projectInfo;
        ContainerProject                            : types.projectInfo;
        Process                                     : types.process;
        IsTestProject                               : Boolean;
        SourceSystem                                : types.sourceSystem;
        ProcessStatus                               : String(50);
        Contract                                    : types.contract;
        HierarchyType                               : String(25);
        Supplier                                    : types.supplier;
        DocumentVersion                             : String(10);
        ParentAgreement                             : types.projectInfo;
        ContractStatus                              : String(25);
        AmendmentReason                             : String(25);
        AmendmentVersion                            : String(5);
        Amount                                      : Double;
        ContractCurrency                            : String(30);
        ProposedAmount                              : Double;
        OrigProposedAmount                          : Double;
        OrigAmount                                  : Double;
        EffectiveDate                               : types.singleDate;
        ExpirationDate                              : types.singleDate;
        AgreementDate                               : types.singleDate;
        IsEvergreen                                 : Boolean;
        RelatedId                                   : String(30);
        AutoRenewalInterval                         : Double;
        MaxAutoRenewalsAllowed                      : Double;
        AutoRenewalCount                            : Double;
        ExpirationTermType                          : String(50);
        NoticePeriod                                : Double;
        IsCombinedSpend                             : Boolean;
        AllowAdhocSpend                             : Boolean;
        LastPublishedDate                           : types.singleDate;
        cus_Categoria_2wtne0                        : String(255);
        cus_clasifinterna_2wtne0                    : String(255);
        cus_Contratooriginal_2wtne0                 : String(255);
        cus_customerResourcesvalormodifLabel_11b894 : String(255);
        cus_customerResourcesvalormodifLabel_43c8g2 : String(255);
        cus_Dependenciaadministradora_2wtne0        : String(255);
        cus_Dependencianegociadora_2wtne0           : String(255);
        cus_dfIdsoldecoti_43c8g2                    : String(255);
        cus_Empresa_2wtne0                          : String(255);
        cus_fechaliq_yf2jb_Day                      : DateTime;
        cus_indcuantia_2wtne0                       : String(255);
        cus_modcontra_2wtne0                        : String(255);
        cus_origenbien_2wtne0                       : String(255);
        cus_plazodias_wjcc2                         : Int32;
        cus_Procedimiento_2wtne0                    : String(255);
        cus_Tipodeprocedimiento_2wtne0              : String(255);
        cus_Tipodesolicitud_43c8g2                  : String(255);
        cus_Tipodetramite_43c8g2                    : String(255);
        cus_Tipomodificacion_43c8g2                 : String(255);
        cus_valoriva_2wtne0                         : String(3);
        cus_valoriva_4am5bi                         : Double;
        cus_valoriva_S1_4am5bi                      : Double;
        cus_valoriva_S2_4am5bi                      : Double;
        cus_valoriva_S3_4am5bi                      : Double;
        cus_valoriva_S4_4am5bi                      : Double;
        cus_valoriva_S6_4am5bi                      : Double;

        Commodity                                   : Composition of many ContractRequests_Commodity_AN
                                                          on Commodity.ContractRequests = $self;
        Organization                                : Composition of many ContractRequests_Organization_AN
                                                          on Organization.ContractRequests = $self;
        Region                                      : Composition of many ContractRequests_Region_AN
                                                          on Region.ContractRequests = $self;
        AffectedParties                             : Composition of many ContractRequests_AffectedParties_AN
                                                          on AffectedParties.ContractRequests = $self;
        AllOwners                                   : Composition of many ContractRequests_AllOwners_AN
                                                          on AllOwners.ContractRequests = $self;
        cus_tipocontrato_2zjsst                     : Composition of many ContractRequests_tipocontrato_AN
                                                          on cus_tipocontrato_2zjsst.ContractRequests = $self;
        cus_ProyectoyoProceso_4chkni                : Composition of many ContractRequests_ProyectoyoProceso_AN
                                                          on cus_ProyectoyoProceso_4chkni.ContractRequests = $self;

}

entity ContractRequests_Commodity_AN : cuid {
    Commodity        : types.commodity;
    ContractRequests : Association to ContractRequests_AN;
}

entity ContractRequests_Organization_AN : cuid {
    Organization     : types.organization;
    ContractRequests : Association to ContractRequests_AN;
}

entity ContractRequests_Region_AN : cuid {
    Region           : types.region;
    ContractRequests : Association to ContractRequests_AN;
}

entity ContractRequests_AffectedParties_AN : cuid {
    AffectedParties  : types.supplier;
    ContractRequests : Association to ContractRequests_AN;
}

entity ContractRequests_AllOwners_AN : cuid {
    AllOwners        : types.contact;
    ContractRequests : Association to ContractRequests_AN;
}

entity ContractRequests_tipocontrato_AN : cuid {
    VUF_1string      : String(255);
    ContractRequests : Association to ContractRequests_AN;
}

entity ContractRequests_ProyectoyoProceso_AN : cuid {
    VUF_2string      : String(255);
    ContractRequests : Association to ContractRequests_AN;
}

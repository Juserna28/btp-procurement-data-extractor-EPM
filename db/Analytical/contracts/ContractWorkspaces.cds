namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
    Name:                Contract Workspace (Procurement)
    Class Name:          ariba.analytics.fact.ContractWorkspace
    Description:         Contract Workspace (Procurement)
    Database Table Name: FACT_CONTRACT_WORKSPACE
*/
entity ContractWorkspaces_AN : managed, types.customFields {
    key ProjectId                            : String(50);
    key Realm                                : String(50);
        LoadCreateTime                       : DateTime;
        LoadUpdateTime                       : DateTime;
        Description                          : String(1000);
        AclId                                : Double;
        Duration                             : Double;
        BeginDate                            : types.day;
        DueDate                              : types.day;
        EndDate                              : types.day;
        Status                               : String(30);
        State                                : String(20);
        OnTimeOrLate                         : String(10);
        Owner                                : types.contact;
        ProjectInfo                          : types.projectInfo;
        DependsOnProject                     : types.projectInfo;
        ContainerProject                     : types.projectInfo;
        Process                              : types.process;
        IsTestProject                        : Boolean;
        SourceSystem                         : types.sourceSystem;
        ProcessStatus                        : String(50);
        Contract                             : types.contract;
        HierarchyType                        : String(25);
        Supplier                             : types.supplier;
        ContractId                           : String(50);
        DocumentVersion                      : String(10);
        ParentAgreement                      : types.projectInfo;
        ContractStatus                       : String(25);
        AmendmentReason                      : String(25);
        AmendmentVersion                     : String(5);
        Amount                               : Double;
        ContractCurrency                     : String(30);
        ProposedAmount                       : Double;
        OrigProposedAmount                   : Double;
        OrigAmount                           : Double;
        EffectiveDate                        : types.day;
        ExpirationDate                       : types.day;
        AgreementDate                        : types.day;
        IsEvergreen                          : Boolean;
        RelatedId                            : String(30);
        AutoRenewalInterval                  : Double;
        MaxAutoRenewalsAllowed               : Double;
        AutoRenewalCount                     : Double;
        ExpirationTermType                   : String(50);
        NoticePeriod                         : Double;
        IsCombinedSpend                      : Boolean;
        AllowAdhocSpend                      : Boolean;
        LastPublishedDate                    : types.day;
        ComplexSpendAvailableAmount          : Double;
        ProposedIncrementalAmount            : Double;
        ApprovedAmount                       : Double;

        cus_Categoria_2wtne0                 : String(255);
        cus_clasifinterna_2wtne0             : String(255);
        cus_Contratooriginal_2wtne0          : String(255);
        cus_Dependenciaadministradora_2wtne0 : String(255);
        cus_Dependencianegociadora_2wtne0    : String(255);
        cus_Empresa_2wtne0                   : String(255);
        cus_fechaliq_yf2jb_Day               : DateTime;
        cus_indcuantia_2wtne0                : String(255);
        cus_modcontra_2wtne0                 : String(255);
        cus_origenbien_2wtne0                : String(255);
        cus_plazodias_wjcc2                  : Int32;
        cus_Procedimiento_2wtne0             : String(255);
        cus_Tipodeprocedimiento_2wtne0       : String(255);
        cus_valoriva_2wtne0                  : String(3);
        cus_valoriva_4am5bi                  : Double;
        cus_valoriva_S1_4am5bi               : Double;
        cus_valoriva_S2_4am5bi               : Double;
        cus_valoriva_S3_4am5bi               : Double;
        cus_valoriva_S4_4am5bi               : Double;
        cus_valoriva_S6_4am5bi               : Double;

        Commodity                            : Composition of many ContractWorkspaces_Commodity_AN
                                                   on Commodity.ContractWorkspace = $self;
        Organization                         : Composition of many ContractWorkspaces_Organization_AN
                                                   on Organization.ContractWorkspace = $self;
        Region                               : Composition of many ContractWorkspaces_Region_AN
                                                   on Region.ContractWorkspace = $self;
        AffectedParties                      : Composition of many ContractWorkspaces_AffectedParties_AN
                                                   on AffectedParties.ContractWorkspace = $self;
        AllOwners                            : Composition of many ContractWorkspaces_AllOwners_AN
                                                   on AllOwners.ContractWorkspace = $self;

        cus_tipocontrato_2zjsst              : Composition of many ContractWorkspaces_tipocontrato_AN
                                                   on cus_tipocontrato_2zjsst.ContractWorkspace = $self;
        cus_ProyectoyoProceso_4chkni         : Composition of many ContractWorkspaces_ProyectoyoProceso_AN
                                                   on cus_ProyectoyoProceso_4chkni.ContractWorkspace = $self;

}

entity ContractWorkspaces_Commodity_AN : cuid {
    Commodity         : types.commodity;
    ContractWorkspace : Association to ContractWorkspaces_AN;
}

entity ContractWorkspaces_Organization_AN : cuid {
    Organization      : types.organization;
    ContractWorkspace : Association to ContractWorkspaces_AN;
}

entity ContractWorkspaces_Region_AN : cuid {
    Region            : types.region;
    ContractWorkspace : Association to ContractWorkspaces_AN;
}

entity ContractWorkspaces_AffectedParties_AN : cuid {
    AffectedParties   : types.supplier;
    ContractWorkspace : Association to ContractWorkspaces_AN;
}

entity ContractWorkspaces_AllOwners_AN : cuid {
    AllOwners         : types.contact;
    ContractWorkspace : Association to ContractWorkspaces_AN;
}

entity ContractWorkspaces_tipocontrato_AN : cuid {
    VUF_1string       : String(255);
    ContractWorkspace : Association to ContractWorkspaces_AN;
}

entity ContractWorkspaces_ProyectoyoProceso_AN : cuid {
    VUF_2string       : String(255);
    ContractWorkspace : Association to ContractWorkspaces_AN;
}

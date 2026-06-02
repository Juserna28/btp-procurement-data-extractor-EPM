namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
        Name:                Scorecard
        Class Name:          ariba.analytics.fact.Scorecard
        Description:         Scorecard
        Database Table Name: FACT_SCORECARD
*/
entity Scorecard_AN : managed {
    key Realm                                : String(50);
    key ScorecardId                          : String(255);
    key ScorecardSourceSystem                : String(100);
    key ScorecardVersionNumber               : Double;
    key SourceSystemId                       : String(100);
    key KPIId                                : String(255);
    key KPISourceSystem                      : String(100);
    key RespondentUserSourceSystem           : String(100);
    key RespondentUserId                     : String(50);
    key RespondentUserPasswordAdapter        : String(50);

        LoadCreateTime                       : DateTime;
        LoadUpdateTime                       : DateTime;
        Scorecard                            : types.scorecard;
        SourceSystem                         : types.sourceSystem;
        Status                               : String(30);
        PeriodFrom                           : types.day;
        PeriodTo                             : types.day;
        Project                              : types.projectInfo;
        Supplier                             : types.supplier;
        owner                                : types.userdata;
        KPI                                  : types.scorecardKPI;
        KPIOrderNumber                       : Double;
        AclId                                : Double;
        GradeCount                           : Double;
        Value                                : Double;
        Weight                               : Double;
        Target                               : Double;
        Grade                                : Double;
        SystemGrade                          : Double;
        RespondentUser                       : types.userdata;
        IsInternalRespondent                 : Boolean;
        RespondentDepartment                 : types.organization;
        RespGradeCount                       : Double;
        RespondentValue                      : Double;
        RespondentGrade                      : Double;
        cus_categoria_2rxvjm                 : String(255);
        cus_Categoria_2rxvjm_2               : String(255);
        cus_Dependenciaadministradora_2rxvjm : String(255);
        cus_Empresa_2rxvjm                   : String(255);
        cus_Fechadeconfimacion_tjaox_Day     : DateTime;
        cus_IDdeContrato_2rxvjm              : String(255);
        cus_tipoproceso_2rxvjm               : String(255);
        cus_ValordelContrato_2rxvjm          : String(3);
        cus_ValordelContrato_45qdh4          : Double;

        Commodity                            : Composition of many Scorecard_Commodity_AN
                                                   on Commodity.Scorecard = $self;
        Region                               : Composition of many Scorecard_Region_AN
                                                   on Region.Scorecard = $self;
        Department                           : Composition of many Scorecard_Department_AN
                                                   on Department.Scorecard = $self;
        cus_tipocontrato_44q7p4              : Composition of many Scorecard_tipocontrato_AN
                                                   on cus_tipocontrato_44q7p4.Scorecard = $self;


}

entity Scorecard_Commodity_AN : cuid {
    Commodity : types.commodity;
    Scorecard : Association to Scorecard_AN;
}

entity Scorecard_Region_AN : cuid {
    Region    : types.region;
    Scorecard : Association to Scorecard_AN;
}

entity Scorecard_Department_AN : cuid {
    Department : types.organization;
    Scorecard  : Association to Scorecard_AN;
}

entity Scorecard_tipocontrato_AN : cuid {
    VUF_1string : String(255);
    Scorecard   : Association to Scorecard_AN;
}

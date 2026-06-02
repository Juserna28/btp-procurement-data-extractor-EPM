namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
    Name:                Savings Allocation Details
    Class Name:          ariba.analytics.fact.SavingsAllocationDetails
    Description:         Savings Allocation Details
    Database Table Name: FACT_SAVINGS_ALLOCATION_D
*/
entity SavingsAllocationDetails_AN : managed {
    key Realm                                   : String(50);
    key SavingsAllocationId                     : String(50);

        LoadCreateTime                          : DateTime;
        LoadUpdateTime                          : DateTime;
        SourceSystem                            : types.sourceSystem;
        SavingsFormInfo                         : types.savingsFormInfo;
        Description                             : String(1000);
        ProjectDescription                      : String(1000);
        ProjectInfo                             : types.projectInfo;
        Owner                                   : types.user;
        SavingsStartDate                        : types.day;
        SavingsEndDate                          : types.day;
        Organization                            : types.organization;
        Commodity                               : types.commodity;
        Region                                  : types.region;
        Supplier                                : types.supplier;
        SpendType                               : String(255);
        AclId                                   : Integer;
        ProjectBaselineSpend                    : Double;
        BaselineSpend                           : Double;
        EstimatedSpend                          : Double;
        EstimatedSavings                        : Double;
        EstimatedSavingsPct                     : Double;
        NegotiatedSpend                         : Double;
        NegotiatedSavings                       : Double;
        NegotiatedSavingsPct                    : Double;
        ImplementedSpend                        : Double;
        ImplementedSavings                      : Double;
        ImplementedSavingsPct                   : Double;
        ActualSpend                             : Double;
        ActualSavings                           : Double;
        ActualSavingsPct                        : Double;
        State                                   : String(100);
        Status                                  : String(100);
        BeginDate                               : types.day;
        DueDate                                 : types.day;
        EndDate                                 : types.day;
        SavingsType                             : String(100);
        IsTestProject                           : Boolean;
        ProjectBaselineSpendB                   : Double;
        ProjectBaselineSpendC                   : Double;
        BaselineSpendB                          : Double;
        BaselineSpendC                          : Double;
        EstimatedSpendB                         : Double;
        EstimatedSpendC                         : Double;
        EstimatedSavingsB                       : Double;
        EstimatedSavingsC                       : Double;
        NegotiatedSpendB                        : Double;
        NegotiatedSpendC                        : Double;
        NegotiatedSavingsB                      : Double;
        NegotiatedSavingsC                      : Double;
        ImplementedSpendB                       : Double;
        ImplementedSpendC                       : Double;
        ImplementedSavingsB                     : Double;
        ImplementedSavingsC                     : Double;
        ActualSpendB                            : Double;
        ActualSpendC                            : Double;
        ActualSavingsB                          : Double;
        ActualSavingsC                          : Double;

        cus_Anio_1z68ev                         : String(255);
        cus_Categoria_4981p9                    : String(255);
        cus_Dependencianegociadora_4981p9       : String(255);
        cus_Empresa_4981p9                      : String(255);
        cus_Justificaciondenopublicacion_4981p9 : String(1000);
        cus_modcontra_4981p9                    : String(255);
        cus_plazodias_28xqnb                    : Int32;
        cus_Procedimiento_4981p9                : String(255);
        cus_Tipodeprocedimiento_4981p9          : String(255);

        cus_tipocontrato_3dcan0                 : Composition of many SavingsAllocationDetails_tipocontrato_AN
                                                      on cus_tipocontrato_3dcan0.SavingsAllocation = $self;
        cus_ProyectoyoProceso_agkd9             : Composition of many SavingsAllocationDetails_ProyectoyoProceso_AN
                                                      on cus_ProyectoyoProceso_agkd9.SavingsAllocation = $self;

}

entity SavingsAllocationDetails_tipocontrato_AN : cuid {
    VUF_1string       : String(255);
    SavingsAllocation : Association to SavingsAllocationDetails_AN;
}

entity SavingsAllocationDetails_ProyectoyoProceso_AN : cuid {
    VUF_2string       : String(255);
    SavingsAllocation : Association to SavingsAllocationDetails_AN;
}

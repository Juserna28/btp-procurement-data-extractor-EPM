namespace sap.ariba;

using {
    managed,
    cuid
} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';


/**
    Name:            DformVALIDACINMERCADODEPROVEEDORES
    Description:     DformVALIDACINMERCADODEPROVEEDORES
    Database Source: Analytical Reporting API
    Document Type:   ContractsDForm_vrealm_50251_VALIDACINMERCADODEPROVEEDORESFact
*/
entity DformVALIDACINMERCADODEPROVEEDORES_AN : managed {
    key Realm                             : String(50); // Realm
    key InternalId                        : String(30); // Document Id
        AclId                             : Double; // AclId
        cus_DFvmpBoolean0001_43zzy2       : Boolean; // ¿Aplica experiencia?
        cus_DFvmpBoolean0002_43zzy2       : Boolean; // ¿Aplican requisitos financieros?
        cus_DFvmpBoolean0003_43zzy2       : Boolean; // ¿Aplican certificaciones y / o permisos?
        cus_DFvmpDecimalNumber0001_1zsji5 : Double; // Liquidez
        cus_DFvmpDecimalNumber0002_1zsji5 : Double; // Cobertura de intereses (CI)
        cus_DFvmpDecimalNumber0003_1zsji5 : Double; // Múltiplo de deuda neta (MON)
        cus_DFvmpInteger0001_31j8n5       : Double; // Plazo en días
        cus_DFvmpInteger0002_31j8n5       : Double; // Rango de tiempo (Años)
        cus_DFvmpInteger0003_31j8n5       : Double; // N° de contratos
        cus_DFvmpInteger0004_31j8n5       : Double; // Cantidad
        cus_DFvmpLongRichText0001_m01kn   : String(1000); // Detalle experiencia a solicitar
        cus_DFvmpLongRichText0002_m01kn   : String(1000); // Alcance ISO - 9001
        cus_DFvmpLongRichText0003_m01kn   : String(1000); // Alcance ISO - 14001
        cus_DFvmpLongRichText0004_m01kn   : String(1000); // Alcance ISO - 28000
        cus_DFvmpLongRichText0005_m01kn   : String(1000); // Alcance ISO - 31000
        cus_DFvmpLongRichText0006_m01kn   : String(1000); // Alcance ISO - 45001
        cus_DFvmpLongRichText0007_m01kn   : String(1000); // Alcance RETIE
        cus_DFvmpLongRichText0008_m01kn   : String(1000); // Alcance RETILAB
        cus_DFvmpLongRichText0009_m01kn   : String(1000); // Alcance Otro Certificado / Permiso
        cus_DFvmpLongRichText0010_m01kn   : String(1000); // OTRO(s) REQUISITO (s)
        cus_DFvmpLongRichText0011_m01kn   : String(1000); // ANÁLISIS Y RECOMENDACIONES
        cus_DFvmpLongText0001_m01kn       : String(1000); // PARÁMETROS - REQUISITOS Y CONDICIONES A VALIDAR
        cus_DFvmpLongText0002_m01kn       : String(1000); // EXPERIENCIA REQUERIDA
        cus_DFvmpLongText0003_m01kn       : String(1000); // REQUISITOS FINANCIEROS REQUERIDOS
        cus_DFvmpLongText0004_m01kn       : String(1000); // CERTIFICACIONES Y / O PERMISOS REQUERIDOS
        cus_DFvmpMoney0001_1zsji5         : Double; // Valor (sin IVA) Amount (COP)
        cus_DFvmpMoney0001_m01kn          : String(10); // Valor (sin IVA) Currency Code
        cus_DFvmpMoney0001_S1_1zsji5      : Double; // Valor (sin IVA) Amount (CLP)
        cus_DFvmpMoney0001_S2_1zsji5      : Double; // Valor (sin IVA) Amount (USD)
        cus_DFvmpMoney0001_S3_1zsji5      : Double; // Valor (sin IVA) Amount (EUR)
        cus_DFvmpMoney0001_S4_1zsji5      : Double; // Valor (sin IVA) Amount (GTQ)
        cus_DFvmpMoney0001_S6_1zsji5      : Double; // Valor (sin IVA) Amount (MXN)
        cus_DFvmpMoney0002_1zsji5         : Double; // Monto total Amount (COP)
        cus_DFvmpMoney0002_m01kn          : String(10); // Monto total Currency Code
        cus_DFvmpMoney0002_S1_1zsji5      : Double; // Monto total Amount (CLP)
        cus_DFvmpMoney0002_S2_1zsji5      : Double; // Monto total Amount (USD)
        cus_DFvmpMoney0002_S3_1zsji5      : Double; // Monto total Amount (EUR)
        cus_DFvmpMoney0002_S4_1zsji5      : Double; // Monto total Amount (GTQ)
        cus_DFvmpMoney0002_S6_1zsji5      : Double; // Monto total Amount (MXN)
        cus_DFvmpMoney0003_1zsji5         : Double; // Capital de trabajo Amount (COP)
        cus_DFvmpMoney0003_m01kn          : String(10); // Capital de trabajo Currency Code
        cus_DFvmpMoney0003_S1_1zsji5      : Double; // Capital de trabajo Amount (CLP)
        cus_DFvmpMoney0003_S2_1zsji5      : Double; // Capital de trabajo Amount (USD)
        cus_DFvmpMoney0003_S3_1zsji5      : Double; // Capital de trabajo Amount (EUR)
        cus_DFvmpMoney0003_S4_1zsji5      : Double; // Capital de trabajo Amount (GTQ)
        cus_DFvmpMoney0003_S6_1zsji5      : Double; // Capital de trabajo Amount (MXN)
        cus_DFvmpMoney0004_1zsji5         : Double; // Patrimonio neto Amount (COP)
        cus_DFvmpMoney0004_m01kn          : String(10); // Patrimonio neto Currency Code
        cus_DFvmpMoney0004_S1_1zsji5      : Double; // Patrimonio neto Amount (CLP)
        cus_DFvmpMoney0004_S2_1zsji5      : Double; // Patrimonio neto Amount (USD)
        cus_DFvmpMoney0004_S3_1zsji5      : Double; // Patrimonio neto Amount (EUR)
        cus_DFvmpMoney0004_S4_1zsji5      : Double; // Patrimonio neto Amount (GTQ)
        cus_DFvmpMoney0004_S6_1zsji5      : Double; // Patrimonio neto Amount (MXN)
        cus_DFvmpPercentage0001_1zsji5    : Double; // Endeudamiento
        cus_DFvmpPercentage0002_1zsji5    : Double; // Rentabilidad del patrimonio (ROE)
        cus_DFvmpPercentage0003_1zsji5    : Double; // Rentabilidad del activo (ROA)
        cus_DFvmpText0001_m01kn           : String(1000); // Empresa
        cus_DFvmpText0002_m01kn           : String(1000); // Nombre
        cus_DFvmpText0003_m01kn           : String(1000); // Categoría
        cus_DFvmpText0004_m01kn           : String(1000); // Anexo técnico y/o Especificaciones técnicas
        cus_DFvmpText0005_m01kn           : String(1000); // Unidad de medida
        cus_DFvmpURLLink0001_m01kn        : String(1000); // ID
        DocumentVersion                   : String(30); // Document Version
        FlexTypeId                        : String(300); // FlexTypeId
        IsTestForm                        : Boolean; // Test Form
        LoadCreateTime                    : DateTime; // Load Create Time
        LoadUpdateTime                    : DateTime; // Load Update Time
        ParentAgreement                   : types.projectInfo; // Parent Agreement
        SourceSystem                      : types.sourceSystem; // Source System
        Title                             : String(50); // Title
        TimeCreated                       : DateTime; // Time Created
        TimeUpdated                       : DateTime; // Time Updated
        cus_DFvmpTextMSelect0001_30acfm   : Composition of many DformVALIDACINMERCADODEPROVEEDORES_cus_DFvmpTextMSelect0001_30acfm_AN
                                                on cus_DFvmpTextMSelect0001_30acfm.DformVALIDACINMERCADODEPROVEEDORES = $self;
}

entity DformVALIDACINMERCADODEPROVEEDORES_cus_DFvmpTextMSelect0001_30acfm_AN : cuid {
    key DformVALIDACINMERCADODEPROVEEDORES : Association to DformVALIDACINMERCADODEPROVEEDORES_AN;
        VUF_1string                        : String(1000); // Seleccione de la lista la (s) opción(s) aplicable (s) al proceso
}

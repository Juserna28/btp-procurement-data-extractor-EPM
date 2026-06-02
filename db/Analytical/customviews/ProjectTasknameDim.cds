namespace sap.ariba;

using {managed} from '@sap/cds/common';

using sap.ariba.type as types from '../../types';

/**
    Name:                Project Task Name Dimension
    Description:         Project Task Name Dimension
    Database Table Name: ProjectTaskNameDim_AN
*/
entity ProjectTaskNameDim_AN : managed, types.customFields {
    key Realm            : String(50);
    key TaskId           : String(50);
    key SourceSystem     : String(100);
        TaskName         : String(255);
        AclId            : Double;
        TemplateTaskName : String(255);
        ProcessId        : String(50);
        TimeCreated      : DateTime;
        TimeUpdated      : DateTime;
}

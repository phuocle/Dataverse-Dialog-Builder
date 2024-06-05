namespace DataverseDialogBuilder.CustomAction
{
    internal class Output
    {
        public bool ok { get; set; } = false;
        public string message { get; set; } = string.Empty;
    }

    internal class NameValue
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    internal class Input_GetObjectTypeCode
    {
        public string entity_logical_name { get; set; }
    }

    internal class Input_GetViewId
    {
        public string entity_logical_name { get; set; }
        public string view_name { get; set; }
    }

    internal class Input_GetViewName
    {
        public string entity_logical_name { get; set; }
        public string view_id { get; set; }
    }

    internal class Input_GetLocalOptionSet
    {
        public string entity_logical_name { get; set; }
    }

    internal class Input_GetCharts
    {
        public string entity_logical_name { get; set; }
    }

    internal class Input_UpsertDialog
    {
        public string logical_name { get; set; }
        public string description { get; set; }
        public string full_description { get; set; }
        public string version { get; set; }
        public string from_xml { get; set; }
    }

    internal class Input_GetLocalTwoOptionSet
    {
        public string entity_logical_name { get; set; }
    }

    internal class Input_GetGlobalOptionSetValue
    {
        public string option_set_name { get; set; }
    }

    internal class Input_GetLocalOptionSetValue
    {
        public string entity_logical_name { get; set; }
        public string option_set_name { get; set; }
    }

    internal class Input_GetLocalTwoOptionSetValue
    {
        public string entity_logical_name { get; set; }
        public string option_set_name { get; set; }
    }

    internal class Input_GetVisualizationId
    {
        public string entity_logical_name { get; set; }
        public string visualization_name { get; set; }
    }
    internal class Input_IsGlobalOptionSet
    {
        public string option_set_name { get; set; }
    }

    internal class Input_ParseLocalOptionSet
    {
        public string option_set_name { get; set; }
    }

    internal class Input_GetForm
    {
        public string formid { get; set; }
    }
}

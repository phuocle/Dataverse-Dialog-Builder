using DataverseDialogBuilder.Shared;
using DataverseDialogBuilder.Shared.Entities;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataverseDialogBuilder.CustomAction
{
    internal class Action
    {
        internal static string GetObjectTypeCode(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetObjectTypeCode>(json);
            var request = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.Entity,
                LogicalName = input.entity_logical_name?.ToLower()
            };
            var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
            var output = new
            {
                ok = true,
                message = string.Empty,
                object_type_code = response.EntityMetadata.ObjectTypeCode ?? 0
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetViewId(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetViewId>(json);
            var request = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.Entity,
                LogicalName = input.entity_logical_name?.ToLower()
            };
            var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
            var query = new QueryExpression("savedquery");
            query.ColumnSet.AddColumn("savedqueryid");
            query.Criteria.AddCondition("returnedtypecode", ConditionOperator.Equal, response.EntityMetadata.ObjectTypeCode);
            query.Criteria.AddCondition("name", ConditionOperator.Equal, input.view_name);
            var rows = serviceAdmin.RetrieveMultiple(query);
            var view_id = rows.Entities.Count > 0 ? "{" + rows.Entities[0].Id.ToString().ToUpper() + "}" : "{" + Guid.Empty.ToString().ToUpper() + "}";
            var output = new
            {
                ok = true,
                message = string.Empty,
                view_id
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetViewName(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetViewName>(json);
            string view_name = null;
            if (input.view_id.Length != 0)
            {
                var request = new RetrieveEntityRequest
                {
                    EntityFilters = EntityFilters.Entity,
                    LogicalName = input.entity_logical_name?.ToLower()
                };
                var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
                var query = new QueryExpression("savedquery");
                query.ColumnSet.AddColumn("savedqueryid");
                query.ColumnSet.AddColumn("name");
                query.Criteria.AddCondition("returnedtypecode", ConditionOperator.Equal, response.EntityMetadata.ObjectTypeCode);
                query.Criteria.AddCondition("savedqueryid", ConditionOperator.Equal, Guid.Parse(input.view_id));
                var rows = serviceAdmin.RetrieveMultiple(query);
                view_name = rows.Entities.Count > 0 ? rows.Entities[0].GetAttributeValue<string>("name") : null;
            }
            var output = new
            {
                ok = true,
                message = string.Empty,
                view_name
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetGlobalOptionSet(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var request = new RetrieveAllOptionSetsRequest();
            var response = (RetrieveAllOptionSetsResponse)serviceAdmin.Execute(request);
            var optionsets = response.OptionSetMetadata.Select(x => x.Name).OrderBy(y=>y).ToList();
            var output = new
            {
                ok = true,
                message = string.Empty,
                optionsets
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetGlobalOptionSetValue(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetGlobalOptionSetValue>(json);
            var request = new RetrieveAllOptionSetsRequest();
            var response = (RetrieveAllOptionSetsResponse)serviceAdmin.Execute(request);
            var optionset = response.OptionSetMetadata.FirstOrDefault(x => x.Name == input.option_set_name);
            var values = new List<NameValue>();
            if (optionset != null)
            {
                foreach (var option in ((OptionSetMetadata)optionset).Options)
                {
                    values.Add(new NameValue
                    {
                        Name = option.Label?.UserLocalizedLabel?.Label ?? string.Empty,
                        Value = option?.Value == null ? "-1" : $"{option.Value}"
                    }); ;
                }
            }
            values = values.OrderBy(x => x.Name).ToList();
            values.Insert(0, new NameValue { Value = "-1", Name = " " });
            var output = new
            {
                ok = true,
                message = string.Empty,
                values
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetLocalOptionSet(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetLocalOptionSet>(json);
            var optionsets = new List<string>();
            if (input.entity_logical_name?.Length > 0)
            {
                var request = new RetrieveEntityRequest
                {
                    LogicalName = input.entity_logical_name,
                    EntityFilters = EntityFilters.Attributes
                };
                var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
                foreach (var item in response.EntityMetadata.Attributes)
                {
                    if (item is EnumAttributeMetadata attr)
                    {
                        if (!attr?.OptionSet?.IsGlobal ?? true)
                        {
                            optionsets.Add(attr.LogicalName);
                        }
                    }
                }
                optionsets.Sort();
            }
            var output = new
            {
                ok = true,
                message = string.Empty,
                optionsets
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetLocalOptionSetValue(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetLocalOptionSetValue>(json);
            var values = new List<NameValue>();
            if (input.entity_logical_name?.Length > 0)
            {
                var request = new RetrieveEntityRequest
                {
                    LogicalName = input.entity_logical_name,
                    EntityFilters = EntityFilters.Attributes
                };
                var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
                foreach (var item in response.EntityMetadata.Attributes)
                {
                    if (item is EnumAttributeMetadata attr)
                    {
                        if (!attr?.OptionSet?.IsGlobal ?? true)
                        {
                            if (attr.LogicalName == input.option_set_name.Substring(input.entity_logical_name.Length + 1))
                            {
                                foreach (var option in attr.OptionSet.Options)
                                {
                                    values.Add(new NameValue
                                    {
                                        Name = option.Label?.UserLocalizedLabel?.Label ?? string.Empty,
                                        Value = option?.Value == null ? "-1" : $"{option.Value}"
                                    }); ;
                                }
                            }
                        }
                    }
                }
                values = values.OrderBy(x => x.Name).ToList();
                values.Insert(0, new NameValue { Value = "-1", Name = " " });
            }
            var output = new
            {
                ok = true,
                message = string.Empty,
                values
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetCharts(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetCharts>(json);
            var request = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.Entity,
                LogicalName = input.entity_logical_name?.ToLower()
            };
            var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
            var query = new QueryExpression("savedqueryvisualization");
            query.ColumnSet.AddColumn("savedqueryvisualizationid");
            query.ColumnSet.AddColumn("name");
            query.Criteria.AddCondition("primaryentitytypecode", ConditionOperator.Equal, response.EntityMetadata.ObjectTypeCode);
            var rows = serviceAdmin.RetrieveMultiple(query);
            var charts = new List<NameValue>();
            foreach (var entity in rows.Entities)
            {
                charts.Add(new NameValue { Name = entity.GetAttributeValue<string>("name"), Value = $"{{{entity.Id.ToString().ToUpper()}}}" });
            }
            var output = new
            {
                ok = true,
                message = string.Empty,
                charts
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string UpsertDialog(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_UpsertDialog>(json);
            var SystemFormApi = ReadSystemForm();
            var FormId = Guid.Empty;
            if (SystemFormApi.Exist())
            {
                if (!IsUnmanagedForm(SystemFormApi.FormId))
                    throw new InvalidPluginExecutionException($"You cannot update this managed form.");
                FormId = SystemFormApi.FormId.Value;
            }
            if (FormId == Guid.Empty)
            {
                var create = new SystemForm
                {
                    Name = input.description,
                    Description = input.full_description,
                    FormXml = input.from_xml,
                    UniqueName = input.logical_name.ToLower(),
                    IntroducedVersion = "1.0.0.0",
                    Type = Shared.Entities.SystemFormOptionSets.Type.Dialog
                };
                serviceAdmin.Create(create);
            }
            else
            {
                var update = new SystemForm(FormId)
                {
                    Name = input.description,
                    Description = input.full_description,
                    FormXml = input.from_xml,
                    UniqueName = input.logical_name.ToLower()
                };
                serviceAdmin.Update(update);
            }

            var output = new
            {
                ok = true,
                message = string.Empty,
                form_id = FormId.ToString()
            };
            return SimpleJson.SerializeObject(output);
            bool IsUnmanagedForm(Guid? formId)
            {
                if (SystemFormApi.IsManaged ?? false) return false;
                return true;
            }
            SystemForm ReadSystemForm()
            {
                var fetchData = new
                {
                    type = "8",
                    uniquename = input.logical_name
                };
                var fetchXml = $@"
<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
  <entity name='systemform'>
    <all-attributes />
    <filter>
      <condition attribute='type' operator='eq' value='{fetchData.type}' />
      <condition attribute='uniquename' operator='eq' value='{fetchData.uniquename}' />
    </filter>
  </entity>
</fetch>";
                var rows = serviceAdmin.RetrieveMultiple<SystemForm>(fetchXml);
                if (rows.Count > 0) return rows[0];
                return new SystemForm();
            }
        }

        internal static string GetLocalTwoOptionSet(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetLocalTwoOptionSet>(json);
            var optionsets = new List<string>();
            if (input.entity_logical_name?.Length > 0)
            {
                var request = new RetrieveEntityRequest
                {
                    LogicalName = input.entity_logical_name,
                    EntityFilters = EntityFilters.Attributes
                };
                var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
                foreach (var item in response.EntityMetadata.Attributes)
                {
                    if (item is BooleanAttributeMetadata attr)
                    {
                        if (!attr?.OptionSet?.IsGlobal ?? true)
                        {
                            optionsets.Add(attr.LogicalName);
                        }
                    }
                }
                optionsets.Sort();
            }
            var output = new
            {
                ok = true,
                message = string.Empty,
                optionsets
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetLocalTwoOptionSetValue(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetLocalTwoOptionSetValue>(json);
            var values = new List<NameValue>();
            if (input.entity_logical_name?.Length > 0)
            {
                var request = new RetrieveEntityRequest
                {
                    LogicalName = input.entity_logical_name,
                    EntityFilters = EntityFilters.Attributes
                };
                var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
                foreach (var item in response.EntityMetadata.Attributes)
                {
                    if (item is BooleanAttributeMetadata attr)
                    {
                        if (!attr?.OptionSet?.IsGlobal ?? true)
                        {
                            if (attr.LogicalName == input.option_set_name.Substring(input.entity_logical_name.Length + 1))
                            {
                                values.Add(new NameValue { Name = attr.OptionSet.TrueOption?.Label?.UserLocalizedLabel?.Label ?? string.Empty, Value = $"{attr.OptionSet?.TrueOption?.Value}" });
                                values.Add(new NameValue { Name = attr.OptionSet.FalseOption?.Label?.UserLocalizedLabel?.Label ?? string.Empty, Value = $"{attr.OptionSet?.FalseOption?.Value}" });
                            }
                        }
                    }
                }
            }
            var output = new
            {
                ok = true,
                message = string.Empty,
                values
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string GetVisualizationId(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetVisualizationId>(json);
            var request = new RetrieveEntityRequest
            {
                EntityFilters = EntityFilters.Entity,
                LogicalName = input.entity_logical_name?.ToLower()
            };
            var response = (RetrieveEntityResponse)serviceAdmin.Execute(request);
            var query = new QueryExpression("savedqueryvisualization");
            query.ColumnSet.AddColumn("savedqueryvisualizationid");
            query.Criteria.AddCondition("primaryentitytypecode", ConditionOperator.Equal, response.EntityMetadata.ObjectTypeCode);
            query.Criteria.AddCondition("name", ConditionOperator.Equal, input.visualization_name);
            var rows = serviceAdmin.RetrieveMultiple(query);
            var visualization_id = rows.Entities.Count > 0 ? "{" + rows.Entities[0].Id.ToString().ToUpper() + "}" : "{" + Guid.Empty.ToString().ToUpper() + "}";
            var output = new
            {
                ok = true,
                message = string.Empty,
                visualization_id
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string IsGlobalOptionSet(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_IsGlobalOptionSet>(json);
            var request = new RetrieveAllOptionSetsRequest();
            var response = (RetrieveAllOptionSetsResponse)serviceAdmin.Execute(request);
            var output = new
            {
                ok = true,
                message = string.Empty,
                is_global = response.OptionSetMetadata.Count(x => x.Name == input.option_set_name) > 0
            };
            return SimpleJson.SerializeObject(output);
        }

        internal static string ParseLocalOptionSet(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_ParseLocalOptionSet>(json);
            if (input.option_set_name?.Length > 0)
            {
                var arr = input.option_set_name.Split("_".ToCharArray());
                var request = new RetrieveAllEntitiesRequest
                {
                    EntityFilters = EntityFilters.Entity
                };
                var response = (RetrieveAllEntitiesResponse)serviceAdmin.Execute(request);
                for (var i = 0; i < arr.Length - 1; i++)
                {
                    var entity = getEntity(arr, i);
                    var optionset = input.option_set_name.Substring(entity.Length + 1);
                    var found = response.EntityMetadata.FirstOrDefault(x => x.LogicalName == entity);
                    if (found != null)
                    {
                        var request2 = new RetrieveEntityRequest
                        {
                            LogicalName = entity,
                            EntityFilters = EntityFilters.Attributes
                        };
                        var response2 = (RetrieveEntityResponse)serviceAdmin.Execute(request2);
                        var found2 = response2.EntityMetadata.Attributes.FirstOrDefault(x => x.LogicalName == optionset);
                        if (found2 != null)
                        {
                            var output = new
                            {
                                ok = true,
                                message = string.Empty,
                                entity_logical_name = entity,
                                option_set_name = optionset
                            };
                            return SimpleJson.SerializeObject(output);
                        }
                    }
                }
            }
            var output2 = new
            {
                ok = true,
                message = string.Empty,
                entity_logical_name = string.Empty,
                option_set_name = string.Empty
            };
            return SimpleJson.SerializeObject(output2);
            string getEntity(string[] arr, int index)
            {
                var value = string.Empty;
                for (var i = 0; i <= index; i++)
                {
                    value += $"{arr[i]}_";
                }
                value = value.TrimEnd("_".ToCharArray());
                return value;
            }
        }

        internal static string GetForm(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var input = SimpleJson.DeserializeObject<Input_GetForm>(json);
            var SystemFormApi = ReadSystemForm();
            var output = new
            {
                ok = true,
                mesage = string.Empty,
                formxml = SystemFormApi.FormXml,
                languagecode= GetLanguageCode(serviceAdmin) ?? 1033,
                logicalname = SystemFormApi.UniqueName,
                description = SystemFormApi.Name,
                fulldescription = SystemFormApi.Description
            };
            return SimpleJson.SerializeObject(output);

            SystemForm ReadSystemForm()
            {
                var fetchData = new
                {
                    type = "8",
                    formid = input.formid
                };
                var fetchXml = $@"
<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
  <entity name='systemform'>
    <all-attributes />
    <filter>
      <condition attribute='formid' operator='eq' value='{fetchData.formid}' />
    </filter>
  </entity>
</fetch>";
                var rows = serviceAdmin.RetrieveMultiple<SystemForm>(fetchXml);
                if (rows.Count > 0) return rows[0];
                return new SystemForm();
            }
        }

        private static int? GetLanguageCode(IOrganizationService serviceAdmin)
        {
            var fetchXml = $@"
<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
  <entity name='organization'>
    <attribute name='languagecode' />
  </entity>
</fetch>";
            var rows = serviceAdmin.RetrieveMultiple<Organization>(fetchXml);
            return rows[0].LanguageCode;
        }

        internal static string GetLanguageCode(IPluginExecutionContext context, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing, string json)
        {
            var output = new
            {
                ok = true,
                message = string.Empty,
                languagecode = GetLanguageCode(serviceAdmin) ?? 1033
            };
            return SimpleJson.SerializeObject(output);
        }
    }
}

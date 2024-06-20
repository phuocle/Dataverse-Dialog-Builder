using DataverseDialogBuilder.Shared;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Extensions;
using System;
using System.Collections.Generic;

namespace DataverseDialogBuilder.CustomAction
{
    [CrmPluginRegistration("pl_DataverseDialogBuilder", "none", StageEnum.PostOperation, ExecutionModeEnum.Synchronous, "", "PostDataverseDialogBuilderSynchronous", 1, IsolationModeEnum.Sandbox, PluginType = PluginType.CustomAction)]
    public class PostDataverseDialogBuilderSynchronous : IPlugin
    {
        /*
        InputParameters:
            f         System.String - require
            input     System.String
        OutputParameters:
            output    System.String - require
        */

        //private readonly string unSecureConfiguration = null;
        //private readonly string secureConfiguration = null;
        //public PostDataverseDialogBuilderSynchronous(string unSecureConfiguration, string secureConfiguration)
        //{
        //    this.unSecureConfiguration = unSecureConfiguration;
        //    this.secureConfiguration = secureConfiguration;
        //}

        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var serviceAdmin = serviceFactory.CreateOrganizationService(null);
            var service = serviceFactory.CreateOrganizationService(context.UserId);
            var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            if (context.Stage != (int)StageEnum.PostOperation) throw new InvalidPluginExecutionException("Stage does not equals PostOperation");
            if (context.PrimaryEntityName.ToLower() != "none") throw new InvalidPluginExecutionException("PrimaryEntityName does not equals none");
            if (context.MessageName.ToLower() != "pl_DataverseDialogBuilder".ToLower()) throw new InvalidPluginExecutionException("MessageName does not equals pl_DataverseDialogBuilder");
            if (context.Mode != (int)ExecutionModeEnum.Synchronous) throw new InvalidPluginExecutionException("Execution does not equals Synchronous");

            tracing.DebugContext(context);

            var outputs = ExecuteCustomAction(context, serviceFactory, serviceAdmin, service, tracing);
            foreach (var output in outputs)
            {
                if (context.OutputParameters.Contains(output.Key))
                {
                    context.OutputParameters[output.Key] = output.Value;
                }
            }
        }

        private ParameterCollection ExecuteCustomAction(IPluginExecutionContext context, IOrganizationServiceFactory serviceFactory, IOrganizationService serviceAdmin, IOrganizationService service, ITracingService tracing)
        {
            var outputs = new ParameterCollection();
            //YOUR CUSTOM ACTION BEGIN HERE
            var f = context.InputParameterOrDefault<string>("f");
            var json = context.InputParameterOrDefault<string>("input");
            if (f == null) throw new InvalidPluginExecutionException("Missing required fields");
            var output = SimpleJson.SerializeObject(new Output { ok = false, message = $"f:{f},json:{json}" });
            switch (f)
            {
                case "GetObjectTypeCode":
                    output = Action.GetObjectTypeCode(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetViewId":
                    output = Action.GetViewId(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetVisualizationId":
                    output = Action.GetVisualizationId(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetViewName":
                    output = Action.GetViewName(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetGlobalOptionSet":
                    output = Action.GetGlobalOptionSet(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetGlobalOptionSetValue":
                    output = Action.GetGlobalOptionSetValue(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetLocalOptionSet":
                    output = Action.GetLocalOptionSet(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetLocalOptionSetValue":
                    output = Action.GetLocalOptionSetValue(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetCharts":
                    output = Action.GetCharts(context, serviceAdmin, service, tracing, json);
                    break;
                case "UpsertDialog":
                    output = Action.UpsertDialog(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetLocalTwoOptionSet":
                    output = Action.GetLocalTwoOptionSet(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetLocalTwoOptionSetValue":
                    output = Action.GetLocalTwoOptionSetValue(context, serviceAdmin, service, tracing, json);
                    break;
                case "IsGlobalOptionSet":
                    output = Action.IsGlobalOptionSet(context, serviceAdmin, service, tracing, json);
                    break;
                case "ParseLocalOptionSet":
                    output = Action.ParseLocalOptionSet(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetForm":
                    output = Action.GetForm(context, serviceAdmin, service, tracing, json);
                    break;
                case "GetLanguageCode":
                    output = Action.GetLanguageCode(context, serviceAdmin, service, tracing, json);
                    break;
            }
            outputs.Add(new KeyValuePair<string, object>("output", output));
            return outputs;
        }
    }
}

using DataverseDialogBuilder.Console.Debug;
using DataverseDialogBuilder.Shared;

namespace DataverseDialogBuilder.Console.CustomAction
{
    internal class DebugPostDataverseDialogBuilderSynchronous
    {
        internal static void GetObjectTypeCode()
        {
            var input = new
            {
                entity_logical_name = "account"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetObjectTypeCode";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetViewId()
        {
            var input = new
            {
                entity_logical_name = "account",
                view_name = "Account Lookup View"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetViewId";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetViewName()
        {
            //var input = new
            //{
            //    entity_logical_name = "account",
            //    view_id = "A9AF0AB8-861D-4CFA-92A5-C6281FED7FAB"
            //};
            //var context = Helper.GetCustomActionExecutionContext;
            //context.InputParameters["f"] = "GetViewName";
            //context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            //var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            //var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            //plugin.Execute(serviceProvider);

            var json = @"{'BusinessUnitId':'f2d7127c-3e5c-ea11-a811-000d3a081e4a','CorrelationId':'9844b17b-7c25-4f24-85ab-bfd75db9b451','Depth':1,'InitiatingUserAgent':'Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/124.0.0.0 Safari\/537.36 Edg\/124.0.0.0','InitiatingUserAzureActiveDirectoryObjectId':'c78b3eae-8167-4789-b16b-1fded9ebc278','InitiatingUserId':'22bfb144-6ea8-4cb1-b2d6-6bd377ecb37b','InputParameters':[{'key':'f','value':'GetViewName'},{'key':'input','value':'{\'entity_logical_name\':\'systemuser\',\'view_id\':\'\'}'},{'key':'x-ms-app-name','value':'pl_DataverseDialogBuilder'}],'IsExecutingOffline':false,'IsInTransaction':true,'IsOfflinePlayback':false,'IsolationMode':2,'MessageName':'pl_DataverseDialogBuilder','Mode':0,'OperationCreatedOn':'2024-05-21T02:15:50.000Z','OperationId':'e36b2cd1-18b5-4631-a093-0f090770fd36','OrganizationId':'c03c43bb-6b08-49b9-9d5c-395c95ee69e0','OrganizationName':'orgdc5adbf3','OutputParameters':[{'key':'output','value':null}],'OwningExtension':{'Id':'c6a5ff3d-43f6-ee11-a1fe-6045bd224a3c','KeyAttributes':[],'LogicalName':'sdkmessageprocessingstep','Name':'DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous','RowVersion':null},'ParentContext':null,'PostEntityImages':[],'PreEntityImages':[],'PrimaryEntityId':'00000000-0000-0000-0000-000000000000','PrimaryEntityName':'none','RequestId':'e36b2cd1-18b5-4631-a093-0f090770fd36','SecondaryEntityName':'none','SharedVariables':[{'key':'IsAutoTransact','value':true},{'key':'AcceptLang','value':'en-US,en;q=0.9'},{'key':'x-ms-app-name','value':'pl_DataverseDialogBuilder'}],'Stage':40,'UserAzureActiveDirectoryObjectId':'c78b3eae-8167-4789-b16b-1fded9ebc278','UserId':'22bfb144-6ea8-4cb1-b2d6-6bd377ecb37b'}".Replace("'", "\"");
            var serviceProvider = Helper.GetServiceProvider(json, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetGlobalOptionSet()
        {
            var input = new
            {
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetGlobalOptionSet";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }
        internal static void GetGlobalOptionSetValue()
        {
            var input = new
            {
                option_set_name = "pl_globaloptionset"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetGlobalOptionSetValue";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }
        internal static void GetLocalOptionSet()
        {
            var input = new
            {
                entity_logical_name = "account"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetLocalOptionSet";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetLocalOptionSetValue()
        {
            var input = new
            {
                entity_logical_name = "account",
                option_set_name = "account_accountcategorycode"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetLocalOptionSetValue";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetCharts()
        {
            var input = new
            {
                entity_logical_name = "account"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetCharts";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetLocalTwoOptionSet()
        {
            var input = new
            {
                entity_logical_name = "pl_dialog"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetLocalTwoOptionSet";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetLocalTwoOptionSetValue()
        {
            var input = new
            {
                entity_logical_name = "pl_dialog",
                option_set_name = "pl_dialog_pl_yesno"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetLocalTwoOptionSetValue";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void GetVisualizationId()
        {
            var input = new
            {
                entity_logical_name = "account",
                visualization_name = "New Accounts By Month"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "GetVisualizationId";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void IsGlobalOptionSet()
        {
            var input = new
            {
                option_set_name = "pl_globaloptionset"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "IsGlobalOptionSet";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }

        internal static void ParseLocalOptionSet()
        {
            var input = new
            {
                option_set_name = "pl_dialog_pl_yesno"
            };
            var context = Helper.GetCustomActionExecutionContext;
            context.InputParameters["f"] = "ParseLocalOptionSet";
            context.InputParameters["input"] = SimpleJson.SerializeObject(input);
            var serviceProvider = Helper.GetServiceProvider(context, AppSettings.Service);
            var plugin = new DataverseDialogBuilder.CustomAction.PostDataverseDialogBuilderSynchronous();
            plugin.Execute(serviceProvider);
        }
    }
}

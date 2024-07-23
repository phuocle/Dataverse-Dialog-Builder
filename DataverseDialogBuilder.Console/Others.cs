using DataverseDialogBuilder.Shared.Entities;
using Microsoft.Xrm.Sdk.Query;
using System.IO;
using Microsoft.Xrm.Sdk;
using System.IdentityModel.Metadata;

namespace DataverseDialogBuilder.Console
{
    internal class Others
    {
        internal static void DownloadAllDialogs()
        {
            var fetchData = new
            {
                type = "8"
            };
            var fetchXml = $@"
<fetch>
  <entity name='systemform'>
    <attribute name='uniquename' />
    <attribute name='formxml' />
    <filter>
      <condition attribute='type' operator='eq' value='{fetchData.type/*8*/}'/>
    </filter>
  </entity>
</fetch>";
            var rows = AppSettings.Service.RetrieveMultiple(new FetchExpression(fetchXml));
            var folder = @"..\..\..\DataverseDialogBuilder.Others\dialogs";
            foreach (var entity in rows.Entities)
            {
                var file = Path.Combine(folder, entity.GetAttributeValue<string>("uniquename") + ".xml");
                File.WriteAllText(file, entity.GetAttributeValue<string>("formxml"));
            }
        }

        internal static void DownloadAllMainForms()
        {
            var fetchData = new
            {
                type = "2"
            };
            var fetchXml = $@"
<fetch>
  <entity name='systemform'>
    <attribute name='uniquename' />
    <attribute name='formxml' />
    <attribute name='objecttypecode' />
    <attribute name='name' />
    <filter>
      <condition attribute='type' operator='eq' value='{fetchData.type/*8*/}'/>
    </filter>
  </entity>
</fetch>";
            var rows = AppSettings.Service.RetrieveMultiple<SystemForm>(fetchXml);
            var folder = @"..\..\..\DataverseDialogBuilder.Others\main";
            foreach (var systemform in rows)
            {
                var subFolder = $"{folder}\\{systemform.ObjectTypeCode}";
                if (!Directory.Exists(subFolder)) Directory.CreateDirectory(subFolder);
                var file = $"{subFolder}\\{systemform.Name}.xml";
                File.WriteAllText(file, systemform.FormXml);
            }
        }
    }
}

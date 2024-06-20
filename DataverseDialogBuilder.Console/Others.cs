using Microsoft.Xrm.Sdk.Query;
using System.IO;

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
    }
}

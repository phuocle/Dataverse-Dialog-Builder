"use strict";
var FindUserId = (function () {
    "use strict";
    async function OnOpen(executionContext) {
        const options = {
            position: 1,
            width: 600,
            height: 270
        };
        const { userName } = Xrm.Utility.getGlobalContext().userSettings;
        const params = {
            pl_input_user_name: userName
        };
        const result = await Xrm.Navigation.openDialog("pl_find_user_id", options, params);
        if (result?.parameters?.pl_output_user_id?.length > 0) {
            //continue working with the user id you found ...
        }
    }
    async function OnLoad(executionContext) {
        const formContext = executionContext.getFormContext();
        const pl_input_user_name = formContext.getAttribute("pl_input_user_name").getValue();
        formContext.getAttribute("pl_textbox_user_name").setValue(pl_input_user_name);
    }
    async function OnClickFind(executionContext) {
        const formContext = executionContext.getFormContext();
        const userName = formContext.getAttribute("pl_textbox_user_name").getValue();
        const fetchData = {
            fullname: userName
        };
        let fetchXml = `
<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
  <entity name='systemuser'>
    <attribute name='systemuserid'/>
    <filter type='and'>
      <condition attribute='fullname' operator='eq' value='${fetchData.fullname}'/>
    </filter>
  </entity>
</fetch>
`;
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        Xrm.Utility.showProgressIndicator("Processing ...");
        const response = await Xrm.WebApi.retrieveMultipleRecords("systemuser", fetchXml);
        Xrm.Utility.closeProgressIndicator();
        if (response.entities.length === 1) {
            const entity = response.entities[0];
            userId = entity.systemuserid;
            formContext.getAttribute("pl_textbox_user_id").setValue(userId.toUpperCase());
            formContext.getAttribute("pl_output_user_id").setValue(userId.toUpperCase());
        }
        else {
            formContext.getAttribute("pl_textbox_user_id").setValue(null);
            formContext.getAttribute("pl_output_user_id").setValue(null);
        }
    }
    async function OnClickClose(executionContext) {
        const formContext = executionContext.getFormContext();
        formContext.ui.close();
    }
    return {
        OnOpen,
        OnLoad,
        OnClickFind,
        OnClickClose
    }
})();
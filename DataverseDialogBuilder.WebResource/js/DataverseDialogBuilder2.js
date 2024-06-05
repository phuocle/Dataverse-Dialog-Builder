var DataverseDialogBuilder_Demo = (function () {
    async function OnLoad(executionContext) {
        const formContext = executionContext.getFormContext();
        debugger;

        formContext.getAttribute("pl_datetime3").setValue(new Date());
        formContext.getAttribute("pl_para_isdisabled").setValue('0');
        formContext.getAttribute("pl_para_targetentities").setValue('account,contact');
        dynamicAddOptionSets();

        function dynamicAddOptionSets() {
            const control_pl_optionset1 = formContext.getControl("pl_optionset1");
            control_pl_optionset1.addOption({ text: 'Dynamic OptionSet 1', value: 50000 });
            control_pl_optionset1.addOption({ text: 'Dynamic OptionSet 2', value: 50001 });
            const control_pl_optionset4 = formContext.getControl("pl_optionset4");
            control_pl_optionset4.addOption({ text: 'OptionSet 1', value: 50000 });
            control_pl_optionset4.addOption({ text: 'OptionSet 2', value: 50001 });
            control_pl_optionset4.addOption({ text: 'OptionSet 3', value: 50002 });
            control_pl_optionset4.addOption({ text: 'OptionSet 4', value: 50003 });
        }
    }
    async function OnClickClose(executionContext) {
        var formContext = executionContext.getFormContext();
        debugger;

        formContext.ui.close();
    }
    async function OnClickMoveTab(executionContext, tabName) {
        var formContext = executionContext.getFormContext();
        debugger;

        formContext.ui.moveTo(tabName);
    }
    return {
        OnLoad,
        OnClickClose,
        OnClickMoveTab
    }
})();
var DataverseDialogBuilder_Preview = (function () {
    async function OnLoad(executionContext) {
        const formContext = executionContext.getFormContext();
        var session = sessionStorage.getItem('pl_dataversedialogbuilder_preview');
        const json = session === null ? { width: 400, height: 300 } : JSON.parse(session);
        formContext.getAttribute("pl_width").setValue(json.width);
        formContext.getAttribute("pl_height").setValue(json.height);
    }
    function buttonClick(executionContext, value) {
        var formContext = executionContext.getFormContext();
        var session = {
            width: formContext.getAttribute("pl_width").getValue(),
            height: formContext.getAttribute("pl_height").getValue(),
            button_click: value
        };
        sessionStorage.setItem('pl_dataversedialogbuilder_preview', JSON.stringify(session));
        formContext.ui.close();
    }
    async function OnClickOk(executionContext) {
        buttonClick(executionContext, 'ok');
    }
    async function OnClickCancel(executionContext) {
        buttonClick(executionContext, 'cancel');
    }
    return {
        OnLoad,
        OnClickOk,
        OnClickCancel
    }
})();
var DataverseDialogBuilder_Open = (function () {
    async function OnLoad(executionContext) {
        const formContext = executionContext.getFormContext();
        dynamicAddOptionSets();

        function dynamicAddOptionSets() {
            const control_pl_form_type = formContext.getControl("pl_form_type");
            control_pl_form_type.addOption({ text: 'Unmanaged', value: 0 });
            control_pl_form_type.addOption({ text: 'Managed', value: 1 });
            formContext.getAttribute("pl_form_type").addOnChange(pl_form_typeOnChange);
            formContext.getAttribute("pl_form_type").setValue(0);
            formContext.getAttribute("pl_form_type").fireOnChange();
            function pl_form_typeOnChange() {
                const formType = formContext.getAttribute("pl_form_type").getValue();
                formContext.getControl("pl_note").setVisible(formType === 1);
                filterForm(formType);
            }
            function filterForm(type) {
                const layoutXml = `
        <grid name='resultset' jump='name' select='0' preview='0' icon='1'>
            <row name='result' id='formid'>
                <cell name='name' width='200' />
                <cell name='uniquename' width='200' />
            </row>
        </grid>`;
                var fetchData = {
                    "type": "8",
                    "ismanaged": `${type}`
                };
                var fetchXml = [
                    "<fetch>",
                    "  <entity name='systemform'>",
                    "    <attribute name='formid'/>",
                    "    <attribute name='name'/>",
                    "    <attribute name='uniquename'/>",
                    "    <order attribute='name' descending='false'/>",
                    "    <filter type='and'>",
                    "      <condition attribute='type' operator='eq' value='", fetchData.type, "'/>",
                    "      <condition attribute='ismanaged' operator='eq' value='", fetchData.ismanaged, "'/>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                formContext.getControl("pl_system_form").addCustomView("00000000-0000-0000-0000-000000000001", 'systemform', 'Dataverse Dialog Builder', fetchXml, layoutXml, true)
            }
        }
    }
    async function OnClickOk(executionContext) {
        const formContext = executionContext.getFormContext();
        if (formContext.getAttribute("pl_system_form").getValue() !== null) {
            var output = {
                FormId: formContext.getAttribute("pl_system_form").getValue()[0].id,
                ClickButton: 'Ok',
            }
            formContext.getAttribute('pl_output').setValue(JSON.stringify(output));
            formContext.ui.close();
        }
    }
    async function OnClickCancel(executionContext) {
        var formContext = executionContext.getFormContext();
        var output = {
            ClickButton: 'Cancel',
        }
        formContext.getAttribute('pl_output').setValue(JSON.stringify(output));
        formContext.ui.close();
    }
    return {
        OnLoad,
        OnClickOk,
        OnClickCancel
    }
})();
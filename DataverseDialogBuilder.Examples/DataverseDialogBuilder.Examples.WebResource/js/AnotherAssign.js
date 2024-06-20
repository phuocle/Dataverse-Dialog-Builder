"use strict";
var AnotherAssign = (function () {
    "use strict";
    async function OnOpen(executionContext) {
        const options = {
            position: 1,
            width: 600,
            height: 270
        };
        const params = {
            pl_input_count: 2
        };
        const result = await Xrm.Navigation.openDialog("pl_another_assign", options, params);
        debugger;
        if (result?.parameters?.pl_output_button_click) {
            if (result.parameters.pl_output_button_click === 'OnClickAssignToMe') {
                //assgin record to me
            }
            else if (result.parameters.pl_output_button_click === 'OnClickAssign') {
                //assign record to user or team
            }
        }
    }
    async function OnLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        dynamicAddOptionSets();
        loadSubHeader();

        function loadSubHeader() {
            const count = formContext.getAttribute("pl_input_count").getValue();
            const label = formContext.getControl("pl_label_subheader").getLabel();
            formContext.getControl("pl_label_subheader").setLabel(label.replace('{0}', count === 1 ? `1 record` : `${count} records`));
        }
        function dynamicAddOptionSets() {
            const control_pl_pl_optionset_assign_to = formContext.getControl("pl_optionset_assign_to");
            control_pl_pl_optionset_assign_to.addOption({ text: 'Me', value: 50000 });
            control_pl_pl_optionset_assign_to.addOption({ text: 'User or Team', value: 50001 });
            formContext.getAttribute("pl_optionset_assign_to").setValue(50000);
            formContext.getAttribute("pl_optionset_assign_to").addOnChange(pl_optionset_assign_to__addOnChange);
        }
        function pl_optionset_assign_to__addOnChange() {
            const value = formContext.getAttribute("pl_optionset_assign_to").getValue();
            formContext.getControl("pl_button_next").setVisible(value !== 50000);
            formContext.getControl("pl_button_assign_to_me").setVisible(value === 50000);
        }
    }
    async function OnClickCancel(executionContext) {
        const formContext = executionContext.getFormContext();
        formContext.ui.close();
    }
    async function OnClickAssign(executionContext, buttonClick) {
        var formContext = executionContext.getFormContext();
        formContext.getAttribute("pl_output_button_click").setValue(buttonClick);
        formContext.ui.close();
    }
    async function MoveToTab(executionContext, tabName) {
        var formContext = executionContext.getFormContext();
        formContext.ui.moveTo(tabName);
    }
    return {
        OnOpen,
        OnLoad,
        OnClickCancel,
        OnClickAssign,
        MoveToTab
    }
})();
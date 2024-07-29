import * as GUID from './guid'
export function getXrm() {
    if (window.Xrm === undefined) {
        if (parent.Xrm === undefined) {
            throw new Error(`Not found Xrm in the currnet context`);
        }
        else {
            return parent.Xrm;
        }
    }
    else {
        return Xrm;
    }
}

export async function ExecuteCustomAction(functionName, obj) {
    var req = {};
    req.f = functionName;
    req.input = JSON.stringify(obj);
    req.getMetadata = function () {
        return {
            boundParameter: null,
            parameterTypes: {
                "f": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                },
                "input": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                }
            },
            operationType: 0,
            operationName: "pl_DataverseDialogBuilder"
        };
    }
    var res = await getXrm().WebApi.online.execute(req);
    if (!res.ok) return { ok: false, message: `{"f":"${req.f}", "input":"${req.input}"}` };
    var json = await res.json();
    if (json === null || json.output === null) return { ok: false, message: `{"f":"${req.f}", "input":"${req.input}"}` };
    return JSON.parse(json.output);
}

export async function GetViewId(entity_logical_name, view_name) {
    try {
        let input = { entity_logical_name, view_name };
        const output = await ExecuteCustomAction("GetViewId", input);
        return output.view_id ?? GUID.EMPTY;
    }
    catch {
        return GUID.EMPTY;
    }
}

export async function GetVisualizationId(entity_logical_name, visualization_name) {
    try {
        let input = { entity_logical_name, visualization_name };
        const output = await ExecuteCustomAction("GetVisualizationId", input);
        return output.visualization_id ?? GUID.EMPTY;
    }
    catch {
        return GUID.EMPTY;
    }
}

export async function GetViewName(entity_logical_name, view_id) {
    try {
        let input = { entity_logical_name, view_id };
        const output = await ExecuteCustomAction("GetViewName", input);
        return output.view_name ?? 'Account Lookup View';
    }
    catch {
        return 'Account Lookup View';
    }
}

export async function GetGlobalOptionSet() {
    try {
        let input = { };
        const output = await ExecuteCustomAction("GetGlobalOptionSet", input);
        return output.optionsets.map(x => { return { id: x, name: x } });
    }
    catch {
        return [
            { id: 'pl_globaloptionset', name: 'pl_globaloptionset'}
        ];
    }
}

export async function IsGlobalOptionSet(option_set_name) {
    try {
        let input = { option_set_name };
        const output = await ExecuteCustomAction("IsGlobalOptionSet", input);
        return output.is_global;
    }
    catch {
        if (option_set_name === 'pl_globaloptionset') return true;
        return false;
    }
}

export async function ParseLocalOptionSet(option_set_name) {
    try {
        let input = { option_set_name };
        const output = await ExecuteCustomAction("ParseLocalOptionSet", input);
        return { entity_logical_name: output.entity_logical_name, option_set_name: output.option_set_name };
    }
    catch {
        return {
            entity_logical_name: 'contact',
            option_set_name: 'donotemail'
        }
    }
}

export async function GetGlobalOptionSetValue(option_set_name) {
    try {
        let input = { option_set_name  };
        const output = await ExecuteCustomAction("GetGlobalOptionSetValue", input);
        return output.values.map(x => { return { id: x.Value, name: x.Name } });
    }
    catch {
        return [
            { id: '-1', name: ' ' },
            { id: '100000001', name: 'Item 1' }
        ];
    }
}

export async function GetLocalOptionSet(entity_logical_name) {
    try {
        let input = { entity_logical_name };
        const output = await ExecuteCustomAction("GetLocalOptionSet", input);
        return output.optionsets.map(x => { return { id: `${entity_logical_name}_${x}`, name: x } });
    }
    catch {
        return [
            { id: `${entity_logical_name}_accountcategorycode`, name: 'account_accountcategorycode' },
        ];
    }
}

export async function GetLocalOptionSetValue(entity_logical_name, option_set_name) {
    try {
        let input = { entity_logical_name, option_set_name };
        const output = await ExecuteCustomAction("GetLocalOptionSetValue", input);
        return output.values.map(x => { return { id: x.Value, name: x.Name } });
    }
    catch {
        return [
            { id: `-1`, name: ' ' },
            { id: `1`, name: 'Preferred Customer' },
        ];
    }
}

export async function GetLocalTwoOptionSet(entity_logical_name) {
    try {
        let input = { entity_logical_name };
        const output = await ExecuteCustomAction("GetLocalTwoOptionSet", input);
        return output.optionsets.map(x => { return { id: `${entity_logical_name}_${x}`, name: x } });
    }
    catch {
        return [
            { id: `contact_donotemail`, name: 'contact_donotemail' },
        ];
    }
}

export async function GetLocalTwoOptionSetValue(entity_logical_name, option_set_name) {
    try {
        let input = { entity_logical_name, option_set_name };
        const output = await ExecuteCustomAction("GetLocalTwoOptionSetValue", input);
        return output.values.map(x => { return { id: x.Value, name: x.Name } });
    }
    catch {
        return [
            { id: `0`, name: 'Yes' },
            { id: `1`, name: 'No' },
        ];
    }
}

export async function GetCharts(entity_logical_name) {
    try {
        let input = { entity_logical_name };
        const output = await ExecuteCustomAction("GetCharts", input);
        return output.charts.map(x => { return { id: x.Value, name: x.Name } });
    }
    catch {
        return [
            {
                id: GUID.EMPTY , name: 'New Accounts By Month' }
        ];
    }
}

export async function GetObjectTypeCode(entity_logical_name) {
    try {
        let input = { entity_logical_name };
        const output = await ExecuteCustomAction("GetObjectTypeCode", input);
        return output;
    }
    catch {
        return { object_type_code: 1 }
    }
}

export async function GetLanguageCode() {
    try {
        const output = await ExecuteCustomAction("GetLanguageCode", {});
        return output.languagecode;
    }
    catch {
        return 1033;
    }
}

export async function GetForm(formid) {
    try {
        let input = { formid };
        const output = await ExecuteCustomAction("GetForm", input);
        return output;
    }
    catch {
        return { formxml: '', languagecode: 1033, logicalname: '', description: '', fulldescription : ''}
    }
}

export function ShowProcessing(text) {
    try {
        if (text === undefined)
            getXrm().Utility.showProgressIndicator("Processing ...");
        else
            getXrm().Utility.showProgressIndicator(text);
    }
    catch { }
}

export function HideProcessing() {
    try {
        getXrm().Utility.closeProgressIndicator();
    }
    catch { }
}

export function ShowAlert(message) {
    try {
        getXrm().Navigation.openAlertDialog({ text: message, title: "Alert" }, { height: 300, width: 500 });
    } catch { }
}

export function ShowAlertWithCallback(message, successCallback, errorCallback) {
    try {
        getXrm().Navigation.openAlertDialog({ text: message, title: "Alert" }, { height: 300, width: 500 }).then(successCallback, errorCallback);
    } catch { }
}

export async function ShowConfirm(message) {
    try {
        return await getXrm().Navigation.openConfirmDialog({ text: message, title: "Confirm" }, { height: 300, width: 500 });
    } catch { }
}
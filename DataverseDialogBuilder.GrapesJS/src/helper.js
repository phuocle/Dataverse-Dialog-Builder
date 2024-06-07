import * as Const from './const';
import * as Crm from './crm';
import * as ControlName from './controlname';
import xmlFormat from 'xml-formatter';
import { v4 as uuidv4 } from 'uuid';
import * as GUID from './guid';
const helpers = {
    toString: (value) => {
        if (value === undefined || value == null) return '';
        if (value.trim && value.trim().length === 0) return '';
        return value;
    },
    toNumber: (value) => {
        if (value === undefined || value == null) return 0;
        if (value.trim && value.trim().length === 0) return 0;
        return value;
    },
    toNumberWithDefault: (value, defaultValue) => {
        if (value === undefined || value == null) return defaultValue;
        if (value.trim && value.trim().length === 0) return 0;
        return value;
    },
    cleanGUID: (value) => {
        if (value === undefined || value == null) return '';
        return value.replace(/{/g, '').replace(/}/g, '');
    },
    cleanGUIDWithDefaultNewGuid: (value) => {
        if (value === undefined || value == null) return uuidv4().toUpperCase();
        return value.replace(/{/g, '').replace(/}/g, '').toUpperCase();
    },
    isEmpty: (value) => {
        if (value === undefined || value === null) return true;
        if (value.trim && value.trim().length === 0) return true;
        return false;
    },
    toTrueFalse: (value) => {
        if (value === undefined || value === '0' || value === 'false' || value === false) return false;
        return true;
    },
    to01: (value) => {
        if (value === undefined || value === '0' || value === 'false' || value === false) return '0';
        return '1';
    },
    to01WithDefault: (value, defaultValue) => {
        if (value === undefined || value === null) return defaultValue;
        if (value === '0' || value === 'false' || value === false) return '0';
        return '1';
    },
    toStringWithDefault: (value, defaultValue) => {
        if (value === undefined || value === null) return defaultValue;
        return value;
    },
    toGuidWithDefaultNewGuid: (value) => {
        if (value === undefined || value === null) return uuidv4().toUpperCase();
        if (value.trim && value.trim().length === 0) return uuidv4().toUpperCase();
        return value;
    },
    isTrue: (value) => {
        if (value === undefined || value === '0' || value === 'false' || value === false) return false;
        return true;
    },
    isFalse: (value) => {
        if (value === undefined || value === '0' || value === 'false' || value === false) return true;
        return false;
    },
    toGuid: (value) => {
        if (value === undefined || value === null || value === 'undefined' || value === '{undefined}') return uuidv4().toLowerCase().replace(/{/g, '').replace(/}/g, '');
        return value.replace(/{/g, '').replace(/}/g, '');
    },
    msg: (editor, message, callback) => {
        try {
            Crm.ShowAlertWithCallback(message, callback, null);
        }
        catch {
            const modal = editor.Modal;
            modal.setTitle(Const.Error);
            modal.setContent(message);
            modal
                .open()
                .getModel()
                .once('change:open', () => callback());
        }
    },
    msgInformation: (editor, message, callback) => {
        const modal = editor.Modal;
        modal.setTitle(Const.Information);
        modal.setContent(message);
        modal
            .open()
            .getModel()
            .once('change:open', () => callback());
    },
    isValidId: (value) => {
        value = value?.toLowerCase();
        if (!value.includes('_')) return false;
        return /^[a-z][0-9a-z_]+$/.test(value);
    },
    isLogicalName: (value) => {
        if (!value.includes('_')) return false;
        return /^[a-z][0-9a-z_]+$/.test(value);
    },
    isWebresource: (value) => {
        if (!value.includes('_')) return false;
        return /^[a-z][0-9a-zA-Z_\/\.]+$/.test(value);
    },
    isValidName: (value) => {
        return /^[a-zA-Z_][a-zA-Z0-9_.]+$/.test(value);
    },
    UndefinedToEmpty: (value) => {
        if (value === undefined) return '';
        return value;
    },
    getLanguageCode: (editor) => {
        const metadataModel = editor.getWrapper().find(`.DDBMetadata`);
        if (metadataModel && metadataModel.length === 1) {
            const { languagecode } = metadataModel[0].getAttributes('languagecode');
            if (languagecode) return languagecode;
        }
        return '1033';
    },
    isComponentSupportPCF: (comp) => {
        return comp.is('ControlChartComponent') || comp.is('ControlDateTimeComponent') || comp.is('ControlDropDownComponent') || comp.is('ControlIframeComponent') || comp.is('ControlLookupComponent') || comp.is('ControlNumberComponent') || comp.is('ControlOptionSetComponent') || comp.is('ControlSubgridComponent') || comp.is('ControlTextAreaComponent') || comp.is('ControlTextboxComponent') || comp.is('ControlTwoOptionsComponent');
    },
    isComponentSupportOnChange: (comp) => {
        return comp.is('ControlDateTimeComponent') || comp.is('ControlDropDownComponent') || comp.is('ControlLookupComponent') || comp.is('ControlNumberComponent') || comp.is('ControlOptionSetComponent') || comp.is('ControlTextAreaComponent') || comp.is('ControlTextboxComponent') || comp.is('ControlTwoOptionsComponent');
    },
    escapeXml: (unsafe) => {
        return unsafe?.replace(/[<>&'"]/g, (c) => {
            switch (c) {
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
                case "'":
                    return '&apos;';
                case '"':
                    return '&quot;';
                default:
                    break;
            }
            return c;
        });
    },
    ShowHideLogicalName(editor, logicalname) {
        if (logicalname === undefined) return '';
        logicalname = logicalname.toLowerCase();
        if (editor.Panels.getButton('options', 'button_logicalname').active === true) {
            return `<span class='LogicalName'>${logicalname}</span>`;
        }
        return '';
    },
    GetFormXml(editor){
        const metadata = editor.getComponents().filter(c => c.attributes.type === 'MetadataComponent')[0];
        const header = editor.getComponents().filter(c => c.attributes.type === 'HeaderComponent')[0];
        const tabs = editor.getComponents().filter(c => c.attributes.type === 'TabsComponent')[0];
        const footer = editor.getComponents().filter(c => c.attributes.type === 'FooterComponent')[0];
        const getParameters = () =>{
            let parameters = '';
            metadata
                .components()
                .filter((comp) => comp.is('ParameterComponent'))
                .map((comp) => {
                    parameters += comp.toFormXml();
                });
            if (parameters.length > 0) parameters = `<formparameters>${parameters}</formparameters>`;
            return parameters;
        }
        const getEvents = () => {
            let events = '';
            metadata
                .components()
                .filter((comp) => comp.is('EventComponent'))
                .map((comp) => {
                    events += comp.toFormXml();
                });
            if (events.length > 0) events = `<events>${events}</events>`;
            return events;
        }
        const getJavaScripts = () => {
            let javascripts = '';
            metadata
                .components()
                .filter((comp) => comp.is('JavaScriptComponent'))
                .map((comp) => {
                    javascripts += comp.toFormXml();
                });
                if (javascripts.length > 0) javascripts = `<clientresources><internalresources><clientincludes>${javascripts}</clientincludes></internalresources></clientresources>`;
            return javascripts;
        }
        const getControlDescriptions = () => {
            const getControlDescription = (forControl, controlName, parameters) => {
                return `
<controlDescription forControl='{${forControl}}'>
    <customControl name='${controlName}' formFactor='0'>${parameters}</customControl>
    <customControl name='${controlName}' formFactor='1'>${parameters}</customControl>
    <customControl name='${controlName}' formFactor='2'>${parameters}</customControl>
    <customControl name='${controlName}' formFactor='3'>${parameters}</customControl>
</controlDescription>
`;
            }

            let controlDescription = '';
            editor.getWrapper().find('.DDBControlAdvFind').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
<parameters>
    <entitylogicalname type='SingleLine.Text'>${attr.para_entitylogicalname}</entitylogicalname>
    <fetchxml type='SingleLine.Text'>${attr.para_fetchxml}</fetchxml>
    <isvalid type='Boolean'>${attr.para_isvalid}</isvalid>
    <validationerrormessage type='SingleLine.Text'>${attr.para_validationerrormessage}</validationerrormessage>
</parameters>`;
                controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_ConditionBuilder_ConditionBuilderControl}`, parameters);
            });
            editor.getWrapper().find('.DDBControlAdvFindAndResult').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
<parameters>
    <entitylogicalname type='SingleLine.Text'>${attr.para_entitylogicalname}</entitylogicalname>
    <fetchxml type='SingleLine.Text'>${attr.para_fetchxml}</fetchxml>
</parameters>`;
                controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_RollupQuery_RollupQueryEditorControl}`, parameters);
            });
            editor.getWrapper().find('.DDBControlAdvFindResult').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
<parameters>
    <entitylogicalname type='SingleLine.Text'>${attr.para_entitylogicalname}</entitylogicalname>
    <fetchxml type='SingleLine.Text'>${attr.para_fetchxml}</fetchxml>
    <layoutxml type='SingleLine.Text'>${attr.para_layout_xml}</layoutxml>
    <selectedrecords type='Multiple'>${attr.para_selected_records}</selectedrecords>
</parameters>`;
                controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_Grid_FetchXmlResultsViewer}`, parameters);
            });
            editor.getWrapper().find('.DDBControlUpload').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
<parameters>
    <value type="SingleLine.Text">${attr.logicalname}</value>
    <filename type="SingleLine.Text">${attr.para_attachment_file_name}</filename>
    <size type="Whole.None">${attr.para_uploaded_file_size}</size>
</parameters>`;
                controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_FieldControls_FileUploaderControl}`, parameters);
            });
            editor.getWrapper().find('.DDBControlRichTextBox').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
<parameters>
    <configUrl static="true" type="SingleLine.URL">${attr.lib}</configUrl>
</parameters>`;
                controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_RichTextEditor_RichTextEditorControl}`, `${this.isEmpty(attr.lib) ? '' : parameters}`);
            });
            editor.getWrapper().find('.DDBControlEntityOptionSet').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
    <parameters>
        <value type='SingleLine.Text'>${attr.para_entitylogicalname}</value>
    </parameters>`;
                controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_FieldControls_EntityOptionSetControl}`, parameters);
            });
            editor.getWrapper().find('.DDBControlDateTime').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
    <parameters>
        <value type='DateAndTime.DateAndTime'>${attr.logicalname}</value>
    </parameters>`;
                if (attr.datetimetype === 'Time') {
                    controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_FieldControls_TimeControl}`, parameters);
                }
            });
            editor.getWrapper().find('.DDBControlUnknown').map((comp) => {
                const attr = comp.getAttributes();
                controlDescription += attr.control_description;
            });
            editor.getWrapper().find('.DDBControlMultiselectLookup').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
    <parameters>
        <targetEntities type="SingleLine.Text">${attr.para_targetentities}</targetEntities>
        <selectedEntities type="SingleLine.Text">${attr.para_selectedentities}</selectedEntities>
        <isDisabled type="SingleLine.Text">${attr.para_isdisabled}</isDisabled>
        <disableMru type="SingleLine.Text">${attr.para_disablemru}</disableMru>
    </parameters>`;
                controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_AppCommon_PartyListWrapper}`, parameters);
            });
            editor.getWrapper().find('.DDBControlTextbox').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
    <parameters>
        <value type='SingleLine.Phone'>${attr.logicalname}</value>
    </parameters>`;
                if (attr.textboxtype === 'Phone') {
                    controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_FieldControls_PhoneNumberControl}`, parameters);
                }
            });
            editor.getWrapper().find('.DDBControlTwoOptions').map((comp) => {
                const attr = comp.getAttributes();
                const parameters = `
    <parameters>
        <value type='TwoOptions'>${attr.logicalname}</value>
    </parameters>`;
                if (attr.twooptionstype === 'Toggle') {
                    controlDescription += getControlDescription(attr.uniqueid, `${ControlName.MscrmControls_FieldControls_ToggleControl}`, parameters);
                }
            });
    //        const test_test_parameters = `
    //<parameters>
    //    <targetEntities static="true" type="SingleLine.Text">account,contact,team</targetEntities>
    //    <selectedEntities type="SingleLine.Text">pl_para_entity_records</selectedEntities>
    //    <isDisabled type="SingleLine.Text">pl_para_is_disabled</isDisabled>
    //    <disableMru type="SingleLine.Text">pl_para_is_disable_mru</disableMru>
    //</parameters>`;
    //        const test_test = getControlDescription(`00000000-0000-0000-0000-000000000001`, `MscrmControls.AppCommon.PartyListWrapper`, test_test_parameters);

            const test_test = '';
            if (controlDescription.length > 0) {
                return `<controlDescriptions>${controlDescription}${test_test}</controlDescriptions>`;
            }
            return '';
        }
        const dialog = `<form>${getParameters()}${getEvents()}${getJavaScripts()}${header?.toFormXml() ?? ''}${tabs.toFormXml()}${footer?.toFormXml() ?? ''}${getControlDescriptions()}</form>`;
        return xmlFormat.minify(dialog);
    }


};
export default helpers;
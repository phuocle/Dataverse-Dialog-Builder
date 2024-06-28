import * as Const from './const';
import loadComponents from './components';
import loadBlocks from './blocks';
import loadCommands from './commands'
import loadCommands_Buttons from './commands_button'
import loadPanels from './panels'
import loadTraits from './traits'
import * as Crm from './crm'
import { v4 as uuidv4 } from 'uuid';

export default (editor, opts = {}) => {
    const options = {
        ...{
        }, ...opts
    };

    loadCommands(editor, options);
    loadCommands_Buttons(editor, options);
    loadPanels(editor, options);
    loadComponents(editor, options);
    loadBlocks(editor, options);
    loadTraits(editor, options);

    editor.on('load', () => {
        editor.Panels.getButton('views', 'open-blocks').set('active', true);
        editor.addComponents(Const.NewDDB);
        const dc = editor.DomComponents;
        editor.select(dc.getComponents().at(0));
    });
    editor.on('component:clone', (component) => {
        if (component.is('EventComponent')) {
            component.setAttributes({
                ...component.getAttributes(),
                uniqueid: `${uuidv4().toUpperCase()}`,
                func: ``,
            });
        }
        else if (component.is('ParameterComponent')) {
            component.setAttributes({
                ...component.getAttributes(),
                logicalname: ``,
            });
        }
        else if (component.is('JavaScriptComponent')) {
            component.setAttributes({
                ...component.getAttributes(),
                lib: ``,
            });
        }
        else if (component.is('ButtonComponent')) {
            component.setAttributes({
                ...component.getAttributes(),
                logicalname: ``,
            });
        }
        //else if (
        //    component.is('LabelComponent') ||
        //    component.is('ControlTextBoxComponent') ||
        //    component.is('ControlTextAreaComponent') ||
        //    component.is('ControlDateTimeComponent') ||
        //    component.is('ControlNumberComponent')
        //) {
        else
        {
            component.setAttributes({
                ...component.getAttributes(),
                uniqueid: `${uuidv4().toUpperCase()}`,
                id: `${uuidv4().toUpperCase()}`,
                logicalname: ``,
            });
        }
    });
    editor.on('component:add', (component) => {
        if (component.is('HeaderComponent')) {
            const parent = component.parent();
            if (parent.find('.DDBHeader').length > 1) {
                Crm.ShowAlert(Const.OnlyOneHeader);
                component.remove();
            }
        }
        if (component.is('FooterComponent')) {
            const parent = component.parent();
            if (parent.find('.DDBFooter').length > 1) {
                Crm.ShowAlert(Const.OnlyOneFooter);
                component.remove();
            }
        }
        if (component.is('TabHeaderComponent')) {
            const parent = component.parent();
            if (parent.find('.DDBTabHeader').length > 1) {
                Crm.ShowAlert(Const.OnlyOneTabHeader);
                component.remove();
            }
        }
        if (component.is('TabFooterComponent')) {
            const parent = component.parent();
            if (parent.find('.DDBTabFooter').length > 1) {
                Crm.ShowAlert(Const.OnlyOneTabFooter);
                component.remove();
            }
        }
        if (component.is('SectionComponent')) {
            const parent = component.parent();
            if (parent.find('.DDBSection').length > 3) {
                Crm.ShowAlert(Const.Only3Section);
                component.remove();
            }
        }
        if (component.is('LabelComponent')) {
            const parent = component.parent();
            if (parent.is('HeaderComponent')) {
                if (parent.find('.DDBLabel').length > 2) {
                    Crm.ShowAlert(Const.OnlyTwoLabelInHeader);
                    component.remove();
                }
            }
        }
    });
    editor.on('component:selected', async (component) => {
        if (component.is('MetadataComponent')) {
            const dynamicLoadEvents = () => {
                const eventid = component.get('traits').where({ name: 'eventid' })[0];
                if (!eventid) return;
                const options = [{ id: '', name: ' ' }];
                const events = editor.DomComponents.getWrapper().find('.DDBEvent');
                if (!events) return;
                events.map((comp) => {
                    const attr = comp.getAttributes();
                    if (attr.eventtype === 'onload') {
                        options.push({ id: attr.uniqueid, name: attr.func });
                    }
                    return options;
                });
                eventid.set('options', options);
            }
            dynamicLoadEvents();
        }
        if (component.is('ButtonComponent')) {
            const eventid = component.get('traits').where({ name: 'eventid' })[0];
            if (!eventid) return;
            const options = [{ id: ' ', name: ' ' }];
            const events = editor.DomComponents.getWrapper().find('.DDBEvent');
            if (!events) return;
            events.map((comp) => {
                const attr = comp.getAttributes();
                if (attr.eventtype === 'onclick') {
                    options.push({ id: attr.uniqueid, name: attr.func });
                }
                return options;
            });
            eventid.set('options', options);
        }
        if (
            component.is('ControlAdvFindComponent') ||
            component.is('ControlAdvFindResultComponent') ||
            component.is('ControlUploadComponent') ||
            component.is('ControlAdvFindAndResultComponent') ||
            component.is('ControlMultiselectLookupComponent')
        ) {
            const parameters = editor.DomComponents.getWrapper().find('.DDBParameter');
            const options = [];
            const options2 = [];
            const options3 = [];
            parameters.map((comp) => {
                const attr = comp.getAttributes();
                if (attr.parametertype === 'SafeString') { options.push({ id: attr.logicalname, name: attr.logicalname }); }
                if (attr.parametertype === 'Boolean') { options2.push({ id: attr.logicalname, name: attr.logicalname }); }
                if (attr.parametertype === 'Integer') { options3.push({ id: attr.logicalname, name: attr.logicalname }); }
                return options;
            });
            const para_fetchxml = component.get('traits').where({ name: 'para_fetchxml' })[0];
            para_fetchxml?.set('options', options);
            const para_entitylogicalname = component.get('traits').where({ name: 'para_entitylogicalname' })[0];
            para_entitylogicalname?.set('options', options);
            const para_validationerrormessage = component.get('traits').where({ name: 'para_validationerrormessage' })[0];
            para_validationerrormessage?.set('options', options);
            const para_layout_xml = component.get('traits').where({ name: 'para_layout_xml' })[0];
            para_layout_xml?.set('options', options);
            const para_selected_records = component.get('traits').where({ name: 'para_selected_records' })[0];
            para_selected_records?.set('options', options);
            const para_isvalid = component.get('traits').where({ name: 'para_isvalid' })[0];
            para_isvalid?.set('options', options2);
            const para_attachment_file_name = component.get('traits').where({ name: 'para_attachment_file_name' })[0];
            para_attachment_file_name?.set('options', options);
            const para_uploaded_file_size = component.get('traits').where({ name: 'para_uploaded_file_size' })[0];
            para_uploaded_file_size?.set('options', options3);

            const para_targetentities = component.get('traits').where({ name: 'para_targetentities' })[0];
            para_targetentities?.set('options', options);
            const para_selectedentities = component.get('traits').where({ name: 'para_selectedentities' })[0];
            para_selectedentities?.set('options', options);
            const para_isdisabled = component.get('traits').where({ name: 'para_isdisabled' })[0];
            para_isdisabled?.set('options', options);
            const para_disablemru = component.get('traits').where({ name: 'para_disablemru' })[0];
            para_disablemru?.set('options', options);
        }
        if (component.is('ControlEntityOptionSetComponent')) {
            const parameters = editor.DomComponents.getWrapper().find('.DDBParameter');
            const options = [];
            parameters.map((comp) => {
                const attr = comp.getAttributes();
                if (attr.parametertype === 'SafeString') { options.push({ id: attr.logicalname, name: attr.logicalname }); }
                return options;
            });
            const para_entitylogicalname = component.get('traits').where({ name: 'para_entitylogicalname' })[0];
            para_entitylogicalname.set('options', options);
        }
        if (component.is("wrapper")) {
            component.set('badgable', false);
        }
    });
};
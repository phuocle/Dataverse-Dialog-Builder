import Helper from './helper';
import * as Const from './const';
import * as Crm from './crm';
import * as GUID from './guid';

export default (editor, opts = {}) => {
    const commands = editor.Commands;

    const command_tlb_find_event = (editor, opts) => {
        return {
            run(e, sender) {
                const component = editor.getSelected();
                const attr = component.getAttributes();
                if (!Helper.isEmpty(attr?.eventid)) {
                    e.getWrapper()
                        .find(`.DDBEvent`)
                        .map((comp) => {
                            if (comp.getAttributes().uniqueid === attr.eventid) {
                                e.select(comp);
                                return;
                            }
                        });
                }
            }
        }
    }
    commands.add(Const.ToolbarFindEvent, command_tlb_find_event(editor, opts));

    const trait_button_select_library = (editor, opts) => {
        return {
            async run(editor, sender) {
                const component = editor.getSelected();
                try {
                    var lookupOptions =
                    {
                        defaultEntityType: 'webresource',
                        entityTypes: ['webresource'],
                        allowMultiSelect: false,
                        filters: [{filterXml: "<filter type='or'><condition attribute='webresourcetype' operator='eq' value='3' /></filter>", entityLogicalName: "webresource"}]
                    };
                    var result = await Crm.getXrm().Utility.lookupObjects(lookupOptions);
                    if (result.length > 0) {
                        component.getTrait(`lib`).setValue(result[0]?.name ?? '');
                        component.getTrait(`button_lib`).el.innerHTML = result[0]?.name ?? '';
                    }
                }
                catch{
                    component.getTrait(`lib`).setValue("pl_/js/dialog.js");
                    component.getTrait(`button_lib`).el.innerHTML = 'pl_/js/dialog.js';
                }
            }
        }
    }
    commands.add('trait_button_select_library', trait_button_select_library(editor, opts));

    const trait_button_select_entity = (editor, opts, entityname) => {
        return {
            async run(editor, sender) {
                const component = editor.getSelected();
                try {
                    var lookupOptions =
                    {
                        defaultEntityType: 'entity',
                        entityTypes: ['entity'],
                        allowMultiSelect: false,
                    };
                    var result = await Crm.getXrm().Utility.lookupObjects(lookupOptions);
                    component.getTrait(entityname).setValue(result[0]?.name?.toLowerCase() ?? null);
                    component.getTrait(`button_${entityname}`).el.innerHTML = result[0]?.name?.toLowerCase() ?? `&nbsp;`;
                }
                catch {
                    component.getTrait(entityname).setValue('account');
                    component.getTrait(`button_${entityname}`).el.innerHTML = 'account';
                }
            }
        }
    }
    commands.add('trait_button_select_entity', trait_button_select_entity(editor, opts, 'entitylogicalname'));
    commands.add('trait_button_select_entity_01', trait_button_select_entity(editor, opts, 'entitylogicalname01'));
    commands.add('trait_button_select_entity_02', trait_button_select_entity(editor, opts, 'entitylogicalname02'));
    commands.add('trait_button_select_entity_03', trait_button_select_entity(editor, opts, 'entitylogicalname03'));
    commands.add('trait_button_select_entity_04', trait_button_select_entity(editor, opts, 'entitylogicalname04'));
    commands.add('trait_button_select_entity_05', trait_button_select_entity(editor, opts, 'entitylogicalname05'));


    const trait_button_select_view = (editor, opts, entityname, viewid) => {
        return {
            async run(editor, sender) {
                const component = editor.getSelected();
                const trait_entityname = component.getTrait(entityname);
                try {
                    const output = await Crm.GetObjectTypeCode(trait_entityname.getValue());
                    var lookupOptions =
                    {
                        defaultEntityType: 'savedquery',
                        entityTypes: ['savedquery'],
                        allowMultiSelect: (viewid === `viewids` || viewid === `viewid01`) ? true : false,
                        filters: [{filterXml: `<filter type='or'><condition attribute='returnedtypecode' operator='eq' value='${output.object_type_code}' /></filter>`, entityLogicalName: "savedquery"}]
                    };
                    var result = await Crm.getXrm().Utility.lookupObjects(lookupOptions);
                    let viewids = '';
                    let viewnames = '';
                    if (result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            viewids += `${result[i]?.id?.toUpperCase()},`;
                            viewnames += `${result[i]?.name},`;
                        }
                        viewids = viewids.substring(0, viewids.length - 1);
                        viewnames = viewnames.substring(0, viewnames.length - 1);
                    }
                    component.getTrait(viewid).setValue(viewids);
                    component.getTrait(`button_${viewid}`).el.innerHTML = viewnames.length > 0 ? viewnames : `&nbsp;`;
                }
                catch {
                    component.getTrait(viewid).setValue(GUID.EMPTY);
                    component.getTrait(`button_${viewid}`).el.innerHTML = `Account Lookup View`;
                }
            }
        }
    }
    commands.add('trait_button_select_viewids', trait_button_select_view(editor, opts, 'entitylogicalname', 'viewids'));
    commands.add('trait_button_select_viewid_01', trait_button_select_view(editor, opts, 'entitylogicalname01', 'viewid01'));
    commands.add('trait_button_select_viewid_02', trait_button_select_view(editor, opts, 'entitylogicalname02', 'viewid02'));
    commands.add('trait_button_select_viewid_03', trait_button_select_view(editor, opts, 'entitylogicalname03', 'viewid03'));
    commands.add('trait_button_select_viewid_04', trait_button_select_view(editor, opts, 'entitylogicalname04', 'viewid04'));
    commands.add('trait_button_select_viewid_05', trait_button_select_view(editor, opts, 'entitylogicalname05', 'viewid05'));
  }

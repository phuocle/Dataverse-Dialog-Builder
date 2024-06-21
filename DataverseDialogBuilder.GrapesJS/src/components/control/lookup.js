import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';
import * as Crm from '../../crm';

export default (editor, options) => {
    return {
        type: 'ControlLookupComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlLookup')) {
                    return { type: 'ControlLookupComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Lookup',
                    classes: ['DDBControlLookup'],

                    copyable: false,
                    badgable: false,
                    highlightable: false,
                    hoverable: false,

                    draggable: '.DDBSection',
                    droppable: false,
                    traits: [
                        {
                            type: 'text-readonly',
                            name: 'id',
                            label: 'Id',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'text-readonly',
                            name: 'uniqueid',
                            label: 'UniqueId',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'text-readonly',
                            name: 'type',
                            label: 'Type',
                            value: 'Lookup'
                        },
                        {
                            type: 'text',
                            name: 'logicalname',
                            label: 'Logical Name (*)',
                            attributes: {
                                id: "DDBLowercase"
                            }
                        },
                        {
                            type: 'text',
                            name: 'label',
                            label: 'Label',
                        },

                        {
                            type: 'text-readonly',
                            name: 'entitylogicalname01',
                            label: 'EntityLogicalName 01 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_entitylogicalname01',
                            label: 'EntityLogicalName 01 (*)',
                            text: '&nbsp;',
                            full: true,
                            command: 'trait_button_select_entity_01'
                        },
                        {
                            type: 'text-readonly',
                            name: 'viewid01',
                            label: 'ViewId 01 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_viewid01',
                            text: '&nbsp;',
                            label: 'View 01 (*)',
                            full: true,
                            command: 'trait_button_select_viewid_01'
                        },

                        {
                            type: 'text-readonly',
                            name: 'entitylogicalname02',
                            label: 'EntityLogicalName 02 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_entitylogicalname02',
                            label: 'EntityLogicalName 02 (*)',
                            text: '&nbsp;',
                            full: true,
                            command: 'trait_button_select_entity_02'
                        },
                        {
                            type: 'text-readonly',
                            name: 'viewid02',
                            label: 'ViewId 02 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_viewid02',
                            text: '&nbsp;',
                            label: 'View 02 (*)',
                            full: true,
                            command: 'trait_button_select_viewid_02'
                        },

                        {
                            type: 'text-readonly',
                            name: 'entitylogicalname03',
                            label: 'EntityLogicalName 03 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_entitylogicalname03',
                            label: 'EntityLogicalName 03 (*)',
                            text: '&nbsp;',
                            full: true,
                            command: 'trait_button_select_entity_03'
                        },
                        {
                            type: 'text-readonly',
                            name: 'viewid03',
                            label: 'ViewId 03 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_viewid03',
                            text: '&nbsp;',
                            label: 'View 03 (*)',
                            full: true,
                            command: 'trait_button_select_viewid_03'
                        },

                        {
                            type: 'text-readonly',
                            name: 'entitylogicalname04',
                            label: 'EntityLogicalName 04 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_entitylogicalname04',
                            label: 'EntityLogicalName 04 (*)',
                            text: '&nbsp;',
                            full: true,
                            command: 'trait_button_select_entity_04'
                        },
                        {
                            type: 'text-readonly',
                            name: 'viewid04',
                            label: 'ViewId 04 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_viewid04',
                            text: '&nbsp;',
                            label: 'View 04 (*)',
                            full: true,
                            command: 'trait_button_select_viewid_04'
                        },

                        {
                            type: 'text-readonly',
                            name: 'entitylogicalname05',
                            label: 'EntityLogicalName 05 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_entitylogicalname05',
                            label: 'EntityLogicalName 05 (*)',
                            text: '&nbsp;',
                            full: true,
                            command: 'trait_button_select_entity_05'
                        },
                        {
                            type: 'text-readonly',
                            name: 'viewid05',
                            label: 'ViewId 05 (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_viewid05',
                            text: '&nbsp;',
                            label: 'View 05 (*)',
                            full: true,
                            command: 'trait_button_select_viewid_05'
                        },
                        {
                            type: 'checkbox',
                            name: 'disableviewpicker',
                            label: 'Disable View Picker',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'disablequickfind',
                            label: 'Disable Quick Find',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'disablemru',
                            label: 'Disable Mru',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'autoresolve',
                            label: 'Auto Resolve',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'usemainformdialogforcreate',
                            label: 'Use Main Form Dialog For Create',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'usemainformdialogforedit',
                            label: 'Use Main Form Dialog For Edit',
                            valueTrue: '1',
                            valueFalse: '0',
                        },

                        {
                            type: 'checkbox',
                            name: 'required',
                            label: 'Required',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'disabled',
                            label: 'Disabled',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'visible',
                            label: 'Visible',
                            valueTrue: '1',
                            valueFalse: '0',
                        }
                    ],
                },
                async init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                            label: 'Label',

                            disableviewpicker: '0',
                            disablequickfind: '0',
                            disablemru: '0',
                            autoresolve: '1',
                            usemainformdialogforcreate: '0',
                            usemainformdialogforedit: '0',

                            visible: '1',
                            disabled: '0',
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedLookup);
                    model.listenTo(model, 'change:attributes:label', model.changedLookup);
                    model.listenTo(model, 'change:attributes:required', model.changedLookup);
                    model.listenTo(model, 'change:attributes:disabled', model.changedLookup);
                    model.listenTo(model, 'change:attributes:entitylogicalname01', model.changedLookup);
                    model.listenTo(model, 'change:attributes:entitylogicalname02', model.changedLookup);
                    model.listenTo(model, 'change:attributes:entitylogicalname03', model.changedLookup);
                    model.listenTo(model, 'change:attributes:entitylogicalname04', model.changedLookup);
                    model.listenTo(model, 'change:attributes:entitylogicalname05', model.changedLookup);
                    model.listenTo(model, 'change:attributes:viewid01', model.changedLookup);
                    model.listenTo(model, 'change:attributes:viewid02', model.changedLookup);
                    model.listenTo(model, 'change:attributes:viewid03', model.changedLookup);
                    model.listenTo(model, 'change:attributes:viewid04', model.changedLookup);
                    model.listenTo(model, 'change:attributes:viewid05', model.changedLookup);
                    model.listenTo(model, 'change:attributes:visible', model.changedLookup);
                    model.changedLookup();
                },
                async getViewNames() {
                    const model = this;
                    const attr = model.getAttributes();
                    let viewnames = '';
                    const viewids = attr.viewid01.split(',');
                    for (let i = 0; i < viewids.length; i++) {
                        viewnames += `${await Crm.GetViewName(attr.entitylogicalname01, viewids[i])},`;
                    }
                    viewnames = viewnames.substring(0, viewnames.length - 1);
                    return viewnames;
                },
                async changedLookup() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (!Helper.isEmpty(attr.entitylogicalname01)) {
                        model.getTrait('button_entitylogicalname01').attributes.text = attr.entitylogicalname01;
                        model.getTrait('button_viewid01').attributes.text = await this.getViewNames();
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname02)) {
                        model.getTrait('button_entitylogicalname02').attributes.text = attr.entitylogicalname02;
                        model.getTrait('button_viewid02').attributes.text = await Crm.GetViewName(attr.entitylogicalname02, attr.viewid02);
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname03)) {
                        model.getTrait('button_entitylogicalname03').attributes.text = attr.entitylogicalname03;
                        model.getTrait('button_viewid03').attributes.text = await Crm.GetViewName(attr.entitylogicalname03, attr.viewid03);
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname04)) {
                        model.getTrait('button_entitylogicalname04').attributes.text = attr.entitylogicalname04;
                        model.getTrait('button_viewid04').attributes.text = await Crm.GetViewName(attr.entitylogicalname04, attr.viewid04);
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname05)) {
                        model.getTrait('button_entitylogicalname05').attributes.text = attr.entitylogicalname05;
                        model.getTrait('button_viewid05').attributes.text = await Crm.GetViewName(attr.entitylogicalname05, attr.viewid05);
                    }
                    model?.view?.render();
                },
                getViewIds(model) {
                    const attr = model.getAttributes();
                    return `<AvailableViewIds>${attr.viewid01}</AvailableViewIds>`;
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    let parameters = '';
                    if (!Helper.isEmpty(attr.entitylogicalname01)) {
                        parameters += `
                            <TargetEntity>
                                  ${!Helper.isEmpty(attr.viewid01) ? `<DefaultViewId>${attr.viewid01.split(',')[0]}</DefaultViewId>` : ''}
                                  <EntityLogicalName>${attr.entitylogicalname01}</EntityLogicalName>
                            </TargetEntity>`;
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname02)) {
                        parameters += `
                            <TargetEntity>
                                  ${!Helper.isEmpty(attr.viewid02) ? `<DefaultViewId>${attr.viewid02.split(',')[0]}</DefaultViewId>` : ''}
                                  <EntityLogicalName>${attr.entitylogicalname02}</EntityLogicalName>
                            </TargetEntity>`;
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname03)) {
                        parameters += `
                            <TargetEntity>
                                  ${!Helper.isEmpty(attr.viewid03) ? `<DefaultViewId>${attr.viewid03.split(',')[0]}</DefaultViewId>` : ''}
                                  <EntityLogicalName>${attr.entitylogicalname03}</EntityLogicalName>
                            </TargetEntity>`;
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname04)) {
                        parameters += `
                            <TargetEntity>
                                  ${!Helper.isEmpty(attr.viewid04) ? `<DefaultViewId>${attr.viewid04.split(',')[0]}</DefaultViewId>` : ''}
                                  <EntityLogicalName>${attr.entitylogicalname04}</EntityLogicalName>
                            </TargetEntity>`;
                    }
                    if (!Helper.isEmpty(attr.entitylogicalname05)) {
                        parameters += `
                            <TargetEntity>
                                  ${!Helper.isEmpty(attr.viewid05) ? `<DefaultViewId>${attr.viewid05.split(',')[0]}</DefaultViewId>` : ''}
                                  <EntityLogicalName>${attr.entitylogicalname05}</EntityLogicalName>
                            </TargetEntity>`;
                    }
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
        <labels>
            <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.LOOKUP}' isrequired='${Helper.toTrueFalse(attr.required)}' disabled='${Helper.toTrueFalse(attr.disabled)}' isunbound='true'>
            <parameters>
                <TargetEntities>
                    ${parameters}
                </TargetEntities>
                <DisableViewPicker>${Helper.toTrueFalse(attr.disableviewpicker)}</DisableViewPicker>
                <DisableQuickFind>${Helper.toTrueFalse(attr.disablequickfind)}</DisableQuickFind>
                <DisableMru>${Helper.toTrueFalse(attr.disablemru)}</DisableMru>
                <AutoResolve>${Helper.toTrueFalse(attr.autoresolve)}</AutoResolve>
                <useMainFormDialogForCreate>${Helper.toTrueFalse(attr.usemainformdialogforcreate)}</useMainFormDialogForCreate>
                <useMainFormDialogForEdit>${Helper.toTrueFalse(attr.usemainformdialogforedit)}</useMainFormDialogForEdit>
                ${this.getViewIds(model)}
            </parameters>
        </control>
    </cell>
</row>
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.entitylogicalname01?.toLowerCase()) || Helper.isEmpty(attr.viewid01)  ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    const requiredText = attr.required === '1' ? Const.Required : '';
                    const disabledIcon = attr.disabled === '1' ? Const.IconLock : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            let logicalnameText = '';
                            if (!Helper.isEmpty(attr.entitylogicalname01)) logicalnameText += `${attr.entitylogicalname01?.toLowerCase()}, `;
                            if (!Helper.isEmpty(attr.entitylogicalname02)) logicalnameText += `${attr.entitylogicalname02?.toLowerCase() }, `;
                            if (!Helper.isEmpty(attr.entitylogicalname03)) logicalnameText += `${attr.entitylogicalname03?.toLowerCase() }, `;
                            if (!Helper.isEmpty(attr.entitylogicalname04)) logicalnameText += `${attr.entitylogicalname04?.toLowerCase() }, `;
                            if (!Helper.isEmpty(attr.entitylogicalname05)) logicalnameText += `${attr.entitylogicalname05?.toLowerCase() }, `;
                            if (logicalnameText.length > 0) {
                                logicalnameText = ` ${logicalnameText.substring(0, logicalnameText.length - 2)}`;
                            }
                            comp.view.el.innerHTML = `LOOKUP ${logicalnameText}`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

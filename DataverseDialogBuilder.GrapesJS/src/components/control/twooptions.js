import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';
import * as Crm from '../../crm';

export default (editor, options) => {
    return {
        type: 'ControlTwoOptionsComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlTwoOptions')) {
                    return { type: 'ControlTwoOptionsComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'TwoOptions',
                    classes: ['DDBControlTwoOptions'],

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
                            value: 'TwoOptions'
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
                            type: 'select',
                            name: 'twooptionstype',
                            label: 'Type (*)',
                            options: [
                                { id: 'Dropdown', name: 'Dropdown' },
                                { id: 'Checkbox', name: 'Checkbox' },
                                { id: 'Toggle', name: 'Toggle' }
                            ],
                        },
                        {
                            type: 'text-readonly',
                            name: 'entitylogicalname01',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_entitylogicalname01',
                            label: 'Local EntityLogicalName (*)',
                            text: 'Select Local EntityLogicalName',
                            full: true,
                            command: 'trait_button_select_entity_01'
                        },
                        {
                            type: 'select',
                            name: 'optionsetname',
                            label: 'Logical OptionSet (*)',
                        },
                        {
                            type: 'select',
                            name: 'default',
                            label: 'Default Value (*)',
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
                            twooptionstype: 'Checkbox',
                            visible: '1',
                            disabled: '0',
                            twooptionsname: ''
                        });
                    }
                    model.set('toolbar', [...model.get('toolbar'), { attributes: { class: Const.IconFindEvent }, command: Const.ToolbarFindEvent}]);
                    model.listenTo(model, 'change:attributes:logicalname', model.changedTwoOptions);
                    model.listenTo(model, 'change:attributes:label', model.changedTwoOptions);
                    model.listenTo(model, 'change:attributes:twooptionstype', model.changedTwoOptions);
                    model.listenTo(model, 'change:attributes:required', model.changedTwoOptions);
                    model.listenTo(model, 'change:attributes:disabled', model.changedTwoOptions);
                    model.listenTo(model, 'change:attributes:visible', model.changedTwoOptions);
                    model.listenTo(model, 'change:attributes:entitylogicalname01', model.changedOptionSetLocalEntity);
                    model.listenTo(model, 'change:attributes:optionsetname', model.changedOptionSetLocalValue);
                    model.changedTwoOptions();
                },
                async changedOptionSetLocalValue() {
                    const model = this;
                    const options = await Crm.GetLocalTwoOptionSetValue(model.getTrait('entitylogicalname01')?.getValue(), model.getTrait('optionsetname')?.getValue());
                    model.getTrait('default').set('options', options);
                },
                async changedTwoOptions() {
                    this?.view?.render();
                },
                async changedOptionSetLocalEntity() {
                    const model = this;
                    const options = await Crm.GetLocalTwoOptionSet(model.getTrait('entitylogicalname01').getValue());
                    model.getTrait('optionsetname').set('options', options);
                    model.getTrait('button_entitylogicalname01').attributes.text = model.getAttributes().entitylogicalname01;
                },
                getClassId() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (attr.twooptionstype === 'Dropdown') return GUID.TWOOPTIONS_DROPDOWN;
                    if (attr.twooptionstype === 'Checkbox') return GUID.TWOOPTIONS_CHECKBOX;
                    if (attr.twooptionstype === 'Toggle') return GUID.TWOOPTIONS_CHECKBOX;
                    return '???';
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    const nameText = Helper.isTrue(attr.dynamic) ? `<OptionSetId>${GUID.EMPTY}</OptionSetId>` : `<OptionSetName>${attr.optionsetname}</OptionSetName>`;
                    const defaultValueText = !Helper.isEmpty(attr.default) ? `<DefaultValue>${attr.default}</DefaultValue>` : ``;
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
        <labels>
            <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${model.getClassId()}' isrequired='${Helper.toTrueFalse(attr.required)}' disabled='${Helper.toTrueFalse(attr.disabled)}' isunbound='true'>
            <parameters>
                ${nameText}
                ${defaultValueText}
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || (attr.dynamic === '0' && Helper.isEmpty(attr.default)) || (attr.dynamic === '0' && Helper.isEmpty(attr.optionsetname?.toLowerCase())) ? `BackgroundRed` : ``;
                    const visibleClass = attr.visible !== `1` ? `Visibled` : ``;
                    const requiredText = attr.required === `1` ? Const.Required : ``;
                    const disabledIcon = attr.disabled === `1` ? Const.IconLock : ``;
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains(`DDBControlLabel`)) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ``} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains(`DDBControlControl`)) {
                            comp.view.el.innerHTML = `${attr.twooptionstype?.toUpperCase()}`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

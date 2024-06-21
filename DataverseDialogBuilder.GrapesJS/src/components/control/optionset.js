import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';
import * as Crm from '../../crm';

export default (editor, options) => {
    return {
        type: 'ControlOptionSetComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlOptionSet')) {
                    return { type: 'ControlOptionSetComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'OptionSet',
                    classes: ['DDBControlOptionSet'],

                    copyable: true,
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
                            value: 'OptionSet'
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
                            default: '???'
                        },
                        {
                            type: 'select',
                            name: 'optionsettype',
                            label: 'Type (*)',
                            options: [
                                { id: 'OptionSet', name: 'OptionSet' },
                                { id: 'MultiSelect OptionSet', name: 'MultiSelect OptionSet' },
                            ],
                        },
                        {
                            type: 'checkbox',
                            name: 'dynamic',
                            label: 'Is Dynamic?',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '0'
                        },
                        {
                            type: 'checkbox',
                            name: 'required',
                            label: 'Required',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '0'
                        },
                        {
                            type: 'checkbox',
                            name: 'disabled',
                            label: 'Disabled',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '0'
                        },
                        {
                            type: 'checkbox',
                            name: 'visible',
                            label: 'Visible',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '1'
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
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedOptionSet);
                    model.listenTo(model, 'change:attributes:label', model.changedOptionSet);
                    model.listenTo(model, 'change:attributes:optionsettype', model.changedOptionSet);
                    model.listenTo(model, 'change:attributes:required', model.changedOptionSet);
                    model.listenTo(model, 'change:attributes:disabled', model.changedOptionSet);
                    model.listenTo(model, 'change:attributes:dynamic', model.changedOptionSet);
                    model.listenTo(model, 'change:attributes:visible', model.changedOptionSet);
                    model.listenTo(model, 'change:attributes:logicaltype', model.changedOptionSetLogicalType);
                    model.listenTo(model, 'change:attributes:optionsetname', model.changedOptionSetValue);
                    model.listenTo(model, 'change:attributes:entitylogicalname01', model.changedOptionSetLocalEntity);
                    await model.changedOptionSet();
                },
                async changedOptionSet() {
                    const model = this;
                    let attr = model.getAttributes();
                    if (attr.dynamic === '1') {
                        model.removeTrait('logicaltype');
                        model.removeTrait('optionsetname');
                        model.removeTrait('default');
                    }
                    else if (attr.dynamic === '0') {
                        model.addTrait({
                            type: 'select',
                            name: 'logicaltype',
                            label: 'Logical Type (*)',
                            options: [{ id: 0, name: 'Global' }, {id:1, name: 'Local'}]
                        }, {at: 7 });
                        model.addTrait({
                            type: 'select',
                            name: 'optionsetname',
                            label: 'Logical OptionSet (*)',
                        }, { at: 8 });
                        if (attr.optionsettype === 'OptionSet') {
                            model.addTrait({
                                type: 'select',
                                name: 'default',
                                label: 'Default Value',
                            }, { at: 9 });
                        }
                        else
                            model.removeTrait('default');
                        await model.changedOptionSetLogicalType();
                    }
                    model?.view?.render();
                },
                async changedOptionSetLogicalType() {
                    const model = this;
                    if (!Helper.isEmpty(model.getTrait('logicaltype').getValue()))
                    {
                        if (Number(model.getTrait('logicaltype').getValue()) === 0) {
                            model.removeTrait('entitylogicalname01');
                            model.removeTrait('button_entitylogicalname01');
                            const options = await Crm.GetGlobalOptionSet();
                            model.getTrait('optionsetname').set('options', options);
                        }
                        else if (Number(model.getTrait('logicaltype').getValue()) === 1)
                        {
                            model.addTrait({
                                type: 'text-readonly',
                                name: 'entitylogicalname01',
                                attributes: {
                                    style: Const.DisplayNone
                                }
                            }, { at: 8 });
                            model.addTrait({
                                type: 'button',
                                name: 'button_entitylogicalname01',
                                label: 'Local EntityLogicalName (*)',
                                text: 'Select Local EntityLogicalName',
                                full: true,
                                command: 'trait_button_select_entity_01'
                            }, { at: 9 });
                            const attr = model.getAttributes();
                            if (!Helper.isEmpty(attr.entitylogicalname01)) {
                                model.getTrait('button_entitylogicalname01').attributes.text = attr.entitylogicalname01;
                                await this.changedOptionSetLocalEntity();
                            }
                        }
                        await this.changedOptionSetValue();
                    }
                },
                async changedOptionSetLocalEntity() {
                    const model = this;
                    const options = await Crm.GetLocalOptionSet(model.getTrait('entitylogicalname01')?.getValue());
                    model.getTrait('optionsetname').set('options', options);
                },
                async changedOptionSetValue() {
                    const model = this;
                    if (model.getTrait('optionsettype').getValue() === 'OptionSet') {
                        if (Number(model.getTrait('logicaltype').getValue()) === 0) {
                            const options = await Crm.GetGlobalOptionSetValue(model.getTrait('optionsetname')?.getValue());
                            model.getTrait('default').set('options', options);
                        }
                        else {
                            const options = await Crm.GetLocalOptionSetValue(model.getTrait('entitylogicalname01')?.getValue(), model.getTrait('optionsetname')?.getValue());
                            model.getTrait('default').set('options', options);
                        }
                        model?.view?.render();
                    }
                },
                getClassId() {
                    const attr = this.getAttributes();
                    if (attr.optionsettype === 'OptionSet') return GUID.OPTIONSET_OPTIONSET;
                    if (attr.optionsettype === 'MultiSelect OptionSet') return GUID.OPTIONSET_MULTISELECT_OPTIONSET;
                    return '???';
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    const nameText = Helper.isTrue(attr.dynamic) ?  `<OptionSetId>${GUID.EMPTY}</OptionSetId>` : `<OptionSetName>${attr.optionsetname}</OptionSetName>`;
                    const defaultValueText = !Helper.isEmpty(attr.default) && attr.default !== '-1' && Number(attr.default) !== -1 ? `<DefaultValue>${attr.default}</DefaultValue>` : '';
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || (attr.dynamic === '0' && Helper.isEmpty(attr.optionsetname?.toLowerCase())) ? `BackgroundRed` : '';
                    const visibleClass = attr.visible !== `1` ? `Visibled` : '';
                    const requiredText = attr.required === `1` ? Const.Required : '';
                    const disabledIcon = attr.disabled === `1` ? Const.IconLock : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains(`DDBControlLabel`)) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains(`DDBControlControl`)) {
                            const dynamicText = attr.dynamic === `1` ? `DYNAMIC` : '';
                            comp.view.el.innerHTML = `${attr.optionsettype?.toUpperCase() ?? '???'} ${dynamicText}</span>`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

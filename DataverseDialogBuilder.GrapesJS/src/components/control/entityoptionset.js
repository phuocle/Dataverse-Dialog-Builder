import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlEntityOptionSetComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlEntityOptionSet')) {
                    return { type: 'ControlEntityOptionSetComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'EntityOptionSet',
                    classes: ['DDBControlEntityOptionSet'],

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
                            value: 'EntityOptionSet'
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
                            name: 'para_entitylogicalname',
                            label: 'Parameter Entity Logical Name (SafeString) (*)'
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
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedEntityOptionSet);
                    model.listenTo(model, 'change:attributes:label', model.changedEntityOptionSet);
                    model.listenTo(model, 'change:attributes:required', model.changedEntityOptionSet);
                    model.listenTo(model, 'change:attributes:disabled', model.changedEntityOptionSet);
                    model.listenTo(model, 'change:attributes:visible', model.changedEntityOptionSet);
                    model.listenTo(model, 'change:attributes:para_entitylogicalname', model.changedEntityOptionSet);
                    model.changedEntityOptionSet();
                },
                changedEntityOptionSet() {
                    this?.view?.render();
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
        <labels>
            <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.PLACE_HOLDER_CONTROL}' disabled='${Helper.toTrueFalse(attr.disabled)}' isrequired='${Helper.toTrueFalse(attr.required)}' isunbound='true' />
    </cell>
</row>
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.para_entitylogicalname) ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    const requiredText = attr.required === '1' ? Const.Required : '';
                    const disabledIcon = attr.disabled === '1' ? Const.IconLock : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `ENTITY OPTION SET`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

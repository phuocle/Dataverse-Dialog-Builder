import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlMultiselectLookupComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlMultiselectLookup')) {
                    return { type: 'ControlMultiselectLookupComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'MultiselectLookup',
                    classes: ['DDBControlMultiselectLookup'],

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
                            value: 'MultiselectLookup'
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
                            name: 'para_targetentities',
                            label: 'Parameter Target Entities (SafeString) (*)'
                        },
                        {
                            type: 'select',
                            name: 'para_selectedentities',
                            label: 'Parameter Selected Entities (SafeString) (*)'
                        },
                        {
                            type: 'select',
                            name: 'para_isdisabled',
                            label: 'Parameter Is Disabled (SafeString) (*)'
                        },
                        {
                            type: 'select',
                            name: 'para_disablemru',
                            label: 'Parameter Disable Mru (SafeString) (*)'
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
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                            visible: '1',
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedMultiselectLookup);
                    model.listenTo(model, 'change:attributes:label', model.changedMultiselectLookup);
                    model.listenTo(model, 'change:attributes:visible', model.changedMultiselectLookup);
                    model.listenTo(model, 'change:attributes:para_targetentities', model.changedMultiselectLookup);
                    model.listenTo(model, 'change:attributes:para_selectedentities', model.changedMultiselectLookup);
                    model.listenTo(model, 'change:attributes:para_isdisabled', model.changedMultiselectLookup);
                    model.listenTo(model, 'change:attributes:para_disablemru', model.changedMultiselectLookup);
                },
                changedMultiselectLookup() {
                    this?.view?.render();
                },
                toFormXml() {
                    const attr = this.getAttributes();
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
        <labels>
            <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.PLACE_HOLDER_CONTROL}' disabled='false' isunbound='true'>
            <parameters>
                <MaxLength>8388608</MaxLength>
                <Format>SingleLineOfText</Format>
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.para_targetentities) || Helper.isEmpty(attr.para_selectedentities) || Helper.isEmpty(attr.para_isdisabled) || Helper.isEmpty(attr.para_disablemru) ? 'BackgroundRed' : ``;
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : ``;
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${attr.label ?? ``} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `MULTISELECT LOOKUP`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

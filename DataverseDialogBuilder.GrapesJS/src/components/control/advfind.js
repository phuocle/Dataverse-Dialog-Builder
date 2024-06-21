import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlAdvFindComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlAdvFind')) {
                    return { type: 'ControlAdvFindComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'AdvFind',
                    classes: ['DDBControlAdvFind'],

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
                            value: 'AdvancedFind'
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
                            type: 'select',
                            name: 'para_fetchxml',
                            label: 'Parameter FetchXml (SafeString) (*)'
                        },
                        {
                            type: 'select',
                            name: 'para_entitylogicalname',
                            label: 'Parameter Entity Logical Name (SafeString) (*)'
                        },
                        {
                            type: 'select',
                            name: 'para_validationerrormessage',
                            label: 'Parameter Validation Error Message (SafeString) (*)'
                        },
                        {
                            type: 'select',
                            name: 'para_isvalid',
                            label: 'Parameter Is Valid (Boolean) (*)'
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
                    model.listenTo(model, 'change:attributes:logicalname', model.changedAdvFind);
                    model.listenTo(model, 'change:attributes:visible', model.changedAdvFind);
                    model.listenTo(model, 'change:attributes:para_fetchxml', model.changedAdvFind);
                    model.listenTo(model, 'change:attributes:para_entitylogicalname', model.changedAdvFind);
                    model.listenTo(model, 'change:attributes:para_validationerrormessage', model.changedAdvFind);
                    model.listenTo(model, 'change:attributes:para_isvalid', model.changedAdvFind);
                },
                changedAdvFind() {
                    this?.view?.render();
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
        <labels>
            <label description='' languagecode='${Helper.getLanguageCode(editor)}' />
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.para_fetchxml) || Helper.isEmpty(attr.para_entitylogicalname) || Helper.isEmpty(attr.para_validationerrormessage) || Helper.isEmpty(attr.para_isvalid) ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `ADVANCED FIND ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `ADVANCED FIND`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

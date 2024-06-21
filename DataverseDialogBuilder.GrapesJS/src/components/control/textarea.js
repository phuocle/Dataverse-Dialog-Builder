import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlTextAreaComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlTextArea')) {
                    return { type: 'ControlTextAreaComponent' };
                }
                return false;
            },
            extend: 'default',
            model: {
                defaults: {
                    name: 'TextArea',
                    classes: ['DDBControlTextArea'],
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
                            value: 'Textarea'
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
                            type: 'number',
                            name: 'maxlength',
                            label: 'Max Length (*)',
                            default: '2000'
                        },
                        {
                            type: 'number',
                            name: 'rows',
                            label: 'Rows (*)',
                            default: '3'
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
                    model.listenTo(model, 'change:attributes:logicalname', model.changedTextArea);
                    model.listenTo(model, 'change:attributes:label', model.changedTextArea);
                    model.listenTo(model, 'change:attributes:required', model.changedTextArea);
                    model.listenTo(model, 'change:attributes:disabled', model.changedTextArea);
                    model.listenTo(model, 'change:attributes:maxlength', model.changedTextArea);
                    model.listenTo(model, 'change:attributes:visible', model.changedTextArea);
                    model.listenTo(model, 'change:attributes:rows', model.changedTextArea);
                },
                changedTextArea() {
                    this?.view?.render();
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    let rowsAdded = '';
                    if (Number(attr.rows) > 1) {
                        for (let i = 1; i < Number(attr.rows); i += 1) {
                            rowsAdded += `<row />`;
                        }
                    }
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}' rowspan='${attr.rows}'>
        <labels>
            <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.SLT_TEXT_AREA}' isrequired='${Helper.toTrueFalse(attr.required)}' disabled='${Helper.toTrueFalse(attr.disabled)}' isunbound='true'>
            <parameters>
                <MaxLength>${attr.maxlength}</MaxLength>
                <Format>TextArea</Format>
            </parameters>
        </control>
    </cell>
</row>
${rowsAdded}
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.maxlength) || Helper.isEmpty(attr.rows) ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    const rowsClass = Helper.isEmpty(attr.rows) || Number(attr.rows) <= 10 ? `Row${attr.rows}` : 'Row10';
                    const requiredText = attr.required === '1' ? Const.Required : '';
                    const disabledIcon = attr.disabled === '1' ? Const.IconLock : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.setClass(`DDBControlControl ${rowsClass}`);
                            comp.view.el.innerHTML = `TEXTAREA (${attr.rows} rows)`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

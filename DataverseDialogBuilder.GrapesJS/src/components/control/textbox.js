import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlTextBoxComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlTextBox')) {
                    return { type: 'ControlTextBoxComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'TextBox',
                    classes: ['DDBControlTextBox'],

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
                            value: 'TextBox'
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
                            name: 'textboxtype',
                            label: 'TextBox Type (*)',
                            options: [
                                { id: 'Text', name: 'Text' },
                                { id: 'Email', name: 'Email' },
                                { id: 'URL', name: 'URL' },
                                { id: 'Ticker Symbol', name: 'Ticker Symbol' },
                                { id: 'Phone', name: 'Phone' }
                            ],
                        },
                        {
                            type: 'number',
                            name: 'maxlength',
                            label: 'Max Length (*)',
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
                    model.listenTo(model, 'change:attributes:logicalname', model.changedTextBox);
                    model.listenTo(model, 'change:attributes:label', model.changedTextBox);
                    model.listenTo(model, 'change:attributes:textboxtype', model.changedTextBox);
                    model.listenTo(model, 'change:attributes:maxlength', model.changedTextBox);
                    model.listenTo(model, 'change:attributes:required', model.changedTextBox);
                    model.listenTo(model, 'change:attributes:disabled', model.changedTextBox);
                    model.listenTo(model, 'change:attributes:visible', model.changedTextBox);
                },
                changedTextBox() {
                    this?.view?.render();
                },
                getClassId() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (attr.textboxtype === 'Text') return GUID.SLT_TEXT;
                    if (attr.textboxtype === 'Email') return GUID.SLT_EMAIL;
                    if (attr.textboxtype === 'URL') return GUID.SLT_URL;
                    if (attr.textboxtype === 'Ticker Symbol') return GUID.SLT_TICKER_SYMBOL;
                    if (attr.textboxtype === 'Phone') return GUID.SLT_TEXT;
                    return '???';
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    const typeText = (attr.textboxtype === `Text` || attr.textboxtype === `Phone`) ? `<Format>SingleLineOfText</Format>` : '';
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
        <labels>
            <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${model.getClassId()}' isrequired='${Helper.toTrueFalse(attr.required)}' disabled='${Helper.toTrueFalse(attr.disabled)}' isunbound='true'>
            <parameters>
                <MaxLength>${attr.maxlength}</MaxLength>
                ${typeText}
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.maxlength) ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    const requiredText = attr.required === '1' ? Const.Required : '';
                    const disabledIcon = attr.disabled === '1' ? Const.IconLock : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `${attr.textboxtype?.toUpperCase() ?? `???`} (${attr.maxlength ?? `???`})`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

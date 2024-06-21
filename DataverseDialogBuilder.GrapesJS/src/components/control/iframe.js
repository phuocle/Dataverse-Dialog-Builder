import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlIframeComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlIframe')) {
                    return { type: 'ControlIframeComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Iframe',
                    classes: ['DDBControlIframe'],

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
                            value: 'IFrame'
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
                            name: 'rows',
                            label: 'Rows (*)',
                            default: '5'
                        },
                        {
                            type: 'text',
                            name: 'url',
                            label: 'URL',
                        },
                        {
                            type: 'checkbox',
                            name: 'parameters',
                            label: 'Pass Parameters',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '0'
                        },
                        {
                            type: 'checkbox',
                            name: 'security',
                            label: 'Security',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '0'
                        },
                        {
                            type: 'checkbox',
                            name: 'scrolling',
                            label: 'Scrolling',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '0'
                        },
                        {
                            type: 'checkbox',
                            name: 'border',
                            label: 'Border',
                            valueTrue: '1',
                            valueFalse: '0',
                            default: '0'
                        },
                        {
                            type: 'checkbox',
                            name: 'mobile',
                            label: 'Show On Mobile Client',
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
                    model.listenTo(model, 'change:attributes:logicalname', model.changedIframe);
                    model.listenTo(model, 'change:attributes:label', model.changedIframe);
                    model.listenTo(model, 'change:attributes:visible', model.changedIframe);
                    model.listenTo(model, 'change:attributes:rows', model.changedIframe);
                },
                changedIframe() {
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
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.IFRAME}' isunbound='true'>
            <parameters>
                <Url>${attr.url}</Url>
                <PassParameters>${Helper.toTrueFalse(attr.parameters)}</PassParameters>
                <Security>${Helper.toTrueFalse(attr.security)}</Security>
                <Scrolling>${Helper.toTrueFalse(attr.scrolling)}</Scrolling>
                <Border>${Helper.toTrueFalse(attr.border)}</Border>
                <ShowOnMobileClient>${Helper.toTrueFalse(attr.mobile)}</ShowOnMobileClient>
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.rows) || Helper.isEmpty(attr.url) ? 'BackgroundRed' : '';
                    const rowsClass = Helper.isEmpty(attr.rows) || Number(attr.rows) <= 10 ? `Row${attr.rows}` : 'Row10';
                    const requiredText = attr.required === '1' ? Const.Required : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.setClass(`DDBControlControl ${rowsClass}`);
                            comp.view.el.innerHTML = `IFRAME (${attr.rows} rows)`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

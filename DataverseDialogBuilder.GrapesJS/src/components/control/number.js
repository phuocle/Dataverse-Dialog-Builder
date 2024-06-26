import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlNumberComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlNumber')) {
                    return { type: 'ControlNumberComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Number',
                    classes: ['DDBControlNumber'],

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
                            value: 'Number'
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
                            name: 'numbertype',
                            label: 'Number Type (*)',
                            options: [
                                { id: 'WholeNumber', name: 'Whole Number' },
                                { id: 'DecimalNumber', name: 'Decimal Number' },
                                { id: 'FloatingPointNumber', name: 'Floating Point Number' },
                                { id: 'Currency', name: 'Currency' },
                            ],
                        },
                        {
                            type: 'number',
                            name: 'minvalue',
                            label: 'Min Value (*)',
                        },
                        {
                            type: 'number',
                            name: 'maxvalue',
                            label: 'Max Value (*)',
                        },
                        {
                            type: 'number',
                            name: 'precision',
                            label: 'Precision (*)',
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
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedNumber);
                    model.listenTo(model, 'change:attributes:label', model.changedNumber);
                    model.listenTo(model, 'change:attributes:numbertype', model.changedNumber);
                    model.listenTo(model, 'change:attributes:required', model.changedNumber);
                    model.listenTo(model, 'change:attributes:disabled', model.changedNumber);
                    model.listenTo(model, 'change:attributes:minvalue', model.changedNumber);
                    model.listenTo(model, 'change:attributes:maxvalue', model.changedNumber);
                    model.listenTo(model, 'change:attributes:precision', model.changedNumber);
                    model.listenTo(model, 'change:attributes:visible', model.changedNumber);
                },
                changedNumber() {
                    this?.view?.render();
                },
                getClassId() {
                    const attr = this.getAttributes();
                    if (attr.numbertype === 'WholeNumber') return GUID.NUMBER_WHOLE_NUMBER;
                    if (attr.numbertype === 'DecimalNumber') return GUID.NUMBER_DECIMAL_NUMBER;
                    if (attr.numbertype === 'FloatingPointNumber') return GUID.NUMBER_FLOATING_POINT_NUMBER;
                    if (attr.numbertype === 'Currency') return GUID.NUMBER_CURRENCY;
                    return '???';
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    const precisionText = attr.numbertype !== 'WholeNumber' ? `<Precision>${attr.precision}</Precision>` : '';
                    return `
<row>
    <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
        <labels>
            <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${model.getClassId()}' isrequired='${Helper.toTrueFalse(attr.required)}' disabled='${Helper.toTrueFalse(attr.disabled)}' isunbound='true'>
            <parameters>
                <MinValue>${attr.minvalue}</MinValue>
                <MaxValue>${attr.maxvalue}</MaxValue>
                ${precisionText}
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.minvalue) || Helper.isEmpty(attr.maxvalue) || Helper.isEmpty(attr.precision) ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    const requiredText = attr.required === '1' ? Const.Required : '';
                    const disabledIcon = attr.disabled === '1' ? Const.IconLock : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `${attr.numbertype?.toUpperCase() ?? '???'}`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

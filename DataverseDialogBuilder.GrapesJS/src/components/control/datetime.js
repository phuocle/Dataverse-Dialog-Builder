import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlDateTimeComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlDateTime')) {
                    return { type: 'ControlDateTimeComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'DateTime',
                    classes: ['DDBControlDateTime'],

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
                            value: 'DateTime'
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
                            name: 'datetimetype',
                            label: 'Type (*)',
                            options: [
                                { id: 'Date', name: 'Date' },
                                { id: 'DateAndTime', name: 'DateAndTime' },
                                { id: 'Time', name: 'Time' },
                            ],
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
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                            label: 'Label',
                            datetimetype: 'DateAndTime',
                            visible: '1',
                            disabled: '0',
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedDateTime);
                    model.listenTo(model, 'change:attributes:label', model.changedDateTime);
                    model.listenTo(model, 'change:attributes:datetimetype', model.changedDateTime);
                    model.listenTo(model, 'change:attributes:required', model.changedDateTime);
                    model.listenTo(model, 'change:attributes:disabled', model.changedDateTime);
                    model.listenTo(model, 'change:attributes:visible', model.changedDateTime);
                },
                changedDateTime() {
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
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.DATETIME}' isrequired='${Helper.toTrueFalse(attr.required)}' disabled='${Helper.toTrueFalse(attr.disabled)}' isunbound='true'>
            <parameters>
                <Format>${attr.datetimetype === 'Date' ? 'Date' : 'DateAndTime'}</Format>
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    const requiredText = attr.required === '1' ? Const.Required : '';
                    const disabledIcon = attr.disabled === '1' ? Const.IconLock : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${disabledIcon} ${attr.label ?? ''} ${requiredText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `${attr.datetimetype?.toUpperCase()}`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

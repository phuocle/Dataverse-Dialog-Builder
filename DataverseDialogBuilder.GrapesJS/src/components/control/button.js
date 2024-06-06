import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ButtonComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBButton')) {
                    return { type: 'ButtonComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Button',
                    classes: ['DDBButton'],

                    copyable: false,
                    badgable: false,
                    hoverable: false,

                    draggable: '.DDBFooter, .DDBTabFooter',
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
                            value: 'Button'
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
                            label: 'Label (*)',
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
                        },
                        {
                            type: 'select',
                            name: 'eventid',
                            label: 'On Click (*)',
                        },
                    ],
                },
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                            label: 'Button',
                            visible: '1',
                            disabled: '0',
                            eventid: ``,
                        });
                    }
                    model.set('toolbar', [...model.get('toolbar'), { attributes: { class: Const.IconFindEvent }, command: Const.ToolbarFindEvent}]);
                    model.listenTo(model, 'change:attributes:logicalname', model.changedButton);
                    model.listenTo(model, 'change:attributes:label', model.changedButton);
                    model.listenTo(model, 'change:attributes:eventid', model.changedButton);
                    model.listenTo(model, 'change:attributes:disabled', model.changedButton);
                    model.listenTo(model, 'change:attributes:visible', model.changedButton);
                },
                changedButton() {
                    this?.view?.render();
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    return `
<cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='${Helper.toTrueFalse(attr.visible)}'>
    <labels>
        <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
    </labels>
    <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.BUTTON}' disabled='${Helper.toTrueFalse(attr.disabled)}' isunbound='true' />
</cell>
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const disabledIcon = attr.disabled === '1' ? Const.IconLock : ``;
                    const eventidIcon = !Helper.isEmpty(attr.eventid) ? Const.IconClick : ``;
                    const visibleClass = attr.visible !== '1' ? ' Visibled' : ``;
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.eventid) || Helper.isEmpty(attr.label) ? ' BackgroundRed' : ``;
                    model.setClass(`DDBButton${errorClass}${visibleClass}`);
                    el.innerHTML = `${disabledIcon} ${attr.label ?? ``} ${eventidIcon} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}</span>`;
                },
            },
        },
    };
};

import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'EventComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBEvent')) {
                    return { type: 'EventComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Event',
                    classes: ['DDBEvent'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    draggable: '.DDBMetadata',
                    droppable: false,
                    traits: [
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
                            value: 'Event'
                        },
                        {
                            type: 'select',
                            name: 'eventtype',
                            label: 'Event Type (*)',
                            options: [
                                { id: 'onload', name: 'OnLoad' },
                                { id: 'onclick', name: 'OnClick' }
                            ],
                        },
                        {
                            type: 'text-readonly',
                            name: 'lib',
                            label: 'Library Name (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            text: 'Select Library Name',
                            full: true,
                            label: 'Library Name (*)',
                            name: 'button_lib',
                            command: 'trait_button_select_library'
                        },
                        {
                            type: 'text',
                            name: 'func',
                            label: 'Function Name (*)',
                        },
                        {
                            type: 'checkbox',
                            name: 'context',
                            label: 'Execution Context',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'text',
                            name: 'parameters',
                            label: 'Parameters',
                        }
                    ],
                },
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.uniqueid)) {
                        model.addAttributes({
                            uniqueid: uuidv4().toUpperCase(),
                            context: '1'
                        });
                    }
                    model.listenTo(model, 'change:attributes:func', model.changedEvent);
                    model.listenTo(model, 'change:attributes:lib', model.changedEvent);
                    model.listenTo(model, 'change:attributes:context', model.changedEvent);
                    model.listenTo(model, 'change:attributes:parameters', model.changedEvent);
                    model.listenTo(model, 'change:attributes:eventtype', model.changedEvent);
                    model.changedEvent();
                },
                changedEvent(el) {
                    const model = this;
                    const attr = model.getAttributes();
                    if (!Helper.isEmpty(attr.lib)) {
                        model.getTrait('button_lib').attributes.text = attr.lib;
                    }
                    model?.view?.render();
                },
                getForControl(model) {
                    let value = '';
                    const attr = model.getAttributes();
                    if (attr.eventtype === 'onclick') {
                        editor
                            .getWrapper()
                            .find('.DDBButton')
                            .map((comp) => {
                                if (comp.getAttributes().eventid === attr.uniqueid) {
                                    value = `attribute="${comp.getAttributes().logicalname}"`;
                                    return;
                                }
                            });
                        return ` ${value}`;
                    }
                    return value;
                },
                toFormXml() {
                    const attr = this.getAttributes();
                    return `
<event name='${attr.eventtype}' application='false' active='false'${this.getForControl(this) }>
    <Handlers>
        <Handler functionName='${attr.func}' libraryName='$webresource:${attr.lib}' handlerUniqueId='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' enabled='true' parameters='${Helper.UndefinedToEmpty(Helper.escapeXml(attr.parameters))}' passExecutionContext='${Helper.toTrueFalse(attr.context)}' />
    </Handlers>
</event>
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.lib) || Helper.isEmpty(attr.func) ? 'BackgroundRed' : '';
                    const parametersText = !Helper.isEmpty(attr.parameters) ? `, ${attr.parameters}` : '';
                    const contextText = Helper.isTrue(attr.context) ? `(executionContext${parametersText})` : `(${parametersText.length > 0 ? parametersText.substring(2) : ''})`;
                    model.setClass(`DDBEvent ${errorClass}`);
                    el.innerHTML = `<span class='Bold'>Event ${attr.eventtype ?? ''}:</span> [${attr.lib ?? ''}] ${attr.func ?? ''} ${contextText}`;
                },
            },
        },
    };
};

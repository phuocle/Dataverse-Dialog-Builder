import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'SectionComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBSection')) {
                    return { type: 'SectionComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Section',
                    classes: ['DDBSection'],
                    copyable: false,
                    badgable: false,
                    highlightable: false,
                    hoverable: false,
                    draggable: '.DDBSections',
                    droppable: '.DDBLabel, .DDBControlTextbox, .DDBControlDateTime, .DDBControlNumber, .DDBControlLookup, .DDBControlRegarding, .DDBControlIframe, .DDBControlSpacer, .DDBControlTextArea, .DDBControlDropDown, .DDBControlOptionSet, .DDBControlTwoOptions, .DDBControlSubgrid, .DDBControlChart, .DDBControlAdvFind, .DDBControlAdvFindResult, .DDBControlAdvFindAndResult, .DDBControlRichTextBox, .DDBControlEntityOptionSet, .DDBControlUpload, .DDBControlUnknown, .DDBControlMultiselectLookup',
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
                            name: 'type',
                            label: 'Type',
                            value: 'Section'
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
                            type: 'number',
                            name: 'labelwidth',
                            label: 'Label Width (*)',
                        },
                        {
                            type: 'select',
                            name: 'alignment',
                            label: 'Label Alignment (*)',
                            options: [
                                { id: 'Left', name: 'Left' },
                                { id: 'Center', name: 'Center' },
                                { id: 'Right', name: 'Right' },
                            ],
                        },
                        {
                            type: 'select',
                            name: 'position',
                            label: 'Label Position (*)',
                            options: [
                                { id: 'Left', name: 'Left' },
                                { id: 'Top', name: 'Top' },
                            ],
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
                        const id = uuidv4().toUpperCase();
                        model.addAttributes({
                            id: id,
                            labelwidth: 115,
                            visible: '1',
                            alignment: 'Left',
                            position: 'Left'
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedSection);
                    model.listenTo(model, 'change:attributes:label', model.changedSection);
                    model.listenTo(model, 'change:attributes:visible', model.changedSection);
                    model.listenTo(model, 'change:attributes:labelwidth', model.changedSection);
                    model.changedSection();
                },
                changedSection() {
                    this?.view?.render();
                },
                getSectionWidth() {
                    const model = this;
                    const sections = model.parent().components().length - 1;
                    if (sections === 1) return 100;
                    if (sections === 2) return 50;
                    return 33;
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    let formXml = ``;
                    model.components().map((comp) => {
                        if (!comp.is('HiddenComponent')) {
                            formXml += comp.toFormXml();
                        }
                    });
                    return `
<column width='${this.getSectionWidth()}%'>
    <sections>
        <section id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' name='${attr.logicalname}' labelwidth='${attr.labelwidth}' showlabel='${Helper.isEmpty(attr.label) ? 'false' : 'true'}' visible='${Helper.toTrueFalse(attr.visible)}' celllabelalignment='${attr.alignment}' celllabelposition='${attr.position}'>
            <labels>
                <label description='${Helper.escapeXml(Helper.UndefinedToEmpty(attr.label))}' languagecode='${Helper.getLanguageCode(editor)}' />
            </labels>
            <rows>
                ${formXml}
            </rows>
        </section>
    </sections>
</column>
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const visibleClass = attr.visible !== '1' ? ' Visibled' : ``;
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.labelwidth) ? 'BackgroundRed' : ``;
                    el.firstChild.innerHTML = `${attr.label ?? 'Section'}` + " " + Helper.ShowHideLogicalName(editor, attr.logicalname);
                    model.setClass(`DDBSection ${errorClass}${visibleClass}`);
                    return this;
                },
            },
        },
    };
};

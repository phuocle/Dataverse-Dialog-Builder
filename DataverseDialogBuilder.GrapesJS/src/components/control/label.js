import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'LabelComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBLabel')) {
                    return { type: 'LabelComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Label',
                    classes: ['DDBLabel'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    draggable: '.DDBHeader, .DDBTabHeader, .DDBSection',
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
                            value: 'Label'
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
                            name: 'rows',
                            label: 'Rows (*)',
                        },
                        {
                            type: 'checkbox',
                            name: 'istitle',
                            label: 'Is Title',
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
                            rows: 1,
                            visible: '1',
                            istitle: '0',
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedLabel);
                    model.listenTo(model, 'change:attributes:label', model.changedLabel);
                    model.listenTo(model, 'change:attributes:istitle', model.changedLabel);
                    model.listenTo(model, 'change:attributes:rows', model.changedLabel);
                    model.listenTo(model, 'change:attributes:visible', model.changedLabel);
                    const parent = model.parent();
                    if (parent.is('SectionComponent')) {
                        const trait = model.getTrait('istitle');
                        trait.set('attributes', { style: 'display: none' });
                    }
                },
                changedLabel(el) {
                    this?.view?.render();
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    let rowsAdded = ``;
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
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.LABEL}' isunbound='true'>
            <parameters>
                <IsTitle>${Helper.toTrueFalse(attr.istitle)}</IsTitle>
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
                    const titleClass = Helper.isTrue(attr.istitle) ? `Title` : ``;
                    const visibleClass = Helper.isFalse(attr.visible) ? `Visibled` : ``;
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.rows) ? `BackgroundRed` : ``;
                    const rowsText = Number(attr.rows ?? 0) > 1 ? `(${attr.rows} rows)` : ``;
                    model.setClass(`DDBLabel ${titleClass} ${errorClass} ${visibleClass}`);
                    el.innerHTML = `${Helper.UndefinedToEmpty(attr.label) || 'Label'} ${rowsText} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}</span>`;
                },
            },
        },
    };
};

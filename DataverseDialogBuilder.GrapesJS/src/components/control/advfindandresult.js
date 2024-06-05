import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';

export default (editor, options) => {
    return {
        type: 'ControlAdvFindAndResultComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlAdvFindAndResult')) {
                    return { type: 'ControlAdvFindAndResultComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'AdvFindAndResult',
                    classes: ['DDBControlAdvFindAndResult'],

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
                            value: 'AdvancedFindAndResult'
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
                            type: 'number',
                            name: 'rows',
                            label: 'Rows (*)',
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
                            visible: '1',
                            label: '',
                            rows: 5
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedAdvFindAndResult);
                    model.listenTo(model, 'change:attributes:visible', model.changedAdvFindAndResult);
                    model.listenTo(model, 'change:attributes:para_fetchxml', model.changedAdvFindAndResult);
                    model.listenTo(model, 'change:attributes:para_entitylogicalname', model.changedAdvFindAndResult);
                },
                changedAdvFindAndResult() {
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
            <label description='' languagecode='${Helper.getLanguageCode(editor)}' />
        </labels>
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.PLACE_HOLDER_CONTROL}' disabled='false' isunbound='true' />
    </cell>
</row>
${rowsAdded}
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.para_fetchxml) || Helper.isEmpty(attr.para_entitylogicalname)  ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== '1' ? 'Visibled' : '';
                    const rowsClass = Helper.isEmpty(attr.rows) || Number(attr.rows) <= 10 ? `Row${attr.rows}` : 'Row10';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `ADVANCED FIND AND RESULT ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.setClass(`DDBControlControl ${rowsClass}`);
                            comp.view.el.innerHTML = `ADVANCED FIND AND RESULT`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

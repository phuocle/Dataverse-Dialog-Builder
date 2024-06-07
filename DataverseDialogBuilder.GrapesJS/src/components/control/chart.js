import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';
import * as Crm from '../../crm';

export default (editor, options) => {
    return {
        type: 'ControlChartComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlChart')) {
                    return { type: 'ControlChartComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Chart',
                    classes: ['DDBControlChart'],
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
                            value: 'Chart'
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
                            type: 'text-readonly',
                            name: 'entitylogicalname',
                            label: 'Entity Logical Name (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_entitylogicalname',
                            label: 'Entity Logical Name(*)',
                            text: '&nbsp;',
                            full: true,
                            command: 'trait_button_select_entity'
                        },
                        {
                            type: 'text-readonly',
                            name: 'viewids',
                            label: 'ViewIds (*)',
                            attributes: {
                                style: Const.DisplayNone
                            }
                        },
                        {
                            type: 'button',
                            name: 'button_viewids',
                            text: '&nbsp;',
                            label: 'View(s) (*)',
                            full: true,
                            command: 'trait_button_select_viewids'
                        },
                        {
                            type: 'select',
                            name: 'visualizationid',
                            label: 'Visualization Id (*)',
                        },
                        {
                            type: 'checkbox',
                            name: 'viewpicker',
                            label: 'View Picker?',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'checkbox',
                            name: 'chartpicker',
                            label: 'Chart Picker?',
                            valueTrue: '1',
                            valueFalse: '0',
                        },
                        {
                            type: 'number',
                            name: 'rows',
                            label: 'Rows (*)',
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
                async init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                            rows: 5,
                            visible: '1',
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedChart);
                    model.listenTo(model, 'change:attributes:entitylogicalname', model.changedChart);
                    model.listenTo(model, 'change:attributes:viewids', model.changedChart);
                    model.listenTo(model, 'change:attributes:visualizationid', model.changedChart);
                    model.listenTo(model, 'change:attributes:rows', model.changedChart);
                    model.listenTo(model, 'change:attributes:visible', model.changedChart);
                    model.listenTo(model, 'change:attributes:entitylogicalname', model.changedChartEntityLogicalName);
                    model.listenTo(model, 'change:attributes:label', model.changedChartEntityLogicalName);
                    model.changedChart();
                },
                async changedChart() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (!Helper.isEmpty(attr.entitylogicalname)) {
                        model.getTrait('button_entitylogicalname').attributes.text = attr.entitylogicalname;
                        if (!Helper.isEmpty(attr.viewids)) {
                            const viewids = attr.viewids.split(',');
                            if (viewids.length === 1)
                                model.getTrait('button_viewids').attributes.text = attr.viewids;
                            else {
                                let viewnames = '';
                                for (let i = 0; i < viewids.length; i++) {
                                    viewnames += `${await Crm.GetViewName(attr.entitylogicalname, viewids[i])};`;
                                }
                                viewnames = viewnames.substring(0, viewnames.length - 1);
                                model.getTrait('button_viewids').attributes.text = viewnames;
                            }
                        }
                        await model.changedChartEntityLogicalName();
                    }
                    model?.view?.render();
                },
                async changedChartEntityLogicalName() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (!Helper.isEmpty(attr.entitylogicalname)) {
                        const options = await Crm.GetCharts(model.getTrait('entitylogicalname').getValue());
                        model.getTrait('visualizationid').set('options', options);
                    }
                },
                getViewIds(model) {
                    const attr = model.getAttributes();
                    const arr = attr.viewids?.split(',');
                    if (arr.length > 1) {
                        return `<ViewIds>${attr.viewids}</ViewIds>`;
                    }
                    return '';
                },
                getViewId(model) {
                    const attr = model.getAttributes();
                    const arr = attr.viewids?.split(',');
                    return `<ViewId>${arr[0]}</ViewId>`;
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
        <control uniqueid='{${Helper.toGuidWithDefaultNewGuid(attr.uniqueid)}}' id='${attr.logicalname}' classid='${GUID.SUBGRID_CHART}' isunbound='true'>
            <parameters>
                <AutoExpand>Fixed</AutoExpand>
                <ChartGridMode>Chart</ChartGridMode>
                <IsUserView>false</IsUserView>
                <IsUserChart>false</IsUserChart>
                <TargetEntityType>${attr.entitylogicalname}</TargetEntityType>
                ${this.getViewId(model)}
                ${this.getViewIds(model)}
                <VisualizationId>${attr.visualizationid}</VisualizationId>
                <EnableChartPicker>${Helper.toTrueFalse(attr.chartpicker)}</EnableChartPicker>
                <EnableViewPicker>${Helper.toTrueFalse(attr.viewpicker)}</EnableViewPicker>
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
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.entitylogicalname?.toLowerCase()) || Helper.isEmpty(attr.viewids) || Helper.isEmpty(attr.visualizationid) || Helper.isEmpty(attr.rows) ? 'BackgroundRed' : '';
                    const visibleClass = attr.visible !== `1` ? `Visibled` : '';
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel ${errorClass} ${visibleClass}`);
                            comp.view.el.innerHTML = `${attr.label ?? ''} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            if (Number(attr.rows) > 10) {
                                comp.setClass(`DDBControlControl Row10`);
                            } else {
                                comp.setClass(`DDBControlControl Row${attr.rows}`);
                            }
                            comp.view.el.innerHTML = `CHART ${attr.entitylogicalname ?? ''} (${attr.rows} rows)`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

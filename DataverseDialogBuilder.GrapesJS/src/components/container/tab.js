import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'TabComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBTab')) {
                    return { type: 'TabComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Tab',
                    classes: ['DDBTab'],
                    copyable: false,
                    badgable: false,
                    highlightable: false,
                    hoverable: false,
                    draggable: '.DDBTabs',
                    droppable: '.DDBSections, .DDBTabHeader, .DDBTabFooter',
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
                            value: 'Tab'
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
                            visible: '1'
                        });
                    }
                    model.listenTo(model, 'change:attributes:logicalname', model.changedTab);
                    model.listenTo(model, 'change:attributes:visible', model.changedTab);
                },
                changedTab() {
                    this?.view?.render();
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();

                    const tabHeaderComponent = model.components().filter((comp) => comp.is('TabHeaderComponent'))[0];
                    let tabheader = '';
                    if (tabHeaderComponent) {
                       tabheader = tabHeaderComponent.toFormXml();
                    }
                    let sections = '';
                    const sectionsComponent = model.components().filter((comp) => comp.is('SectionsComponent'))[0];
                    if (sectionsComponent) {
                       sections = sectionsComponent.toFormXml();
                    }
                    let tabfooter = '';
                    const tabFooterComponent = model.components().filter((comp) => comp.is('TabFooterComponent'))[0];
                    if (tabFooterComponent) {
                        tabfooter = tabFooterComponent.toFormXml();
                    }
                    return `
<tab id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' name='${attr.logicalname}' visible='${Helper.toTrueFalse(attr.visible)}' expanded='true' verticallayout='true' locklevel='0' >
    <labels>
        <label description='' languagecode='${Helper.getLanguageCode(editor)}' />
    </labels>
    ${tabheader}
    ${sections}
    ${tabfooter}
</tab>
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const visibleClass = attr.visible !== '1' ? ' Visibled' : '';
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) ? 'BackgroundRed' : '';
                    model.setClass(`DDBTab ${errorClass}${visibleClass}`);
                    for (let i = 0; i < el.children.length; i++) {
                        if (el.children[i].tagName === 'LEGEND') {
                            el.children[i].innerHTML = `Tab ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                    }
                    return this;
                },
            },
        },
    };
};

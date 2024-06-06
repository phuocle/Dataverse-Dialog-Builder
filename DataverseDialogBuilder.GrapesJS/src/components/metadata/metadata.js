import Helper from '../../helper';
import * as Const from '../../const';
import * as Crm from '../../crm';

export default (editor, options) => {
    return {
        type: 'MetadataComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBMetadata')) {
                    return { type: 'MetadataComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Metadata',
                    classes: ['DDBMetadata'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    removable: false,
                    draggable: false,
                    droppable: '.DDBParameter, .DDBJavaScript, .DDBEvent, .DDBPcf',
                    traits: [
                        {
                            type: 'text-readonly',
                            name: 'type',
                            label: 'Type',
                            value: 'Metadata'
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
                            type: 'text-readonly',
                            name: 'languagecode',
                            label: 'Language Code (*)',
                        },
                        {
                            type: 'text-area',
                            name: 'description',
                            label: 'Description (*)',
                            rows: 3
                        },
                        {
                            type: 'text-area',
                            name: 'fulldescription',
                            label: 'Full Description',
                            rows: 5
                        },
                        {
                            type: 'select',
                            name: 'eventid',
                            label: 'On Load',
                        },
                    ],
                },
                async init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.languagecode)) {
                        const languagecode = await Crm.GetLanguageCode();
                        model.addAttributes({
                            languagecode: languagecode,
                        });
                    }
                    model.set('toolbar', [...model.get('toolbar'), { attributes: { class: Const.IconFindEvent }, command: Const.ToolbarFindEvent}]);
                    model.listenTo(model, 'change:attributes:languagecode', model.changedModel);
                    model.listenTo(model, 'change:attributes:logicalname', model.changedModel);
                    model.listenTo(model, 'change:attributes:description', model.changedModel);
                    model.listenTo(model, 'change:attributes:eventid', model.changedModel);
                    model?.view?.render();
                },
                changedModel() {
                    this?.view?.render();
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) || Helper.isEmpty(attr.languagecode) || Helper.isEmpty(attr.description) ? 'BackgroundRed' : ``;
                    el.firstChild.innerHTML = `Metadata ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                    model.setClass(`DDBMetadata ${errorClass}`);
                }
            }
        }
    };
};

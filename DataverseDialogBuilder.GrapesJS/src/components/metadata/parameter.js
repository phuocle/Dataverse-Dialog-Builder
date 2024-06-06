import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'ParameterComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBParameter')) {
                    return { type: 'ParameterComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Parameter',
                    classes: ['DDBParameter'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    draggable: '.DDBMetadata',
                    droppable: false,
                    traits: [
                        {
                            type: 'text-readonly',
                            name: 'type',
                            label: 'Type',
                            value: 'Parameter'
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
                            type: 'select',
                            name: 'parametertype',
                            label: 'Parameter Type (*)',
                            options: [
                                { id: 'SafeString', name: 'SafeString' },
                                { id: 'Boolean', name: 'Boolean' },
                                { id: 'Integer', name: 'Integer' },
                                { id: 'Object', name: 'Object' },
                                { id: 'UniqueId', name: 'UniqueId' },
                                { id: 'PositiveInteger', name: 'PositiveInteger' },
                                { id: 'DateTime', name: 'DateTime' },
                                { id: 'EntityType', name: 'EntityType' },
                            ],
                        },
                    ],
                },
                init() {
                    const model = this;
                    model.listenTo(model, 'change:attributes:logicalname', model.changedParameter);
                    model.listenTo(model, 'change:attributes:parametertype', model.changedParameter);
                },
                changedParameter(el) {
                    this?.view?.render();
                },
                toFormXml() {
                    const attr = this.getAttributes();
                    return `
<querystringparameter name='${attr.logicalname ?? '???'}' type='${attr.parametertype ?? '???'}' />
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.logicalname?.toLowerCase()) ? 'BackgroundRed' : ``;
                    model.setClass(`DDBParameter ${errorClass}`);
                    el.innerHTML = `<span class='Bold'>Parameter:</span> ${attr.parametertype ?? ``} ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                }
            }
        }
    };
};

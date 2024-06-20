import Helper from '../../helper';
export default (editor) => {
    return {
        type: 'UnknownComponent',
        methods: {
            isComponent: (el) => {
                if (el) {
                    if (el.classList) {
                        if (el && el.classList && el.classList.contains('DDBControlUnknown')) {
                            return { type: 'UnknownComponent' };
                        }
                        return false;
                    }
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Unknown',
                    classes: ['DDBControlUnknown'],

                    copyable: false,
                    badgable: false,
                    highlightable: false,
                    hoverable: false,
                    draggable: '.DDBSection',
                    droppable: false,
                    traits: [
                        {
                            type: 'text-readonly',
                            name: 'type',
                            label: 'Type',
                            value: 'Unknown'
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
                            name: 'row',
                            label: 'Row'
                        },
                        {
                            type: 'text-readonly',
                            name: 'control_description',
                            label: 'Control Description'
                        },
                    ],
                    toolbar: [],
                },
                init() {
                    this?.view?.render();
                },
                toFormXml() {
                    const attr = this.getAttributes();
                    return attr.row;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.view.el.innerHTML = `UNKNOWN ${Helper.ShowHideLogicalName(editor, attr.logicalname)}`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `UNKNOWN`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

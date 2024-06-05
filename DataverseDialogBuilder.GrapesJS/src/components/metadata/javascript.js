import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'JavaScriptComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBJavaScript')) {
                    return { type: 'JavaScriptComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'JavaScript',
                    classes: ['DDBJavaScript'],
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
                            value: 'JavaScript'
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
                    ],
                },
                init() {
                    this.listenTo(this, 'change:attributes:lib', this.changedJavaScript);
                    this.changedJavaScript();
                },
                changedJavaScript(el) {
                    const model = this;
                    const attr = model.getAttributes();
                    if (!Helper.isEmpty(attr.lib)) {
                        model.getTrait('button_lib').attributes.text = attr.lib;
                    }
                    model?.view?.render();
                },
                toFormXml() {
                    const attr = this.getAttributes();
                    return `
<internaljscriptfile src='$webresource:${attr.lib ?? '???'}' />
`;
                },
            },
            view: {
                onRender({ el, model }) {
                    const attr = model.getAttributes();
                    const errorClass = Helper.isEmpty(attr.lib?.toLowerCase()) ? 'BackgroundRed' : '';
                    model.setClass(`DDBJavaScript ${errorClass}`);
                    el.innerHTML = `<span class='Bold'>JavaScript:</span> ${attr.lib ?? ''}`;
                }
            }
        }
    };
};

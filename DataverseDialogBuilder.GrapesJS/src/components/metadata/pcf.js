import Helper from '../../helper';
import * as Const from '../../const';

//const { pd } = require('../../lib/pretty-data');

export default (editor, options) => {
    return {
        type: 'PcfComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBPcf')) {
                    return { type: 'PcfComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Pcf',
                    classes: ['DDBPcf'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    draggable: '.DDBMetadata',
                    droppable: false,
                    traits: [
                        {
                            type: 'text',
                            label: 'PCF',
                            name: 'pcf',
                            attributes: {
                                style: 'display:none;',
                            },
                        },
                        {
                            type: 'text',
                            name: 'controlid',
                            label: 'Control Id (*)',
                        },
                        {
                            type: 'button',
                            label: 'Properties',
                            text: 'Edit',
                            full: true,
                            command: (e) => {
                                const modal = e.Modal;

                                const pfx = e.getConfig('stylePrefix');
                                const codeViewer = e.CodeManager.getViewer('CodeMirror').clone();
                                const viewerEditor = codeViewer.editor;
                                const container = document.createElement('div');
                                const txtarea = document.createElement('textarea');
                                if (!viewerEditor) {
                                    container.id = 'container';
                                    const btnImp = document.createElement('button');
                                    btnImp.type = 'button';
                                    btnImp.innerHTML = 'OK';
                                    btnImp.className = `${pfx}btn-prim ${pfx}btn-import`;
                                    btnImp.style.marginTop = '10px';
                                    btnImp.style.minWidth = '100px';
                                    btnImp.onclick = (sender) => {
                                        let pcf = txtarea.value;
                                        pcf = pcf.trim();
                                        pcf = pd.xmlmin(pcf, false);
                                        const update = e.getSelected().getAttributes('pcf');
                                        update.pcf = pcf;
                                        e.getSelected().setAttributes(update);
                                        e.Modal.close();
                                    };
                                    txtarea.style.width = '815px';
                                    txtarea.style.height = '450px';
                                    txtarea.style.resize = 'none';
                                    txtarea.spellcheck = false;
                                    container.appendChild(txtarea);
                                    container.appendChild(btnImp);
                                }
                                modal.setTitle('!!! PCF !!!');
                                modal.setContent(container);
                                let { pcf } = e.getSelected().getAttributes('pcf');
                                if (pcf) {
                                    pcf = pcf.trim();
                                    const xml = pd.xml(pcf);
                                    txtarea.value = xml;
                                }
                                modal.getConfig().backdrop = false;
                                if (document.querySelector('.gjs-mdl-dialog')) {
                                    document.querySelector('.gjs-mdl-dialog').classList.remove('SmallDialog');
                                }
                                modal.open();
                            },
                        },
                    ],
                },
                init() {
                    const model = this;
                    const { pcf } = model.getAttributes('pcf');
                    if (pcf === undefined) {
                        model.addAttributes({
                            pcf: '',
                            controlid: '',
                        });
                    }
                    model.listenTo(model, 'change:attributes:controlid', model.changedPcf);
                },
                changedPcf(el) {
                    const model = this;
                    const controlid = model.getAttributes('controlid');
                    if (!Helper.isEmpty(controlid.controlid)) {
                        if (!Helper.isValidId(controlid.controlid)) {
                            Helper.msg(editor, Const.IdShouldValid, () => {
                                controlid.controlid = '';
                                model.setAttributes(controlid);
                            });
                        }
                    }
                    model?.view?.render();
                },
                getForControl(model) {
                    let value = '';
                    const { controlid } = model.getAttributes('controlid');
                    editor.getWrapper().onAll((comp) => {
                        if (Helper.isComponentSupportPCF(comp)) {
                            const { pcf } = comp.getAttributes('pcf');
                            if (pcf === controlid) {
                                const { uniqueid } = comp.getAttributes('uniqueid');
                                value = `${uniqueid}`;
                            }
                        }
                    });
                    return value;
                },
                toFormXml() {
                    const model = this;
                    const { pcf } = model.getAttributes('pcf');
                    return `
                        <controlDescription forControl="{${this.getForControl(model)}}">
                            ${pcf}
                        </controlDescription>
                        `;
                },
            },
            view: {
                onRender({ el, model }) {
                    const { controlid } = model.getAttributes('controlid');
                    const errorClass = Helper.isEmpty(controlid) ? 'BackgroundRed' : '';
                    model.setClass(`DDBPcf ${errorClass}`);
                    el.innerHTML = `<span class='Bold'>PCF:</span> ${controlid || '???'}`;
                },
            },
        },
    };
};

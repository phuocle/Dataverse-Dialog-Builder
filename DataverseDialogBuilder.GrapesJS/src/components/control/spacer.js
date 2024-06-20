import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
import * as GUID from '../../guid';
export default (editor, options) => {
    return {
        type: 'ControlSpacerComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBControlSpacer')) {
                    return { type: 'ControlSpacerComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Spacer',
                    classes: ['DDBControlSpacer'],
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
                            value: 'Spacer'
                        },
                    ],
                },
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase()
                        });
                    }
                },
                toFormXml() {
                    //const model = this;
                    //const attr = model.getAttributes();
                    //return `
                    //    <row>
                    //        <cell id='{${Helper.toGuidWithDefaultNewGuid(attr.id)}}' visible='true'>
                    //            <labels>
                    //                <label description='AAA' languagecode='${Helper.getLanguageCode(editor)}' />
                    //            </labels>
                    //            <control uniqueid='{00000000-0000-0000-0000-000000000001}' id='pl_test_test' classid='${GUID.PLACE_HOLDER_CONTROL}' isrequired='true' disabled='true' isunbound='true'>
                    //                <parameters>
                    //                    <MaxLength>4000</MaxLength>
                    //                    <Format>SingleLineOfText</Format>
                    //                </parameters>
                    //            </control>
                    //        </cell>
                    //    </row>
                    //    `;

                    return `<row />`;
                },
            },
            view: {
                onRender({ el, model }) {
                    model.onAll((comp) => {
                        if (comp.view.el.classList.contains('DDBControlLabel')) {
                            comp.setClass(`DDBControlLabel`);
                            comp.view.el.innerHTML = `SPACER`;
                        }
                        if (comp.view.el.classList.contains('DDBControlControl')) {
                            comp.view.el.innerHTML = `SPACER`;
                        }
                    });
                    return this;
                },
            },
        },
    };
};

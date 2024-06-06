import { v4 as uuidv4 } from 'uuid';
import * as Const from '../../const';
import Helper from '../../helper';

export default (editor, options) => {
    return {
        type: 'TabFooterComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBTabFooter')) {
                    return { type: 'TabFooterComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'TabFooter',
                    classes: ['DDBTabFooter'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    draggable: '.DDBTab',
                    droppable: '.DDBButton',
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
                            value: 'TabFooter'
                        },
                    ],
                },
                init() {
                    const model = this;
                    const attr = model.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        model.addAttributes({
                            id: uuidv4().toUpperCase(),
                        });
                    }
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    let formXml = ``;
                    model.components().map((comp) => {
                        if (!comp.is('HiddenComponent')) {
                            formXml += comp.toFormXml();
                        }
                    });
                    return `
<tabfooter id='{${attr.id}}'>
    <rows>
        <row>
            ${formXml}
        </row>
    </rows>
</tabfooter>
`;
                },
            }
        },
    };
};

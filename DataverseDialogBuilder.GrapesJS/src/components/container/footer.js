import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'FooterComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBFooter')) {
                    return { type: 'FooterComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Footer',
                    classes: ['DDBFooter'],
                    copyable: false,
                    badgable: false,
                    removable: true,
                    hoverable: false,
                    draggable: true,
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
                            value: 'Footer'
                        }
                    ]
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
                },
                toFormXml() {
                    const model = this;
                    const attr = model.getAttributes();
                    let formXml = '';
                    model.components().map((comp) => {
                        if (!comp.is('HiddenComponent')) {
                            formXml += comp.toFormXml();
                        }
                    });
                    return `
<footer id='{${attr.id}}'>
    <rows>
        <row>
            ${formXml}
        </row>
    </rows>
</footer>
`;
                }
            }
        }
    };
};

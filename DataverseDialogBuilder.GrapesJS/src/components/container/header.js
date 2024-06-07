import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'HeaderComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBHeader')) {
                    return { type: 'HeaderComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Header',
                    classes: ['DDBHeader'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    removable: true,
                    draggable: true,
                    droppable: '.DDBLabel',
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
                            value: 'Header'
                        },
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
<header id='{${attr.id}}'>
    <rows>
        ${formXml}
    </rows>
</header>
`;
                }
            }
        }
    };
};

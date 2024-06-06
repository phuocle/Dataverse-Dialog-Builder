import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';

export default (editor, options) => {
    return {
        type: 'TabHeaderComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBTabHeader')) {
                    return { type: 'TabHeaderComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'TabHeader',
                    classes: ['DDBTabHeader'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    draggable: '.DDBTab',
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
                            value: 'TabHeader'
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
<tabheader id='{${attr.id}}'>
    <rows>
        ${formXml}
    </rows>
</tabheader>
`;
                },
            }
        },
    };
};

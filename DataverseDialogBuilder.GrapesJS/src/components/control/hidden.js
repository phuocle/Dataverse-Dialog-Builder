import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helper';
import * as Const from '../../const';
export default (editor) => {
    return {
        type: 'HiddenComponent',
        methods: {
            isComponent: (el) => {
                if (el) {
                    if (el.classList) {
                        if (el.classList.contains('DDBControlLabel') || el.classList.contains('DDBControlControl')) {
                            return { type: 'HiddenComponent' };
                        }
                    }
                    if (el.tagName === 'legend'.toUpperCase()) {
                        return { type: 'HiddenComponent' };
                    }
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Hidden',
                    classes: [],
                    draggable: false,
                    droppable: false,
                    badgable: false,
                    layerable: false,
                    selectable: false,
                    hoverable: false,
                    highlightable: false,
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
                            value: 'Hidden'
                        },
                    ],
                    toolbar: [],
                },
                init() {
                    const attr = this.getAttributes();
                    if (Helper.isEmpty(attr.id)) {
                        this.addAttributes({
                            id: uuidv4().toUpperCase(),
                            uniqueid: uuidv4().toUpperCase(),
                        });
                    }
                },
            },
            view: {},
        },
    };
};

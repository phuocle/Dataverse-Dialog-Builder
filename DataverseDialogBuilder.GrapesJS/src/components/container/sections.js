export default (editor, options) => {
    return {
        type: 'SectionsComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBSections')) {
                    return { type: 'SectionsComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Sections',
                    classes: ['DDBSections'],
                    copyable: false,
                    badgable: false,
                    highlightable: false,
                    hoverable: false,
                    selectable: true,
                    draggable: '.DDBTab',
                    droppable: '.DDBSection',
                    traits: [
                        {
                            type: 'text-readonly',
                            name: 'type',
                            label: 'Type',
                            value: 'Sections'
                        },
                    ],
                },
                init() {
                },
                toFormXml() {
                    const model = this;
                    let formXml = '';
                    model.components().map((comp) => {
                        if (!comp.is('HiddenComponent')) {
                            formXml += comp.toFormXml();
                        }
                    });
                    return `
<columns>${formXml}</columns>
`;
                },
            },
            view: {},
        },
    };
};

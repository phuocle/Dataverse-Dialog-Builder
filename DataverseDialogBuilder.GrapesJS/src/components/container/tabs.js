export default (editor, options) => {
    return {
        type: 'TabsComponent',
        methods: {
            isComponent: (el) => {
                if (el && el.classList && el.classList.contains('DDBTabs')) {
                    return { type: 'TabsComponent' };
                }
                return false;
            },
            model: {
                defaults: {
                    name: 'Tabs',
                    classes: ['DDBTabs'],
                    copyable: false,
                    badgable: false,
                    hoverable: false,
                    removable: false,

                    draggable: false,
                    droppable: '.DDBTab',
                    traits: [
                        {
                            type: 'text-readonly',
                            name: 'type',
                            label: 'Type',
                            value: 'Tabs'
                        },
                    ],
                },
                init() {
                },
                toFormXml() {
                    let formXml = '';
                    this.components().map((comp) => {
                        if (!comp.is('HiddenComponent')) {
                            formXml += comp.toFormXml();
                        }
                    });
                    return `
<tabs>${formXml}</tabs>
`;
                },
            },
            view: {},
        },
    };
};

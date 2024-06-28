export default (editor, opts = {}) => {
    const blockManager = editor.BlockManager;

    blockManager.add('block_parameter', {
        label: 'Parameter',
        category: '01. Metadata',
        attributes: { class: 'fa fa-question' },
        content: `<div class='DDBParameter'></div>`
    });
    blockManager.add('block_event', {
        label: 'Event',
        category: '01. Metadata',
        attributes: { class: 'fa fa-bolt' },
        content: `<div class='DDBEvent'></div>`
    });
    blockManager.add('block_javascript', {
        label: 'JavaScript',
        category: '01. Metadata',
        attributes: { class: 'fa fa-code' },
        content: `<div class='DDBJavaScript'></div>`
    });
    blockManager.add('block_tab', {
        label: 'Tab',
        category: '02. Container',
        attributes: { class: 'fa fa-folder-o' },
        content: `<fieldset class="DDBTab"><legend>Tab</legend><fieldset class="DDBSections"><legend>Sections</legend><fieldset class="DDBSection"><legend></legend></fieldset></fieldset></fieldset>`
    });
    blockManager.add('block_section', {
        label: 'Section',
        category: '02. Container',
        attributes: { class: 'fa fa-columns' },
        content: `<fieldset class='DDBSection'><legend></legend></fieldset>`
    });
     blockManager.add('block_header', {
       label: 'Header',
       category: '02. Container',
       attributes: { class: 'fa fa-superscript' },
       content: `<fieldset class='DDBHeader'><legend>Header</legend></fieldset>`
     });
    blockManager.add('block_tabheader', {
        label: 'Tab Header',
        category: '02. Container',
        attributes: { class: 'fa fa-superscript' },
        content: `<fieldset class='DDBTabHeader'><legend>Tab Header</legend></fieldset>`
    });
    blockManager.add('block_footer', {
        label: 'Footer',
        category: '02. Container',
        attributes: { class: 'fa fa-subscript' },
        content: `<fieldset class='DDBFooter'><legend>Footer</legend></fieldset>`
    });
    blockManager.add('block_tabfooter', {
        label: 'Tab Footer',
        category: '02. Container',
        attributes: { class: 'fa fa-subscript' },
        content: `<fieldset class='DDBTabFooter'><legend>Tab Footer</legend></fieldset>`
    });
    blockManager.add('block_label', {
        label: 'Label',
        category: '03. Control',
        attributes: { class: 'fa fa-font' },
        content: `<div class='DDBLabel'></div>`
    });
    blockManager.add('block_button', {
        label: 'Button',
        category: '03. Control',
        attributes: { class: 'fa fa-square-o' },
        content: `<div class='DDBButton'></div>`
    });
    blockManager.add('block_textbox', {
        label: 'TextBox',
        category: '03. Control',
        attributes: { class: 'fa fa-pencil-square-o' },
        content: `<div class='DDBControlTextBox'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_textarea', {
        label: 'TextArea',
        category: '03. Control',
        attributes: { class: 'fa fa-sticky-note-o' },
        content: `<div class='DDBControlTextArea'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_rich_text_box', {
        label: 'RichTextBox',
        category: '03. Control',
        attributes: { class: 'fa fa-paragraph' },
        content: `<div class='DDBControlRichTextBox'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_datetime', {
        label: 'DateTime',
        category: '03. Control',
        attributes: { class: 'fa fa-calendar' },
        content: `<div class='DDBControlDateTime'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });

    blockManager.add('block_number', {
        label: 'Number',
        category: '03. Control',
        attributes: { class: 'fa fa-usd' },
        content: `<div class='DDBControlNumber'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_lookup', {
        label: 'Lookup',
        category: '03. Control',
        attributes: { class: 'fa fa-caret-square-o-down' },
        content: `<div class='DDBControlLookup'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_regarding', {
        label: 'Regarding',
        category: '03. Control',
        attributes: { class: 'fa fa-caret-square-o-down' },
        content: `<div class='DDBControlRegarding'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_multiselect_lookup', {
        label: 'Multiselect Lookup',
        category: '03. Control',
        attributes: { class: 'fa fa-caret-square-o-down' },
        content: `<div class='DDBControlMultiselectLookup'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_iframe', {
        label: 'Iframe',
        category: '03. Control',
        attributes: { class: 'fa fa-picture-o' },
        content: `<div class='DDBControlIframe'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_dropdown', {
        label: 'Dropdown',
        category: '03. Control',
        attributes: { class: 'fa fa-caret-square-o-down' },
        content: `<div class='DDBControlDropDown'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_optionset', {
        label: 'OptionSet',
        category: '03. Control',
        attributes: { class: 'fa fa-caret-square-o-down' },
        content: `<div class='DDBControlOptionSet'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_entity_optionset', {
        label: 'Entity OptionSet',
        category: '03. Control',
        attributes: { class: 'fa fa-caret-square-o-down' },
        content: `<div class='DDBControlEntityOptionSet'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_twooptions', {
        label: 'Two Options',
        category: '03. Control',
        attributes: { class: 'fa fa-check-square-o' },
        content: `<div class='DDBControlTwoOptions'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_subgrid', {
        label: 'Subgrid',
        category: '03. Control',
        attributes: { class: 'fa fa-table' },
        content: `<div class='DDBControlSubgrid'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_chart', {
        label: 'Chart',
        category: '03. Control',
        attributes: { class: 'fa fa-bar-chart' },
        content: `<div class='DDBControlChart'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_advfind', {
        label: 'Advanced Find',
        category: '03. Control',
        attributes: { class: 'fa fa-search' },
        content: `<div class='DDBControlAdvFind'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_advfind_result', {
        label: 'Advanced Find Result',
        category: '03. Control',
        attributes: { class: 'fa fa-search' },
        content: `<div class='DDBControlAdvFindResult'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_advfind_and_result', {
        label: 'Advanced Find And Result',
        category: '03. Control',
        attributes: { class: 'fa fa-search' },
        content: `<div class='DDBControlAdvFindAndResult'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
    blockManager.add('block_upload', {
        label: 'Upload',
        category: '03. Control',
        attributes: { class: 'fa fa-upload' },
        content: `<div class='DDBControlUpload'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`
    });
}
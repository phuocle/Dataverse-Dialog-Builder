export default (editor, opts = {}) => {
    const panels = editor.Panels;
    const iconStyle = 'style="display: block; max-width:22px"';
    editor.Panels.addPanel({ id: 'options_left', visible: true });
    panels.addButton('options_left', {
        id: 'button_new', className: 'fa fa-file-o', attributes: { title: 'New' }, active: false, command: 'command_new'
    });
    panels.addButton('options_left', {
        id: 'button_open', className: 'fa fa-folder-open-o', attributes: { title: 'Open' }, active: false, command: 'command_open'
    });
    panels.addButton('options_left', {
        id: 'button_demo', className: 'fa fa-id-card-o ', attributes: { title: 'Demo' }, active: false, command: 'command_demo'
    });
    panels.addButton('options', {
        id: 'button_save_publish', className: 'fa fa-floppy-o', attributes: { title: 'Save & Publish' }, active: false, command: 'command_save_publish'
    });
    panels.addButton('options', {
        id: 'button_preview', className: 'fa fa-play', attributes: { title: 'Preview' }, active: false, command: 'command_preview'
    });
    panels.addButton('options', {
        id: 'button_logicalname', className: 'fa fa-hashtag', attributes: { title: 'Show/Hide LogicalName' }, active: false, command: 'command_logicalname'
    });
    panels.addButton('options', {
        id: 'button_code', className: 'fa fa-code', attributes: { title: 'Code' }, active: false, command: 'command_code'
    });
    panels.addButton('options', {
        id: 'button_about', className: 'fa fa-copyright', attributes: { title: 'About' }, active: false, command: 'command_about'
    });
    panels.addButton('options', {
        id: 'button_github', className: 'fa fa-github', attributes: { title: 'Github' }, active: false, command: 'command_github'
    });
    panels.removeButton('views', 'open-sm');
    panels.removeButton('views', 'open-tm');
    panels.removeButton('views', 'open-layers');
    panels.removeButton('options', 'sw-visibility');
    panels.removeButton('options', 'fullscreen');
    panels.removeButton('options', 'preview');
    panels.removeButton('options', 'export-template');
  }

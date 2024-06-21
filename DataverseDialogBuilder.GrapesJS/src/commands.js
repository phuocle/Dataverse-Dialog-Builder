import Helper from './helper';
import * as Const from './const';
import xmlFormat from 'xml-formatter';
import * as Crm from './crm';
import * as GUID from './guid';
import * as ControlName from './controlname';

export default (editor, opts = {}) => {
    const commands = editor.Commands;

    const commandCode = (editor, opts) => {
        function getCodeContainer() {
            let containerEl = document.createElement('div');
            containerEl.style.display = 'flex';
            containerEl.style.justifyContent = 'space-between';
            return containerEl;
        }
        function createCodeEditor(label, code) {
            code = xmlFormat(code, { collapseContent: true });
            const el = document.createElement('div');
            const elLabel = document.createElement('div');
            const txtarea = document.createElement('textarea');
            txtarea.style.width = '100%';
            txtarea.style.height = '450px';
            txtarea.style.resize = 'none';
            txtarea.style.whiteSpace = "nowrap";
            txtarea.style.overflowX = "scroll";
            txtarea.style.overflowY = "scroll";
            txtarea.style.textWrap = "nowrap";
            txtarea.spellcheck = false;
            txtarea.value = code;
            elLabel.innerHTML = label;
            el.style.flex = '1 0 auto';
            el.style.padding = '5px';
            el.style.maxWidth = '50%';
            el.style.boxSizing = 'border-box';
            el.appendChild(elLabel);
            el.appendChild(txtarea);
            return { el };
        }

        return {
            run(editor, sender) {
                const container = getCodeContainer();
                const formhtml = editor.getHtml();
                const formxml = Helper.GetFormXml(editor);
                const codeHTML = createCodeEditor('HTML', formhtml);
                container.appendChild(codeHTML.el);
                const codeXML = createCodeEditor('XML', formxml);
                container.appendChild(codeXML.el);
                editor.Modal
                    .open({
                        title: 'CODE',
                        content: container
                    })
                    .onceClose(() => {
                        sender.set && sender.set('active', false);
                        editor.stopCommand('command_code')
                    })
            },
            stop(editor, sender) {
                editor.Modal.close();
            },
        };
    }
    commands.add('command_code', commandCode(editor, opts));

    const commandAbout = (editor, opts) => {
        const modal = editor.Modal;
        const container = `
		<div>
			<ul>
            <li><strong>PhuocLe</strong> has <a href='https://www.youracclaim.com/badges/a61f667f-0f9d-44be-b13d-00e952fa1480' target="_blank">Microsoft Dynamics 365 MCSE</a>, he working at <a href="http://apac.hitachi-solutions.com/">Hitachi Solutions Asia Pacific</a> and living in Vietnam.</li>
            <li>More than 15 years maintain and develop Dynamics 365 (focusing on CRM related modules), from version 4 up to now.</li>
            <li>A lot of experienced working with Dynamics 365 like: develop, code and debug from server side (Plugins, Custom Workflows, Custom Actions) to client side (JavaScript, TypeScript), and experienced integrate with others system using SOAP and/or Web API.</li>
            <li>Experienced working with Dynamics 365 Portals, Field Service, Project Service Automation, Unified Service Desk.</li>
            <li>For ERP related, experienced with integration between Dynamics CRM with Dynamics AX 2012, Dynamics 365 Operations, focusing on data integration of accounts related, invoice related, sales order related.</li>
            <li>Familiar and experienced with various business domains such as food and beverage, information technology, plastic and eCommerce</li>
            <li>Released a commercial CRM add-on to AppSource: <a target="_blank" href='https://appsource.microsoft.com/en-us/product/dynamics-365/phuocle.d365-icons-and-tooltips'>Icons and Tooltips with D365</a> - Allow you customize Icons and Tooltips without help from your developer.</li>
            <li>Released <a target="_blank" href='https://github.com/phuocle/Dynamics-Crm-DevKit'>DynamicsCrm.DevKit</a> - a Visual Studio extensions - that help CRM developer can easy develop.</li>
            <li>Released <a target="_blank" href='https://github.com/phuocle/View-FetchXML'>View-FetchXML</a> - a small tool that help CRM developer easy copy/paste FetchXml code.</li>
            <li>Released <a target="_blank" href='https://github.com/phuocle/Dataverse-Dialog-Builder'>Dataverse Dialog Builder</a> - A WYSIWYG tool to create crm form dialog quickly.</li>
			</ul>
		</div>`;

        return {
            run(editor, sender) {
                modal.getConfig().backdrop = false;
                modal.setTitle('About');
                modal.setContent(container);
                modal.open().getModel().once('change:open', () => {
                    editor.stopCommand(this.id);
                });
            },
            stop(editor, sender) {
                editor.Panels.getButton('options', 'button_about').active = false;
            }
        }
    }
    commands.add('command_about', commandAbout(editor, opts));

    const commandGithub = (editor, opts) => {
        return {
            run(editor, sender) {
                editor.Panels.getButton('options', 'button_github').set('active', 0);
                window.open('https://github.com/phuocle/Dataverse-Dialog-Builder');
                setTimeout(() => { editor.stopCommand('command_github'); }, 1);
            },
            stop(editor, sender) {
                editor.Panels.getButton('options', 'button_github').set('active', 0);
            },
        };
    }
    commands.add('command_github', commandGithub(editor, opts));

    const commandNew = (editor, opts) => {
        return {
            async run(editor, sender) {
                setTimeout(() => { editor.stopCommand('command_new'); }, 1);
                try {
                    var result = await Crm.ShowConfirm("Are you sure to clear the canvas?");
                    if (result.confirmed) {
                        editor.runCommand('core:canvas-clear');
                        editor.addComponents(Const.NewDDB);
                    }
                }
                catch {
                    editor.runCommand('core:canvas-clear');
                    editor.addComponents(Const.NewDDB);
                }
            },
            stop(editor, sender) {
                editor.Panels.getButton('options_left', 'button_new').active = false;
            }
        }
    }
    commands.add('command_new', commandNew(editor, opts));

    const commandOpen = (editor, opts) => {
        return {
            async run(editor, sender) {
                async function loadForm(output) {
                    const xml2js = require('xml2js');
                    const parser = new xml2js.Parser({
                        explicitArray: false,
                        trim: true,
                        normalizeTags: true,
                    });
                    parser.parseStringPromise(output.formxml).then(async (result) => {
                        const { clientresources, controldescriptions, events, formparameters, header, tabs, footer } = result.form;
                        const getControlName = ((row) => {
                            let controlName = '';
                            (controldescriptions?.controldescription?.length ? [...controldescriptions?.controldescription] : [controldescriptions?.controldescription]).filter((controldescription) => {
                                if (Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid).toLowerCase() === Helper.cleanGUIDWithDefaultNewGuid(controldescription?.$?.forControl).toLowerCase()) {
                                    controlName = controldescription?.customcontrol[0]?.$?.name;
                                    return;
                                }
                            });
                            return controlName;
                        });
                        const getCustomControl = ((row) => {
                            let customControl = '';
                            (controldescriptions?.controldescription?.length ? [...controldescriptions?.controldescription] : [controldescriptions?.controldescription]).filter((controldescription) => {
                                if (Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid).toLowerCase() === Helper.cleanGUIDWithDefaultNewGuid(controldescription?.$?.forControl).toLowerCase()) {
                                    customControl = controldescription?.customcontrol[0];
                                    return;
                                }
                            });
                            return customControl;
                        });
                        const getControlDescription = ((row) => {
                            let value = '';
                            (controldescriptions?.controldescription?.length ? [...controldescriptions?.controldescription] : [controldescriptions?.controldescription]).filter((controldescription) => {
                                if (Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid).toLowerCase() === Helper.cleanGUIDWithDefaultNewGuid(controldescription?.$?.forControl).toLowerCase()) {
                                    value = controldescription;
                                    return;
                                }
                            });
                            return value;
                        });
                        const addLabel = ((container, row) => {
                            const label_c = container.append(block_label)[0];
                            label_c.setAttributes({
                                ...label_c.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                rows: Helper.toNumberWithDefault(row?.cell?.$?.rowspan, 1),
                                istitle: Helper.to01WithDefault(row?.cell?.control?.parameters?.istitle, false),
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addButton = ((container, cell, event) => {
                            const button_c = container.append(block_button)[0];
                            button_c.setAttributes({
                                ...button_c.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(cell?.labels?.label?.$?.description, '')}`,
                                disabled: `${Helper.to01WithDefault(cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(cell?.$?.visible, '1')}`,
                                eventid: `${Helper.cleanGUIDWithDefaultNewGuid(event?.handlers?.handler?.$?.handlerUniqueId)}`
                            });
                        });
                        const addEvent = ((container, event) => {
                            const event_c = container.append(block_event)[0];
                            const handlers = event?.handlers ?? event?.internalhandlers;
                            event_c.setAttributes({
                                ...event_c.getAttributes(),
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(handlers?.handler?.$?.handlerUniqueId)}`,
                                eventtype: `${Helper.toStringWithDefault(event?.$?.name?.toLowerCase())}`,
                                lib: `${Helper.toStringWithDefault(handlers?.handler?.$?.libraryName?.startsWith('$webresource:') ? handlers?.handler?.$?.libraryName?.substring(13) : handlers?.handler?.$?.libraryName, '')}`,
                                func: `${Helper.toStringWithDefault(handlers?.handler?.$?.functionName, '')}`,
                                context: `${Helper.to01WithDefault(handlers?.handler?.$?.passExecutionContext, '1')}`,
                                parameters: `${Helper.toStringWithDefault(handlers?.handler?.$?.parameters, '')}`
                            });
                        });
                        const addParameter = ((container, parameter) => {
                            const parameter_c = container.append(block_parameter)[0];
                            parameter_c.setAttributes({
                                ...parameter_c.getAttributes(),
                                logicalname: `${Helper.toStringWithDefault(parameter?.$?.name, '')}`,
                                parametertype: `${Helper.toStringWithDefault(parameter?.$?.type, 'SafeString')}`
                            });
                        });
                        const addJavascript = ((container, javascript) => {
                            const javascript_c = container.append(block_javascript)[0];
                            javascript_c.setAttributes({
                                ...javascript_c.getAttributes(),
                                lib: `${Helper.toStringWithDefault(javascript?.$?.src?.substring(13), '')}`
                            });
                        });
                        const addSection = ((container, section) => {
                            const section_c = container.append(block_section)[0];
                            section_c.setAttributes({
                                ...section_c.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(section?.$?.id)}`,
                                logicalname: `${Helper.toStringWithDefault(section?.$?.name, '')}`,
                                label: `${Helper.toStringWithDefault(section?.labels?.label?.$?.description, '')}`,
                                labelwidth: `${Helper.toNumberWithDefault(section?.$?.labelwidth, 115)}`,
                                alignment: `${Helper.toStringWithDefault(section?.$?.celllabelalignment, 'Left')}`,
                                position: `${Helper.toStringWithDefault(section?.$?.celllabelposition, 'Left')}`,
                                visible: `${Helper.to01WithDefault(section?.$?.visible, '1')}`
                            });
                            return section_c;
                        });
                        const addTab = ((container, tab) => {
                            const tab_c = container.append(block_tab)[0];
                            tab_c.setAttributes({
                                ...tab_c.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(tab?.$?.id)}`,
                                logicalname: `${Helper.toStringWithDefault(tab?.$?.name, '')}`
                            });
                            return tab_c;
                        });
                        const addTabHeader = ((container, tab) => {
                            const tabheader_c = container.append(block_tabheader, { at: 0 })[0];
                            tabheader_c.setAttributes({
                                ...tabheader_c.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(tab?.tabheader?.$?.id)}`
                            });
                            return tabheader_c;
                        });
                        const addTabFooter = ((container, tab) => {
                            const tabfooter_c = container.append(block_tabfooter)[0];
                            tabfooter_c.setAttributes({
                                ...tabfooter_c.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(tab?.tabfooter?.$?.id)}`
                            });
                            return tabfooter_c;
                        });
                        const addTextBox = ((container, row) => {
                            const getTextBoxType = ((classid) => {
                                switch (classid.toLowerCase()) {
                                    case GUID.SLT_TEXT.toLowerCase():
                                        if (ControlName.MscrmControls_FieldControls_PhoneNumberControl === getControlName(row)) return 'Phone';
                                        return 'Text';
                                    case GUID.SLT_EMAIL.toLowerCase(): return 'Email';
                                    case GUID.SLT_URL.toLowerCase(): return 'URL';
                                    case GUID.SLT_TICKER_SYMBOL.toLowerCase(): return 'Ticker Symbol';
                                }
                                return null;
                            });
                            const textbox = container.append(block_textbox)[0];
                            textbox.setAttributes({
                                ...textbox.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                textboxtype: `${Helper.toStringWithDefault(getTextBoxType(row?.cell?.control?.$?.classid), '')}`,
                                maxlength: `${Helper.toNumberWithDefault(row?.cell?.control?.parameters?.maxlength, 100)}`,
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addTextArea = ((contain, row) => {
                            const textarea = contain.append(block_textarea)[0];
                            textarea.setAttributes({
                                ...textarea.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                maxlength: `${Helper.toNumberWithDefault(row?.cell?.control?.parameters?.maxlength, 100)}`,
                                rows: Helper.toNumberWithDefault(row?.cell?.$?.rowspan, 1),
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addDateTime = ((container, row) => {
                            const getDateTimeType = (() => {
                                if (row?.cell?.control?.parameters?.format === 'Date') return 'Date';
                                if (ControlName.MscrmControls_FieldControls_TimeControl === getControlName(row)) return 'Time'
                                return 'DateAndTime'
                            });
                            const datetime = container.append(block_datetime)[0];
                            datetime.setAttributes({
                                ...datetime.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                datetimetype: getDateTimeType(),
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addNumber = ((container, row) => {
                            const getNumberType = ((classid) => {
                                switch (classid.toLowerCase()) {
                                    case GUID.NUMBER_CURRENCY.toLowerCase(): return 'Currency';
                                    case GUID.NUMBER_DECIMAL_NUMBER.toLowerCase(): return 'DecimalNumber';
                                    case GUID.NUMBER_FLOATING_POINT_NUMBER.toLowerCase(): return 'FloatingPointNumber';
                                    case GUID.NUMBER_WHOLE_NUMBER.toLowerCase(): return 'WholeNumber';
                                }
                                return null;
                            });
                            const number = container.append(block_number)[0];
                            number.setAttributes({
                                ...number.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                numbertype: `${Helper.toStringWithDefault(getNumberType(row?.cell?.control?.$?.classid), '')}`,
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                                minvalue: Helper.toNumberWithDefault(row?.cell?.control?.parameters?.minvalue, 0),
                                maxvalue: Helper.toNumberWithDefault(row?.cell?.control?.parameters?.maxvalue, 0),
                                precision: Helper.toNumberWithDefault(row?.cell?.control?.parameters?.precision, 0),
                            });
                        });
                        const addLookup = ((container, row) => {
                            const lookup = container.append(block_lookup)[0];
                            const views = row?.cell?.control?.parameters?.targetentities.targetentity.length ? [...row?.cell?.control?.parameters?.targetentities.targetentity] : [row?.cell?.control?.parameters?.targetentities.targetentity];
                            lookup.setAttributes({
                                ...lookup.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                entitylogicalname01: `${Helper.toStringWithDefault(views[0]?.entitylogicalname, '')}`,
                                entitylogicalname02: `${Helper.toStringWithDefault(views[1]?.entitylogicalname, '')}`,
                                entitylogicalname03: `${Helper.toStringWithDefault(views[2]?.entitylogicalname, '')}`,
                                entitylogicalname04: `${Helper.toStringWithDefault(views[3]?.entitylogicalname, '')}`,
                                entitylogicalname05: `${Helper.toStringWithDefault(views[4]?.entitylogicalname, '')}`,
                                viewid01: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.availableviewids, '')}`,
                                viewid02: `${Helper.toStringWithDefault(views[1]?.defaultviewid, '')}`,
                                viewid03: `${Helper.toStringWithDefault(views[2]?.defaultviewid, '')}`,
                                viewid04: `${Helper.toStringWithDefault(views[3]?.defaultviewid, '')}`,
                                viewid05: `${Helper.toStringWithDefault(views[4]?.defaultviewid, '')}`,
                                disableviewpicker: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.disableviewpicker, 0)}`,
                                disablequickfind: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.disablequickfind, 0)}`,
                                disablemru: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.disablemru, 0)}`,
                                autoresolve: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.autoresolve, 0)}`,
                                usemainformdialogforcreate: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.usemainformdialogforcreate, 0)}`,
                                usemainformdialogforedit: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.usemainformdialogforedit, 0)}`,
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                            });
                        });
                        const addRegarding = ((container, row) => {
                            const regarding = container.append(block_regarding)[0];
                            regarding.setAttributes({
                                ...regarding.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                            });
                        });
                        const addIframe = ((container, row) => {
                            const iframe = container.append(block_iframe)[0];
                            iframe.setAttributes({
                                ...iframe.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                url: `${row?.cell?.control?.parameters?.url}`,
                                parameters: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.passparameters, 0)}`,
                                security: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.security, 0)}`,
                                scrolling: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.scrolling, 0)}`,
                                border: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.border, 0)}`,
                                mobile: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.showonmobileclient, 0)}`,
                                rows: Helper.toNumberWithDefault(row?.cell?.$?.rowspan, 1),
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addDropdown = ((container, row) => {
                            const getDropdownType = ((classid) => {
                                switch (classid.toLowerCase()) {
                                    case GUID.DROPDOWN_DURATION.toLowerCase(): return 'Duration';
                                    case GUID.DROPDOWN_LANGUAGE.toLowerCase(): return 'Language';
                                    case GUID.DROPDOWN_TIMEZONE.toLowerCase(): return 'TimeZone';
                                }
                                return null;
                            });
                            const dropdown = container.append(block_dropdown)[0];
                            dropdown.setAttributes({
                                ...dropdown.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                dropdowntype: `${Helper.toStringWithDefault(getDropdownType(row?.cell?.control?.$?.classid), '')}`,
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addOptionSet = (async (container, row) => {
                            const getOptionSetType = ((classid) => {
                                switch (classid.toLowerCase()) {
                                    case GUID.OPTIONSET_MULTISELECT_OPTIONSET.toLowerCase(): return 'MultiSelect OptionSet';
                                    case GUID.OPTIONSET_OPTIONSET.toLowerCase(): return 'OptionSet';
                                }
                                return null;
                            });
                            const optionset = container.append(block_optionset)[0];
                            if (row?.cell?.control?.parameters?.optionsetid === GUID.EMPTY) {
                                optionset.setAttributes({
                                    ...optionset.getAttributes(),
                                    id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                    uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                    logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                    label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                    optionsettype: `${Helper.toStringWithDefault(getOptionSetType(row?.cell?.control?.$?.classid), '')}`,
                                    dynamic: '1',
                                    required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                    disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                    visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,

                                });
                            }
                            else {
                                const logicalType = await Crm.IsGlobalOptionSet(row?.cell?.control?.parameters?.optionsetname) ? '0' : '1';
                                if (logicalType === '0') {
                                    optionset.setAttributes({
                                        ...optionset.getAttributes(),
                                        id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                        uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                        logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                        label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                        optionsettype: `${Helper.toStringWithDefault(getOptionSetType(row?.cell?.control?.$?.classid), '')}`,
                                        dynamic: '0',
                                        logicaltype: '0',
                                        optionsetname: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.optionsetname, '-1')}`,
                                        default: `${Helper.toNumberWithDefault(row?.cell?.control?.parameters?.defaultvalue, -1)}`,
                                        required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                        disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                        visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                                    });
                                }
                                else {
                                    const data = await Crm.ParseLocalOptionSet(row?.cell?.control?.parameters?.optionsetname);
                                    optionset.setAttributes({
                                        ...optionset.getAttributes(),
                                        id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                        uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                        logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                        label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                        optionsettype: `${Helper.toStringWithDefault(getOptionSetType(row?.cell?.control?.$?.classid), '')}`,
                                        dynamic: '0',
                                        logicaltype: '1',
                                        entitylogicalname01: `${Helper.toStringWithDefault(data?.entity_logical_name, '')}`,
                                        optionsetname: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.optionsetname, '-1')}`,
                                        default: `${Helper.toNumberWithDefault(row?.cell?.control?.parameters?.defaultvalue, -1)}`,
                                        required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                        disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                        visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                                    });
                                }
                            }
                        });
                        const addTwoOptions = (async (container, row) => {
                            const getTwoOptionsType = ((classid) => {
                                switch (classid.toLowerCase()) {
                                    case GUID.TWOOPTIONS_CHECKBOX.toLowerCase():
                                        if (ControlName.MscrmControls_FieldControls_ToggleControl === getControlName(row)) return 'Toggle';
                                        return 'Checkbox';
                                    case GUID.TWOOPTIONS_DROPDOWN.toLowerCase(): return 'Dropdown';
                                }
                                return null;
                            });
                            const twooptions = container.append(block_twooptions)[0];
                            const data = await Crm.ParseLocalOptionSet(row?.cell?.control?.parameters?.optionsetname);
                            twooptions.setAttributes({
                                ...twooptions.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                twooptionstype: `${Helper.toStringWithDefault(getTwoOptionsType(row?.cell?.control?.$?.classid), '')}`,
                                entitylogicalname01: `${Helper.toStringWithDefault(data?.entity_logical_name, '')}`,
                                optionsetname: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.optionsetname, '')}`,
                                default: `${Helper.toNumberWithDefault(row?.cell?.control?.parameters?.defaultvalue, -1)}`,
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                            });

                        });
                        const addSubgrid = ((container, row) => {
                            const subgrid = container.append(block_subgrid)[0];
                            subgrid.setAttributes({
                                ...subgrid.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                entitylogicalname: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.targetentitytype, '')}`,
                                viewids: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.viewids, '')}`,
                                perpage: `${Helper.toNumberWithDefault(row?.cell?.control?.parameters?.recordsperpage, 5)}`,
                                contextual: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.enablecontextualactions, `0`)}`,
                                quickfind: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.enablequickfind, `0`)}`,
                                viewpicker: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.enableviewpicker, `0`)}`,
                                rows: Helper.toNumberWithDefault(row?.cell?.$?.rowspan, 1),
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addChart = ((container, row) => {
                            const chart = container.append(block_chart)[0];
                            chart.setAttributes({
                                ...chart.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                entitylogicalname: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.targetentitytype, '')}`,
                                viewids: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.viewids, '')}`,
                                visualizationid: `${Helper.toStringWithDefault(row?.cell?.control?.parameters?.visualizationid, '')}`,
                                chartpicker: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.enablechartpicker, `0`)}`,
                                viewpicker: `${Helper.to01WithDefault(row?.cell?.control?.parameters?.enableviewpicker, `0`)}`,
                                rows: Helper.toNumberWithDefault(row?.cell?.$?.rowspan, 1),
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addRichTextBox = ((container, row) => {
                            const customControl = getCustomControl(row);
                            const rtb = container.append(block_rich_text_box)[0];
                            rtb.setAttributes({
                                ...rtb.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                lib: `${Helper.toStringWithDefault(customControl?.parameters?.configurl?._, '')}`,
                                rows: Helper.toNumberWithDefault(row?.cell?.$?.rowspan, 1),
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`
                            });
                        });
                        const addEntityOptionSet = ((container, row) => {
                            const customControl = getCustomControl(row);
                            const entity_optionset = container.append(block_entity_optionset)[0];
                            entity_optionset.setAttributes({
                                ...entity_optionset.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                required: `${Helper.to01WithDefault(row?.cell?.control?.$?.isrequired, `0`)}`,
                                disabled: `${Helper.to01WithDefault(row?.cell?.control?.$?.disabled, `0`)}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                                para_entitylogicalname: `${Helper.toStringWithDefault(customControl?.parameters?.value?._, '')}`
                            });

                        });
                        const addAdvFind = ((container, row) => {
                            const customControl = getCustomControl(row);
                            const advfind = container.append(block_advfind)[0];
                            advfind.setAttributes({
                                ...advfind.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                                para_fetchxml: `${Helper.toStringWithDefault(customControl?.parameters?.fetchxml?._, '')}`,
                                para_entitylogicalname: `${Helper.toStringWithDefault(customControl?.parameters?.entitylogicalname?._, '')}`,
                                para_validationerrormessage: `${Helper.toStringWithDefault(customControl?.parameters?.validationerrormessage?._, '')}`,
                                para_isvalid: `${Helper.toStringWithDefault(customControl?.parameters?.isvalid?._, '')}`,
                            });
                        });
                        const addAdvFindResult = ((container, row) => {
                            const customControl = getCustomControl(row);
                            const advfind_result = container.append(block_advfind_result)[0];
                            advfind_result.setAttributes({
                                ...advfind_result.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                                para_fetchxml: `${Helper.toStringWithDefault(customControl?.parameters?.fetchxml?._, '')}`,
                                para_entitylogicalname: `${Helper.toStringWithDefault(customControl?.parameters?.entitylogicalname?._, '')}`,
                                para_layout_xml: `${Helper.toStringWithDefault(customControl?.parameters?.layoutxml?._, '')}`,
                                para_selected_records: `${Helper.toStringWithDefault(customControl?.parameters?.selectedrecords?._, '')}`,
                            });
                        });
                        const addUpload = ((container, row) => {
                            const customControl = getCustomControl(row);
                            const upload = container.append(block_upload)[0];
                            upload.setAttributes({
                                ...upload.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                                para_attachment_file_name: `${Helper.toStringWithDefault(customControl?.parameters?.filename?._, '')}`,
                                para_uploaded_file_size: `${Helper.toStringWithDefault(customControl?.parameters?.size?._, '')}`,
                            });
                        });
                        const addAdvFindAndResult = ((container, row) => {
                            const customControl = getCustomControl(row);
                            const advfind_and_result = container.append(block_advfind_and_result)[0];
                            advfind_and_result.setAttributes({
                                ...advfind_and_result.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                rows: Helper.toNumberWithDefault(row?.cell?.$?.rowspan, 1),
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                                para_fetchxml: `${Helper.toStringWithDefault(customControl?.parameters?.fetchxml?._, '')}`,
                                para_entitylogicalname: `${Helper.toStringWithDefault(customControl?.parameters?.entitylogicalname?._, '')}`,
                            });
                        });
                        const addMultiselectLookup = ((container, row) => {
                            const customControl = getCustomControl(row);
                            const multiselectlookup = container.append(block_multiselect_lookup)[0];
                            multiselectlookup.setAttributes({
                                ...multiselectlookup.getAttributes(),
                                id: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.$?.id)}`,
                                uniqueid: `${Helper.cleanGUIDWithDefaultNewGuid(row?.cell?.control?.$?.uniqueid)}`,
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                label: `${Helper.toStringWithDefault(row?.cell?.labels?.label?.$?.description, '')}`,
                                visible: `${Helper.to01WithDefault(row?.cell?.$?.visible, '1')}`,
                                para_targetentities: `${Helper.toStringWithDefault(customControl?.parameters?.targetentities?._, '')}`,
                                para_selectedentities: `${Helper.toStringWithDefault(customControl?.parameters?.selectedentities?._, '')}`,
                                para_isdisabled: `${Helper.toStringWithDefault(customControl?.parameters?.isdisabled?._, '')}`,
                                para_disablemru: `${Helper.toStringWithDefault(customControl?.parameters?.disablemru?._, '')}`,
                            });
                        });
                        const addUnknow = ((container, row) => {
                            const unknown = container.append(block_unknown)[0];
                            const builder = new xml2js.Builder({ xmldec : null});
                            const len = '<?xml version="1.0"?>'.length;
                            let xml = builder.buildObject(row);
                            xml = xmlFormat.minify(xml);
                            xml = `<row>${xml.substring(len)}</row>`;

                            const builder2 = new xml2js.Builder({ xmldec: null, rootName: 'controlDescription' });
                            const controlDescription = getControlDescription(row);
                            let control_description = builder2.buildObject(controlDescription);
                            control_description = xmlFormat.minify(control_description);
                            control_description = control_description.substring(len);

                            unknown.setAttributes({
                                ...unknown.getAttributes(),
                                logicalname: `${Helper.toStringWithDefault(row?.cell?.control?.$?.id, '')}`,
                                row: xml,
                                control_description: control_description
                            });
                        });
                        const block_label = editor.Blocks.get('block_label').attributes.content;
                        const block_tab = `<fieldset class="DDBTab"><legend>Tab</legend><fieldset class="DDBSections"><legend>Sections</legend></fieldset></fieldset>`;
                        const block_tabheader = editor.Blocks.get('block_tabheader').attributes.content;
                        const block_tabfooter = editor.Blocks.get('block_tabfooter').attributes.content;
                        const block_footer = editor.Blocks.get('block_footer').attributes.content;
                        const block_event = editor.Blocks.get('block_event').attributes.content;
                        const block_parameter = editor.Blocks.get('block_parameter').attributes.content;
                        const block_javascript = editor.Blocks.get('block_javascript').attributes.content;
                        const block_button = editor.Blocks.get('block_button').attributes.content;
                        const block_textbox = editor.Blocks.get('block_textbox').attributes.content;
                        const block_datetime = editor.Blocks.get('block_datetime').attributes.content;
                        const block_number = editor.Blocks.get('block_number').attributes.content;
                        const block_lookup = editor.Blocks.get('block_lookup').attributes.content;
                        const block_regarding = editor.Blocks.get('block_regarding').attributes.content;
                        const block_iframe = editor.Blocks.get('block_iframe').attributes.content;
                        const block_textarea = editor.Blocks.get('block_textarea').attributes.content;
                        const block_dropdown = editor.Blocks.get('block_dropdown').attributes.content;
                        const block_optionset = editor.Blocks.get('block_optionset').attributes.content;
                        const block_twooptions = editor.Blocks.get('block_twooptions').attributes.content;
                        const block_subgrid = editor.Blocks.get('block_subgrid').attributes.content;
                        const block_chart = editor.Blocks.get('block_chart').attributes.content;
                        const block_section = editor.Blocks.get('block_section').attributes.content;
                        const block_advfind = editor.Blocks.get('block_advfind').attributes.content;
                        const block_advfind_and_result = editor.Blocks.get('block_advfind_and_result').attributes.content;
                        const block_advfind_result = editor.Blocks.get('block_advfind_result').attributes.content;
                        const block_rich_text_box = editor.Blocks.get('block_rich_text_box').attributes.content;
                        const block_entity_optionset = editor.Blocks.get('block_entity_optionset').attributes.content;
                        const block_upload = editor.Blocks.get('block_upload').attributes.content;
                        const block_unknown = `<div class='DDBControlUnknown'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`;
                        const block_multiselect_lookup = editor.Blocks.get('block_multiselect_lookup').attributes.content;
                        editor.runCommand('core:canvas-clear');
                        editor.addComponents(Const.OpenDDB);
                        const metadata_c = editor.getComponents().filter(c => c.attributes.type === 'MetadataComponent')[0];
                        //=============================================================================================
                        if (formparameters) {
                            (formparameters?.querystringparameter?.length ? [...formparameters?.querystringparameter] : [formparameters?.querystringparameter]).map((parameter) => {
                                if (!Helper.isEmpty(parameter)) addParameter(metadata_c, parameter);
                            });
                        }
                        //=============================================================================================
                        if (events) {
                            (events?.event?.length ? [...events?.event] : [events?.event]).map((event) => {
                                if (!Helper.isEmpty(event)) addEvent(metadata_c, event);
                            });
                        }
                        const event_onload = (events?.event?.length ? [...events?.event] : [events?.event]).filter((event) => { return event?.$?.name?.toLowerCase() === 'onload' });
                        const handlers = event_onload[0]?.handlers ?? event_onload[0]?.internalhandlers;
                        metadata_c.setAttributes({
                            ...metadata_c.getAttributes(),
                            logicalname: `${output.logicalname}`,
                            languagecode: `${output.languagecode}`,
                            description: `${output.description}`,
                            fulldescription: `${output.fulldescription}`,
                            eventid: `${Helper.cleanGUIDWithDefaultNewGuid(handlers?.handler?.$?.handlerUniqueId)}`
                        });
                        //=============================================================================================
                        if (clientresources) {
                            (clientresources?.internalresources?.clientincludes?.internaljscriptfile?.length ? [...clientresources?.internalresources?.clientincludes?.internaljscriptfile] : [clientresources?.internalresources?.clientincludes?.internaljscriptfile]).map((javascript) => {
                                if (!Helper.isEmpty(javascript)) addJavascript(metadata_c, javascript);
                            });
                        }
                        //=============================================================================================
                        if (header) {
                            const header_c = editor.getComponents().filter(c => c.attributes.type === 'HeaderComponent')[0];
                            header_c.setAttributes({
                                ...header_c.getAttributes(),
                                id: Helper.cleanGUIDWithDefaultNewGuid(header?.$?.id)
                            });
                            (header?.rows?.row?.length ? [...header?.rows?.row] : [header?.rows?.row]).map((row) => {
                                if (!Helper.isEmpty(row)) addLabel(header_c, row);
                            });
                        }
                        //=============================================================================================
                        if (tabs) {
                            const tabs_c = editor.getComponents().filter(x => x.attributes.type === 'TabsComponent')[0];
                            (tabs?.tab?.length ? [...tabs?.tab] : [tabs?.tab]).map((tab) => {
                                const tab_c = addTab(tabs_c, tab);
                                if (tab?.tabheader) {
                                    const tabheader_c = addTabHeader(tab_c, tab);
                                    (tab?.tabheader?.rows?.row?.length ? [...tab?.tabheader?.rows?.row] : [tab?.tabheader?.rows?.row]).map((row) => {
                                        if (!Helper.isEmpty(row)) addLabel(tabheader_c, row);
                                    });
                                }
                                if (tab?.columns) {
                                    (tab?.columns?.column?.length ? [...tab?.columns?.column] : [tab?.columns?.column]).map((column) => {
                                        (column?.sections?.section?.length ? [...column?.sections?.section] : [column?.sections?.section]).map((section) => {
                                            const sections_c = tab_c.findType("SectionsComponent")[0];
                                            const section_c = addSection(sections_c, section);
                                            (section?.rows?.row?.length ? [...section?.rows?.row] : [section?.rows?.row]).filter((row) => {
                                                if (!row?.cell) return false;
                                                if (!row?.cell?.control) return false;
                                                return true;
                                            }).map(async (row) => {
                                                const { classid } = row?.cell?.control?.$;
                                                switch (classid?.toLowerCase()) {
                                                    case GUID.LABEL.toLowerCase():
                                                        addLabel(section_c, row);
                                                        break;
                                                    case GUID.SLT_TEXT.toLowerCase():
                                                    case GUID.SLT_EMAIL.toLowerCase():
                                                    case GUID.SLT_URL.toLowerCase():
                                                    case GUID.SLT_TICKER_SYMBOL.toLowerCase():
                                                        addTextBox(section_c, row);
                                                        break;
                                                    case GUID.SLT_TEXT_AREA.toLowerCase():
                                                        addTextArea(section_c, row);
                                                        break;
                                                    case GUID.DATETIME.toLowerCase():
                                                        addDateTime(section_c, row);
                                                        break;
                                                    case GUID.NUMBER_CURRENCY.toLowerCase():
                                                    case GUID.NUMBER_DECIMAL_NUMBER.toLowerCase():
                                                    case GUID.NUMBER_FLOATING_POINT_NUMBER.toLowerCase():
                                                    case GUID.NUMBER_WHOLE_NUMBER.toLowerCase():
                                                        addNumber(section_c, row);
                                                        break;
                                                    case GUID.LOOKUP.toLowerCase():
                                                        addLookup(section_c, row);
                                                        break;
                                                    case GUID.REGARDING.toLowerCase():
                                                        addRegarding(section_c, row);
                                                        break;
                                                    case GUID.IFRAME.toLowerCase():
                                                        addIframe(section_c, row);
                                                        break;
                                                    case GUID.DROPDOWN_DURATION.toLowerCase():
                                                    case GUID.DROPDOWN_LANGUAGE.toLowerCase():
                                                    case GUID.DROPDOWN_TIMEZONE.toLowerCase():
                                                        addDropdown(section_c, row);
                                                        break;
                                                    case GUID.OPTIONSET_MULTISELECT_OPTIONSET.toLowerCase():
                                                    case GUID.OPTIONSET_OPTIONSET.toLowerCase():
                                                        await addOptionSet(section_c, row);
                                                        break;
                                                    case GUID.TWOOPTIONS_CHECKBOX.toLowerCase():
                                                    case GUID.TWOOPTIONS_DROPDOWN.toLowerCase():
                                                        await addTwoOptions(section_c, row);
                                                        break;
                                                    case GUID.SUBGRID_CHART.toLowerCase():
                                                        if (Helper.isEmpty(row?.cell?.control?.parameters?.visualizationid))
                                                            addSubgrid(section_c, row);
                                                        else
                                                            addChart(section_c, row);
                                                        break;
                                                    case GUID.PLACE_HOLDER_CONTROL.toLowerCase():
                                                        const controlName = getControlName(row);
                                                        switch (controlName) {
                                                            case ControlName.MscrmControls_RichTextEditor_RichTextEditorControl:
                                                                addRichTextBox(section_c, row);
                                                                break;
                                                            case ControlName.MscrmControls_FieldControls_EntityOptionSetControl:
                                                                addEntityOptionSet(section_c, row);
                                                                break;
                                                            case ControlName.MscrmControls_ConditionBuilder_ConditionBuilderControl:
                                                                addAdvFind(section_c, row);
                                                                break;
                                                            case ControlName.MscrmControls_Grid_FetchXmlResultsViewer:
                                                                addAdvFindResult(section_c, row);
                                                                break;
                                                            case ControlName.MscrmControls_FieldControls_FileUploaderControl:
                                                                addUpload(section_c, row);
                                                                break;
                                                            case ControlName.MscrmControls_RollupQuery_RollupQueryEditorControl:
                                                                addAdvFindAndResult(section_c, row);
                                                                break;
                                                            case ControlName.MscrmControls_AppCommon_PartyListWrapper:
                                                                addMultiselectLookup(section_c, row);
                                                                break;
                                                            default:
                                                                addUnknow(section_c, row);
                                                                break;
                                                        }
                                                        break;
                                                    default:
                                                        addUnknow(section_c, row);
                                                        break;
                                                }
                                            });
                                        });
                                    });
                                }
                                if (tab?.tabfooter) {
                                    const tabfooter_c = addTabFooter(tab_c, tab);
                                    (tab?.tabfooter?.rows?.row?.length ? [...tab?.tabfooter?.rows?.row] : [tab?.tabfooter?.rows?.row]).map((row) => {
                                        (row?.cell?.length ? [...row?.cell] : [row?.cell]).map((cell) => {
                                            const event_onclick = (events?.event?.length ? [...events?.event] : [events?.event]).filter((x) => {
                                                return x?.$?.name?.toLowerCase() === 'onclick' && Helper.toStringWithDefault(x?.$?.attribute, '') === Helper.toStringWithDefault(cell?.control?.$?.id, '')
                                            });
                                            addButton(tabfooter_c, cell, event_onclick[0]);
                                        });
                                    });
                                }
                            });
                        }
                        if (footer) {
                            const footer_c = editor.addComponents(block_footer)[0];
                            footer_c.setAttributes({
                                ...footer_c.getAttributes(),
                                id: Helper.cleanGUIDWithDefaultNewGuid(footer?.$?.id)
                            });

                            (footer?.rows?.row?.length ? [...footer?.rows?.row] : [footer?.rows?.row]).map((row) => {
                                (row?.cell?.length ? [...row?.cell] : [row?.cell]).map((cell) => {
                                    const event_onclick = (events?.event?.length ? [...events?.event] : [events?.event]).filter((x) => {
                                        return x?.$?.name?.toLowerCase() === 'onclick' && Helper.toStringWithDefault(x?.$?.attribute, '') === Helper.toStringWithDefault(cell?.control?.$?.id, '')
                                    });
                                    addButton(footer_c, cell, event_onclick[0]);
                                });
                            });
                        }
                        await Crm.HideProcessing();
                    });
                }

                setTimeout(() => { editor.stopCommand('command_open'); }, 1);
                try {
                    const result = await Crm.getXrm().Navigation.openDialog('pl_dataversedialogbuilder_open', { position: 1, width: 400, height: 370 }, {});
                    const o = JSON.parse(result.parameters.pl_output);
                    if (o.ClickButton === 'Ok') {
                        Crm.ShowProcessing("Loading ...");
                        const output = await Crm.GetForm(o.FormId);
                        sessionStorage.setItem('pl_dataversedialogbuilder_open', JSON.stringify(output));
                        await loadForm(output);
                    }
                } catch {
                    const debug =
                    {
                        "ok": true,
                        "mesage": "",
                        "formxml": "<form><formparameters><querystringparameter name=\"pl_input_count\" type=\"Integer\" /><querystringparameter name=\"pl_output_button_click\" type=\"SafeString\" /></formparameters><events><event name=\"onload\" application=\"false\" active=\"false\"><Handlers><Handler functionName=\"AnotherAssign.OnLoad\" libraryName=\"$webresource:pl_/js/AnotherAssign.js\" handlerUniqueId=\"{8D1C6476-6AFB-4AE9-818E-B21AC15B8E94}\" enabled=\"true\" parameters=\"\" passExecutionContext=\"true\" /></Handlers></event><event name=\"onclick\" application=\"false\" active=\"false\" attribute=\"pl_button_cancel_1\"><Handlers><Handler functionName=\"AnotherAssign.OnClickCancel\" libraryName=\"$webresource:pl_/js/AnotherAssign.js\" handlerUniqueId=\"{43501783-9DDA-46B3-82A3-2DC060C4F6AA}\" enabled=\"true\" parameters=\"\" passExecutionContext=\"true\" /></Handlers></event><event name=\"onclick\" application=\"false\" active=\"false\" attribute=\"pl_button_assign_to_me\"><Handlers><Handler functionName=\"AnotherAssign.OnClickAssign\" libraryName=\"$webresource:pl_/js/AnotherAssign.js\" handlerUniqueId=\"{2006E35E-37F4-465B-8210-94BFBEAB12C3}\" enabled=\"true\" parameters=\"'OnClickAssignToMe'\" passExecutionContext=\"true\" /></Handlers></event><event name=\"onclick\" application=\"false\" active=\"false\" attribute=\"pl_button_next\"><Handlers><Handler functionName=\"AnotherAssign.MoveToTab\" libraryName=\"$webresource:pl_/js/AnotherAssign.js\" handlerUniqueId=\"{F9942D8C-FF1F-4B7E-98F8-35C15F8CF71D}\" enabled=\"true\" parameters=\"'tab_2'\" passExecutionContext=\"true\" /></Handlers></event><event name=\"onclick\" application=\"false\" active=\"false\" attribute=\"pl_button_cancel_2\"><Handlers><Handler functionName=\"AnotherAssign.OnClickCancel\" libraryName=\"$webresource:pl_/js/AnotherAssign.js\" handlerUniqueId=\"{D5823314-54E1-462D-8D54-7E89A609514E}\" enabled=\"true\" parameters=\"\" passExecutionContext=\"true\" /></Handlers></event><event name=\"onclick\" application=\"false\" active=\"false\" attribute=\"pl_button_assign\"><Handlers><Handler functionName=\"AnotherAssign.OnClickAssign\" libraryName=\"$webresource:pl_/js/AnotherAssign.js\" handlerUniqueId=\"{EA32FBD1-88BA-4BC5-AA35-06F90AB8D38A}\" enabled=\"true\" parameters=\"'OnClickAssign'\" passExecutionContext=\"true\" /></Handlers></event><event name=\"onclick\" application=\"false\" active=\"false\" attribute=\"pl_button_back\"><Handlers><Handler functionName=\"AnotherAssign.MoveToTab\" libraryName=\"$webresource:pl_/js/AnotherAssign.js\" handlerUniqueId=\"{C0D874A7-DD1F-4B55-A344-F56C06BAEA86}\" enabled=\"true\" parameters=\"'tab_1'\" passExecutionContext=\"true\" /></Handlers></event></events><header id=\"{21D5ACD6-6715-4567-B783-B3C4A99DC70C}\"><rows><row><cell id=\"{9E95AC65-C121-49A8-9154-659036483FB8}\" visible=\"true\" rowspan=\"1\"><labels><label description=\"ANOTHER ASSIGN\" languagecode=\"1033\" /></labels><control uniqueid=\"{0F8CECFC-6D92-49EA-B610-7CE31C8B7D03}\" id=\"pl_label_header\" classid=\"{39354E4A-5015-4D74-8031-EA9EB73A1322}\" isunbound=\"true\"><parameters><IsTitle>true</IsTitle></parameters></control></cell></row><row><cell id=\"{6E8A617C-819B-4C60-9F50-7EDCCCD31ABB}\" visible=\"true\" rowspan=\"1\"><labels><label description=\"You have selected {0}. To whom would you like to assign them?\" languagecode=\"1033\" /></labels><control uniqueid=\"{030C319C-CC62-4CFD-B919-7E0F1FB45B16}\" id=\"pl_label_subheader\" classid=\"{39354E4A-5015-4D74-8031-EA9EB73A1322}\" isunbound=\"true\"><parameters><IsTitle>false</IsTitle></parameters></control></cell></row></rows></header><tabs><tab id=\"{59C82601-E5C4-47F1-893D-A8A644893663}\" name=\"tab_1\" visible=\"true\" expanded=\"true\" verticallayout=\"true\" locklevel=\"0\"><labels><label description=\"\" languagecode=\"1033\" /></labels><tabheader id=\"{A207CAE0-08C0-4E2C-8687-9A83D2797B1E}\"><rows><row><cell id=\"{12AC1314-D7DC-43AD-8815-DC123934A6A6}\" visible=\"true\" rowspan=\"1\"><labels><label description=\"What do you want to assign?\" languagecode=\"1033\" /></labels><control uniqueid=\"{8B37E70B-9742-40B8-A130-26C66B5C06C1}\" id=\"pl_label_tabheader_1\" classid=\"{39354E4A-5015-4D74-8031-EA9EB73A1322}\" isunbound=\"true\"><parameters><IsTitle>false</IsTitle></parameters></control></cell></row></rows></tabheader><columns><column width=\"100%\"><sections><section id=\"{A930A5AE-069D-403C-9DEE-DD0E748A1C60}\" name=\"tab_1_section_1\" labelwidth=\"115\" showlabel=\"false\" visible=\"true\" celllabelalignment=\"Left\" celllabelposition=\"Left\"><labels><label description=\"\" languagecode=\"1033\" /></labels><rows><row><cell id=\"{8EBA23FA-21EA-42DC-8439-39C83586CE70}\" visible=\"true\"><labels><label description=\"Assign to\" languagecode=\"1033\" /></labels><control uniqueid=\"{AB68C0F2-CDC4-4D05-9795-105AFDF52EF3}\" id=\"pl_optionset_assign_to\" classid=\"{3EF39988-22BB-4F0B-BBBE-64B5A3748AEE}\" isrequired=\"true\" disabled=\"false\" isunbound=\"true\"><parameters><OptionSetId>{00000000-0000-0000-0000-000000000000}</OptionSetId></parameters></control></cell></row></rows></section></sections></column></columns><tabfooter id=\"{10A821A5-D5B8-4BBA-9DEE-F6B242D34D05}\"><rows><row><cell id=\"{FBF2CAA9-D476-4DC9-8A08-3306310DB279}\" visible=\"false\"><labels><label description=\"Next\" languagecode=\"1033\" /></labels><control uniqueid=\"{DB398F07-29F6-4987-B50B-40D8F9A4621C}\" id=\"pl_button_next\" classid=\"{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}\" disabled=\"false\" isunbound=\"true\" /></cell><cell id=\"{1F536635-C1AC-4D79-B355-83C872AFD7A3}\" visible=\"true\"><labels><label description=\"Assign to Me\" languagecode=\"1033\" /></labels><control uniqueid=\"{30453176-3DBE-441A-BEE6-00F355CB45D5}\" id=\"pl_button_assign_to_me\" classid=\"{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}\" disabled=\"false\" isunbound=\"true\" /></cell><cell id=\"{B167C0D5-56C5-466E-8643-24BAE35157BA}\" visible=\"true\"><labels><label description=\"Cancel\" languagecode=\"1033\" /></labels><control uniqueid=\"{121645D6-17BD-4B73-851A-4512637E6910}\" id=\"pl_button_cancel_1\" classid=\"{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}\" disabled=\"false\" isunbound=\"true\" /></cell></row></rows></tabfooter></tab><tab id=\"{32956171-E242-4DD1-B49B-ADA1C2362E9B}\" name=\"tab_2\" visible=\"true\" expanded=\"true\" verticallayout=\"true\" locklevel=\"0\"><labels><label description=\"\" languagecode=\"1033\" /></labels><tabheader id=\"{747BE98D-B8BB-43C8-A6F0-CF93640A910C}\"><rows><row><cell id=\"{1355B89F-A6B4-4214-9548-ED75592ABF20}\" visible=\"true\" rowspan=\"1\"><labels><label description=\"Select user or team you want to assign\" languagecode=\"1033\" /></labels><control uniqueid=\"{863EEE7A-4A50-4A33-AB44-F43B2ADF079A}\" id=\"pl_label_tabheader_2\" classid=\"{39354E4A-5015-4D74-8031-EA9EB73A1322}\" isunbound=\"true\"><parameters><IsTitle>false</IsTitle></parameters></control></cell></row></rows></tabheader><columns><column width=\"100%\"><sections><section id=\"{66F28C88-230B-4D76-A0AF-14295AFF3923}\" name=\"tab_2_section_1\" labelwidth=\"115\" showlabel=\"false\" visible=\"true\" celllabelalignment=\"Left\" celllabelposition=\"Left\"><labels><label description=\"\" languagecode=\"1033\" /></labels><rows><row><cell id=\"{F1FA76A3-5B94-4C02-81AF-7CA556B421E4}\" visible=\"true\"><labels><label description=\"User or Team\" languagecode=\"1033\" /></labels><control uniqueid=\"{8C4D0116-73E7-4340-9025-7F0C0A4065F7}\" id=\"pl_lookup_user_team\" classid=\"{270BD3DB-D9AF-4782-9025-509E298DEC0A}\" isrequired=\"true\" disabled=\"false\" isunbound=\"true\"><parameters><TargetEntities><TargetEntity><DefaultViewId>{E88CA999-0B16-4AE9-B6A9-9EDC840D42D8}</DefaultViewId><EntityLogicalName>systemuser</EntityLogicalName></TargetEntity><TargetEntity><DefaultViewId>{57E39843-404C-48E5-B1D9-1889098FB65C}</DefaultViewId><EntityLogicalName>team</EntityLogicalName></TargetEntity></TargetEntities><DisableViewPicker>false</DisableViewPicker><DisableQuickFind>true</DisableQuickFind><DisableMru>true</DisableMru><AutoResolve>true</AutoResolve><useMainFormDialogForCreate>false</useMainFormDialogForCreate><useMainFormDialogForEdit>false</useMainFormDialogForEdit><AvailableViewIds>{E88CA999-0B16-4AE9-B6A9-9EDC840D42D8}</AvailableViewIds></parameters></control></cell></row></rows></section></sections></column></columns><tabfooter id=\"{5FBF3127-B23C-4CDB-9DF0-4992B73D6B86}\"><rows><row><cell id=\"{DE17BFF1-43EC-4A1D-831A-F99D2F8F5656}\" visible=\"true\"><labels><label description=\"Back\" languagecode=\"1033\" /></labels><control uniqueid=\"{1486883F-3785-42AC-A2F6-A1A071F28CDC}\" id=\"pl_button_back\" classid=\"{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}\" disabled=\"false\" isunbound=\"true\" /></cell><cell id=\"{3C5B7457-DB9C-41D1-91CE-BA4C482A50D7}\" visible=\"true\"><labels><label description=\"Assign\" languagecode=\"1033\" /></labels><control uniqueid=\"{9671B42B-F56F-4EC3-8EAF-F32EA271DE2C}\" id=\"pl_button_assign\" classid=\"{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}\" disabled=\"false\" isunbound=\"true\" /></cell><cell id=\"{D83A1C34-DACD-4960-9A5E-2DDF8A14A70B}\" visible=\"true\"><labels><label description=\"Cancel\" languagecode=\"1033\" /></labels><control uniqueid=\"{F962AB3F-FE87-4A0A-AF0D-5882BB7EB8CB}\" id=\"pl_button_cancel_2\" classid=\"{00AD73DA-BD4D-49C6-88A8-2F4F4CAD4A20}\" disabled=\"false\" isunbound=\"true\" /></cell></row></rows></tabfooter></tab></tabs></form>",
                        "languagecode": 1033,
                        "logicalname": "pl_another_assign",
                        "description": "Another Assign dialog",
                        "fulldescription": "Another Assign dialog"
                    }
                    loadForm(debug);
                }
            },
            stop(editor, sender) {
                editor.Panels.getButton('options_left', 'button_open').active = false;
            }
        }
    }
    commands.add('command_open', commandOpen(editor, opts));

    const commandDemo = (editor, opts) => {
        async function createDemoDialog() {

            const block_label = editor.Blocks.get('block_label').attributes.content;
            const block_tab = editor.Blocks.get('block_tab').attributes.content;
            const block_tabheader = editor.Blocks.get('block_tabheader').attributes.content;
            const block_tabfooter = editor.Blocks.get('block_tabfooter').attributes.content;
            const block_event = editor.Blocks.get('block_event').attributes.content;
            const block_parameter = editor.Blocks.get('block_parameter').attributes.content;
            const block_javascript = editor.Blocks.get('block_javascript').attributes.content;
            const block_button = editor.Blocks.get('block_button').attributes.content;
            const block_textbox = editor.Blocks.get('block_textbox').attributes.content;
            const block_datetime = editor.Blocks.get('block_datetime').attributes.content;
            const block_number = editor.Blocks.get('block_number').attributes.content;
            const block_lookup = editor.Blocks.get('block_lookup').attributes.content;
            const block_regarding = editor.Blocks.get('block_regarding').attributes.content;
            const block_iframe = editor.Blocks.get('block_iframe').attributes.content;
            const block_spacer = `<div class='DDBControlSpacer'><div class='DDBControlLabel'></div><div class='DDBControlControl'></div></div>`;
            const block_textarea = editor.Blocks.get('block_textarea').attributes.content;
            const block_dropdown = editor.Blocks.get('block_dropdown').attributes.content;
            const block_optionset = editor.Blocks.get('block_optionset').attributes.content;
            const block_twooptions = editor.Blocks.get('block_twooptions').attributes.content;
            const block_subgrid = editor.Blocks.get('block_subgrid').attributes.content;
            const block_chart = editor.Blocks.get('block_chart').attributes.content;
            const block_section = editor.Blocks.get('block_section').attributes.content;
            const block_advfind = editor.Blocks.get('block_advfind').attributes.content;
            const block_advfind_and_result = editor.Blocks.get('block_advfind_and_result').attributes.content;
            const block_advfind_result = editor.Blocks.get('block_advfind_result').attributes.content;
            const block_rich_text_box = editor.Blocks.get('block_rich_text_box').attributes.content;
            const block_entity_optionset = editor.Blocks.get('block_entity_optionset').attributes.content;
            const block_upload = editor.Blocks.get('block_upload').attributes.content;
            const block_multiselect_lookup = editor.Blocks.get('block_multiselect_lookup').attributes.content;
            const languagecode = await Crm.GetLanguageCode();
            editor.addComponents(Const.NewDDBWithoutFooter);
            //METADATA
            const metadata = editor.getComponents().filter(c => c.attributes.type === 'MetadataComponent')[0];
            const event_onload = metadata.append(block_event)[0];
            event_onload.setAttributes({ ...event_onload.getAttributes(), eventtype: 'onload', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnLoad' })
            metadata.setAttributes({ ...metadata.getAttributes(), logicalname: 'pl_dataversedialogbuilder_demo', languagecode: `${languagecode}`, description: 'Dataverse Dialog Builder Demo', fulldescription: 'Show all controls that Dataverse Dialog Builder can create.', eventid: event_onload.getAttributes().uniqueid });

            const para_input = metadata.append(block_parameter)[0];
            para_input.setAttributes({ ...para_input.getAttributes(), logicalname: 'pl_parameter_input', parametertype: 'SafeString' });
            const para_fetchxml = metadata.append(block_parameter)[0];
            para_fetchxml.setAttributes({ ...para_fetchxml.getAttributes(), logicalname: 'pl_para_fetchxml', parametertype: 'SafeString' });
            const para_entitylogicalname = metadata.append(block_parameter)[0];
            para_entitylogicalname.setAttributes({ ...para_entitylogicalname.getAttributes(), logicalname: 'pl_para_entitylogicalname', parametertype: 'SafeString' });
            const para_validationerrormessage = metadata.append(block_parameter)[0];
            para_validationerrormessage.setAttributes({ ...para_validationerrormessage.getAttributes(), logicalname: 'pl_para_validationerrormessage', parametertype: 'SafeString' });
            const para_isvalid = metadata.append(block_parameter)[0];
            para_isvalid.setAttributes({ ...para_isvalid.getAttributes(), logicalname: 'pl_para_isvalid', parametertype: 'Boolean' });
            const para_layout_xml = metadata.append(block_parameter)[0];
            para_layout_xml.setAttributes({ ...para_layout_xml.getAttributes(), logicalname: 'pl_para_layout_xml', parametertype: 'SafeString' });
            const para_selected_records = metadata.append(block_parameter)[0];
            para_selected_records.setAttributes({ ...para_selected_records.getAttributes(), logicalname: 'pl_para_selected_records', parametertype: 'SafeString' });
            const para_entity_type = metadata.append(block_parameter)[0];
            para_entity_type.setAttributes({ ...para_entity_type.getAttributes(), logicalname: 'pl_para_entity_type', parametertype: 'SafeString' });
            const para_attachment_file_name = metadata.append(block_parameter)[0];
            para_attachment_file_name.setAttributes({ ...para_attachment_file_name.getAttributes(), logicalname: 'pl_para_attachment_file_name', parametertype: 'SafeString' });
            const para_uploaded_file_size = metadata.append(block_parameter)[0];
            para_uploaded_file_size.setAttributes({ ...para_uploaded_file_size.getAttributes(), logicalname: 'pl_para_uploaded_file_size', parametertype: 'Integer' });

            const para_entity_records = metadata.append(block_parameter)[0];
            para_entity_records.setAttributes({ ...para_entity_records.getAttributes(), logicalname: 'pl_para_entity_records', parametertype: 'SafeString' });

            const para_targetentities = metadata.append(block_parameter)[0];
            para_targetentities.setAttributes({ ...para_targetentities.getAttributes(), logicalname: 'pl_para_targetentities', parametertype: 'SafeString' });
            const para_selectedentities = metadata.append(block_parameter)[0];
            para_selectedentities.setAttributes({ ...para_selectedentities.getAttributes(), logicalname: 'pl_para_selectedentities', parametertype: 'SafeString' });
            const para_isdisabled = metadata.append(block_parameter)[0];
            para_isdisabled.setAttributes({ ...para_isdisabled.getAttributes(), logicalname: 'pl_para_isdisabled', parametertype: 'SafeString' });
            const para_disablemru = metadata.append(block_parameter)[0];
            para_disablemru.setAttributes({ ...para_disablemru.getAttributes(), logicalname: 'pl_para_disablemru', parametertype: 'SafeString' });


            const javascript_moment = metadata.append(block_javascript)[0];
            javascript_moment.setAttributes({ ...javascript_moment.getAttributes(), lib: 'pl_/js/moment-with-locales.min.js' });

            const event_onclick_label_previous = metadata.append(block_event)[0];
            event_onclick_label_previous.setAttributes({ ...event_onclick_label_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_label'" });
            const event_onclick_textbox_next = metadata.append(block_event)[0];
            event_onclick_textbox_next.setAttributes({ ...event_onclick_textbox_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_textbox'" });
            const event_onclick_textbox_previous = metadata.append(block_event)[0];
            event_onclick_textbox_previous.setAttributes({ ...event_onclick_textbox_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_textbox'" });

            const event_onclick_textarea_next = metadata.append(block_event)[0];
            event_onclick_textarea_next.setAttributes({ ...event_onclick_textarea_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_textarea'" });
            const event_onclick_textarea_previous = metadata.append(block_event)[0];
            event_onclick_textarea_previous.setAttributes({ ...event_onclick_textarea_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_textarea'" });

            const event_onclick_datetime_next = metadata.append(block_event)[0];
            event_onclick_datetime_next.setAttributes({ ...event_onclick_datetime_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_datetime'" });
            const event_onclick_datetime_previous = metadata.append(block_event)[0];
            event_onclick_datetime_previous.setAttributes({ ...event_onclick_datetime_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_datetime'" });

            const event_onclick_number_previous = metadata.append(block_event)[0];
            event_onclick_number_previous.setAttributes({ ...event_onclick_number_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_number'" });
            const event_onclick_number_next = metadata.append(block_event)[0];
            event_onclick_number_next.setAttributes({ ...event_onclick_number_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_number'" });

            const event_onclick_lookup_previous = metadata.append(block_event)[0];
            event_onclick_lookup_previous.setAttributes({ ...event_onclick_lookup_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_lookup'" });
            const event_onclick_lookup_next = metadata.append(block_event)[0];
            event_onclick_lookup_next.setAttributes({ ...event_onclick_lookup_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_lookup'" });

            const event_onclick_regarding_previous = metadata.append(block_event)[0];
            event_onclick_regarding_previous.setAttributes({ ...event_onclick_regarding_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_regarding'" });
            const event_onclick_regarding_next = metadata.append(block_event)[0];
            event_onclick_regarding_next.setAttributes({ ...event_onclick_regarding_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_regarding'" });

            const event_onclick_iframe_previous = metadata.append(block_event)[0];
            event_onclick_iframe_previous.setAttributes({ ...event_onclick_iframe_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_iframe'" });
            const event_onclick_iframe_next = metadata.append(block_event)[0];
            event_onclick_iframe_next.setAttributes({ ...event_onclick_iframe_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_iframe'" });

            const event_onclick_dropdown_previous = metadata.append(block_event)[0];
            event_onclick_dropdown_previous.setAttributes({ ...event_onclick_dropdown_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_dropdown'" });
            const event_onclick_dropdown_next = metadata.append(block_event)[0];
            event_onclick_dropdown_next.setAttributes({ ...event_onclick_dropdown_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_dropdown'" });

            const event_onclick_optionset_previous = metadata.append(block_event)[0];
            event_onclick_optionset_previous.setAttributes({ ...event_onclick_optionset_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_optionset'" });
            const event_onclick_optionset_next = metadata.append(block_event)[0];
            event_onclick_optionset_next.setAttributes({ ...event_onclick_optionset_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_optionset'" });

            const event_onclick_twooptions_previous = metadata.append(block_event)[0];
            event_onclick_twooptions_previous.setAttributes({ ...event_onclick_twooptions_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_twooptions'" });
            const event_onclick_twooptions_next = metadata.append(block_event)[0];
            event_onclick_twooptions_next.setAttributes({ ...event_onclick_twooptions_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_twooptions'" });

            const event_onclick_subgrid_previous = metadata.append(block_event)[0];
            event_onclick_subgrid_previous.setAttributes({ ...event_onclick_subgrid_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_subgrid'" });
            const event_onclick_subgrid_next = metadata.append(block_event)[0];
            event_onclick_subgrid_next.setAttributes({ ...event_onclick_subgrid_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_subgrid'" });

            const event_onclick_chart_previous = metadata.append(block_event)[0];
            event_onclick_chart_previous.setAttributes({ ...event_onclick_chart_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_chart'" });
            const event_onclick_chart_next = metadata.append(block_event)[0];
            event_onclick_chart_next.setAttributes({ ...event_onclick_chart_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_chart'" });

            const event_onclick_rtb_previous = metadata.append(block_event)[0];
            event_onclick_rtb_previous.setAttributes({ ...event_onclick_rtb_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_rich_text_box'" });
            const event_onclick_rtb_next = metadata.append(block_event)[0];
            event_onclick_rtb_next.setAttributes({ ...event_onclick_rtb_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_rich_text_box'" });

            const event_onclick_entity_optionset_previous = metadata.append(block_event)[0];
            event_onclick_entity_optionset_previous.setAttributes({ ...event_onclick_entity_optionset_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_entity_optionset'" });
            const event_onclick_entity_optionset_next = metadata.append(block_event)[0];
            event_onclick_entity_optionset_next.setAttributes({ ...event_onclick_entity_optionset_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_entity_optionset'" });

            const event_onclick_advfind_previous = metadata.append(block_event)[0];
            event_onclick_advfind_previous.setAttributes({ ...event_onclick_advfind_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_advfind'" });
            const event_onclick_advfind_next = metadata.append(block_event)[0];
            event_onclick_advfind_next.setAttributes({ ...event_onclick_advfind_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_advfind'" });

            const event_onclick_advfind_result_previous = metadata.append(block_event)[0];
            event_onclick_advfind_result_previous.setAttributes({ ...event_onclick_advfind_result_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_advfind_result'" });
            const event_onclick_advfind_result_next = metadata.append(block_event)[0];
            event_onclick_advfind_result_next.setAttributes({ ...event_onclick_advfind_result_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_advfind_result'" });

            const event_onclick_upload_previous = metadata.append(block_event)[0];
            event_onclick_upload_previous.setAttributes({ ...event_onclick_upload_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_upload'" });
            const event_onclick_upload_next = metadata.append(block_event)[0];
            event_onclick_upload_next.setAttributes({ ...event_onclick_upload_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_upload'" });

            const event_onclick_advfind_and_result_previous = metadata.append(block_event)[0];
            event_onclick_advfind_and_result_previous.setAttributes({ ...event_onclick_advfind_and_result_previous.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_advfind_and_result'" });
            const event_onclick_advfind_and_result_next = metadata.append(block_event)[0];
            event_onclick_advfind_and_result_next.setAttributes({ ...event_onclick_advfind_and_result_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_advfind_and_result'" });

            const event_onclick_multiselect_lookup_next = metadata.append(block_event)[0];
            event_onclick_multiselect_lookup_next.setAttributes({ ...event_onclick_multiselect_lookup_next.getAttributes(), eventtype: 'onclick', lib: 'pl_/js/DataverseDialogBuilder2.js', func: 'DataverseDialogBuilder_Demo.OnClickMoveTab', parameters: "'pl_tab_multiselect_lookup'" });
            //HEADER
            const header = editor.getComponents().filter(c => c.attributes.type === 'HeaderComponent')[0];
            const header_label1 = header.append(block_label)[0];
            header_label1.setAttributes({ ...header_label1.getAttributes(), rows: '1', label: 'Dataverse Dialog Builder', visible: '1', istitle: '1', logicalname: 'pl_header_label1' });
            const header_label2 = header.append(block_label)[0];
            header_label2.setAttributes({ ...header_label2.getAttributes(), rows: '1', label: 'v.1.0', visible: '1', istitle: '0', logicalname: 'pl_header_label2' });
            //TABS
            const viewid_AccountLookupView = await Crm.GetViewId("account", "Account Lookup View");
            const viewid_ActiveAccounts = await Crm.GetViewId("account", "Active Accounts");
            const viewid_AllAccounts = await Crm.GetViewId("account", "All Accounts");
            const visualizationid_NewAccountsByMonth = await Crm.GetVisualizationId("account", "New Accounts By Month");
            const totalTabs = 20;
            const tabs = editor.getComponents().filter(c => c.attributes.type === 'TabsComponent')[0];
            //TA01
            const tab01 = tabs.findType('TabComponent')[0];
            {
                tab01.setAttributes({ ...tab01.getAttributes(), logicalname: 'pl_tab_label' });
                const tab01_sections = tab01.findType("SectionsComponent")[0];
                const tab01_section = tab01_sections.findType("SectionComponent")[0];
                tab01_section.setAttributes({ ...tab01_section.getAttributes(), logicalname: 'pl_tab01_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const label1 = tab01_section.append(block_label)[0];
                label1.setAttributes({ ...label1.getAttributes(), rows: '1', label: `Tab  1/${totalTabs}: LABEL`, visible: '1', logicalname: 'pl_label1' });
                const label2 = tab01_section.append(block_label)[0];
                label2.setAttributes({ ...label2.getAttributes(), rows: '1', label: `Tab  2/${totalTabs}: TEXTBOX`, visible: '1', logicalname: 'pl_label2' });
                const label3 = tab01_section.append(block_label)[0];
                label3.setAttributes({ ...label3.getAttributes(), rows: '1', label: `Tab  3/${totalTabs}: TEXTAREA`, visible: '1', logicalname: 'pl_label3' });
                const label4 = tab01_section.append(block_label)[0];
                label4.setAttributes({ ...label4.getAttributes(), rows: '1', label: `Tab  4/${totalTabs}: DATETIME`, visible: '1', logicalname: 'pl_label4' });
                const label5 = tab01_section.append(block_label)[0];
                label5.setAttributes({ ...label5.getAttributes(), rows: '1', label: `Tab  5/${totalTabs}: NUMBER`, visible: '1', logicalname: 'pl_label5' });
                const label6 = tab01_section.append(block_label)[0];
                label6.setAttributes({ ...label6.getAttributes(), rows: '1', label: `Tab  6/${totalTabs}: LOOKUP`, visible: '1', logicalname: 'pl_label6' });
                const label7 = tab01_section.append(block_label)[0];
                label7.setAttributes({ ...label7.getAttributes(), rows: '1', label: `Tab  7/${totalTabs}: REGARDING`, visible: '1', logicalname: 'pl_label7' });
                const label8 = tab01_section.append(block_label)[0];
                label8.setAttributes({ ...label8.getAttributes(), rows: '1', label: `Tab  8/${totalTabs}: IFRAME`, visible: '1', logicalname: 'pl_label8' });
                const label9 = tab01_section.append(block_label)[0];
                label9.setAttributes({ ...label9.getAttributes(), rows: '1', label: `Tab  9/${totalTabs}: DROPDOWN`, visible: '1', logicalname: 'pl_label9' });
                const label10 = tab01_section.append(block_label)[0];
                label10.setAttributes({ ...label10.getAttributes(), rows: '1', label: `Tab 10/${totalTabs}: OPTIONSET`, visible: '1', logicalname: 'pl_label10' });
                const label11 = tab01_section.append(block_label)[0];
                label11.setAttributes({ ...label11.getAttributes(), rows: '1', label: `Tab 11/${totalTabs}: TWOOPTIONS`, visible: '1', logicalname: 'pl_label11' });
                const label12 = tab01_section.append(block_label)[0];
                label12.setAttributes({ ...label12.getAttributes(), rows: '1', label: `Tab 12/${totalTabs}: SUBGRID`, visible: '1', logicalname: 'pl_label12' });
                const label13 = tab01_section.append(block_label)[0];
                label13.setAttributes({ ...label13.getAttributes(), rows: '1', label: `Tab 13/${totalTabs}: CHART`, visible: '1', logicalname: 'pl_label13' });
                const label14 = tab01_section.append(block_label)[0];
                label14.setAttributes({ ...label14.getAttributes(), rows: '1', label: `Tab 14/${totalTabs}: RICH TEXT BOX`, visible: '1', logicalname: 'pl_label14' });
                const label15 = tab01_section.append(block_label)[0];
                label15.setAttributes({ ...label15.getAttributes(), rows: '1', label: `Tab 15/${totalTabs}: ENTITY OPTION SET`, visible: '1', logicalname: 'pl_label15' });
                const label16 = tab01_section.append(block_label)[0];
                label16.setAttributes({ ...label16.getAttributes(), rows: '1', label: `Tab 16/${totalTabs}: ADVANCED FIND`, visible: '1', logicalname: 'pl_label16' });
                const label17 = tab01_section.append(block_label)[0];
                label17.setAttributes({ ...label17.getAttributes(), rows: '1', label: `Tab 17/${totalTabs}: ADVANCED FIND RESULT`, visible: '1', logicalname: 'pl_label17' });
                const label18 = tab01_section.append(block_label)[0];
                label18.setAttributes({ ...label18.getAttributes(), rows: '1', label: `Tab 18/${totalTabs}: UPLOAD`, visible: '1', logicalname: 'pl_label18' });
                const label19 = tab01_section.append(block_label)[0];
                label19.setAttributes({ ...label19.getAttributes(), rows: '1', label: `Tab 19/${totalTabs}: ADVANCED FIND AND RESULT`, visible: '1', logicalname: 'pl_label19' });
                const label20 = tab01_section.append(block_label)[0];
                label20.setAttributes({ ...label20.getAttributes(), rows: '1', label: `Tab 20/${totalTabs}: MULTISELECT LOOKUP`, visible: '1', logicalname: 'pl_label20' });

                const hide = tab01_section.append(block_label)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_label_hide', label: 'HIDE', rows: '1', required: '1', disabled: '1', visible: `0` });

                //const spacer = tab01_section.append(block_spacer)[0];

                const tab01_tabheader = tab01.append(block_tabheader, { at: 0 })[0];
                const tab01_tabheader_label1 = tab01_tabheader.append(block_label)[0];
                tab01_tabheader_label1.setAttributes({ ...tab01_tabheader_label1.getAttributes(), rows: '1', label: `LABEL (1/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab01_tabheader_label1' });
                const tab01_tabheader_label2 = tab01_tabheader.append(block_label)[0];
                tab01_tabheader_label2.setAttributes({ ...tab01_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays LABEL controls that you can add to the HEADER, TABHEADER, or SECTION with the setting 'Title' set to true or false.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab01_tabheader_label2' });
                const tab01_tabfooter = tab01.append(block_tabfooter)[0];
                const button_textbox_next = tab01_tabfooter.append(block_button)[0];
                button_textbox_next.setAttributes({ ...button_textbox_next.getAttributes(), logicalname: 'button_textbox_next', label: 'Next [2] TEXTBOX', eventid: event_onclick_textbox_next.getAttributes().uniqueid });
            }
            const tab02 = tabs.append(block_tab)[0];
            {
                tab02.setAttributes({ ...tab02.getAttributes(), logicalname: 'pl_tab_textbox' });
                const tab02_sections = tab02.findType("SectionsComponent")[0];
                const tab02_section = tab02_sections.findType("SectionComponent")[0];
                tab02_section.setAttributes({ ...tab02_section.getAttributes(), logicalname: 'pl_tab02_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const textbox1 = tab02_section.append(block_textbox)[0];
                textbox1.setAttributes({ ...textbox1.getAttributes(), logicalname: 'pl_textbox1', textboxtype: 'Text', label: 'Text', maxlength: 20, required: '1' });
                const textbox2 = tab02_section.append(block_textbox)[0];
                textbox2.setAttributes({ ...textbox2.getAttributes(), logicalname: 'pl_textbox2', textboxtype: 'Email', label: 'Email', maxlength: 200, required: '1' });
                const textbox3 = tab02_section.append(block_textbox)[0];
                textbox3.setAttributes({ ...textbox3.getAttributes(), logicalname: 'pl_textbox3', textboxtype: 'URL', label: 'URL', maxlength: 100, required: '1' });
                const textbox4 = tab02_section.append(block_textbox)[0];
                textbox4.setAttributes({ ...textbox4.getAttributes(), logicalname: 'pl_textbox4', textboxtype: 'Ticker Symbol', label: 'Ticker Symbol', maxlength: 100, required: '1' });
                const textbox5 = tab02_section.append(block_textbox)[0];
                textbox5.setAttributes({ ...textbox5.getAttributes(), logicalname: 'pl_textbox5', textboxtype: 'Phone', label: 'Phone', maxlength: 20, required: '1' });

                const hide = tab02_section.append(block_textbox)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_textbox_hide', textboxtype: 'Text', label: 'HIDE', maxlength: 10, required: '1', disabled: '1', visible: `0` });

                const tab02_tabheader = tab02.append(block_tabheader, { at: 0 })[0];
                const tab02_tabheader_label1 = tab02_tabheader.append(block_label)[0];
                tab02_tabheader_label1.setAttributes({ ...tab02_tabheader_label1.getAttributes(), rows: '1', label: `TEXTBOX (2/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab02_tabheader_label1' });
                const tab02_tabheader_label2 = tab02_tabheader.append(block_label)[0];
                tab02_tabheader_label2.setAttributes({ ...tab02_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays TEXTBOX controls that you can add to a SECTION. TEXTBOX has five types: Text, Email, URL, Ticker Symbol, and Phone that you can configure.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab02_tabheader_label2' });
                const tab02_tabfooter = tab02.append(block_tabfooter)[0];
                const button_label_previous = tab02_tabfooter.append(block_button)[0];
                button_label_previous.setAttributes({ ...button_label_previous.getAttributes(), logicalname: 'button_label_previous', label: 'Previous [1] LABEL', eventid: event_onclick_label_previous.getAttributes().uniqueid });
                const button_textarea_next = tab02_tabfooter.append(block_button)[0];
                button_textarea_next.setAttributes({ ...button_textarea_next.getAttributes(), logicalname: 'button_textarea_next', label: 'Next [3] TEXTAREA', eventid: event_onclick_textarea_next.getAttributes().uniqueid });
            }
            const tab03 = tabs.append(block_tab)[0];
            {
                tab03.setAttributes({ ...tab03.getAttributes(), logicalname: 'pl_tab_textarea' });
                const tab03_sections = tab03.findType("SectionsComponent")[0];
                const tab03_section = tab03_sections.findType("SectionComponent")[0];
                tab03_section.setAttributes({ ...tab03_section.getAttributes(), logicalname: 'pl_tab03_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const textarea1 = tab03_section.append(block_textarea)[0];
                textarea1.setAttributes({ ...textarea1.getAttributes(), logicalname: 'pl_textarea1', label: 'Text Area', maxlength: 2000, rows: 5, required: '1' });

                const hide = tab03_section.append(block_textarea)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_textarea_hide', label: 'HIDE', maxlength: 200, rows: 3, required: '1', disabled: '1', visible: `0` });

                const tab03_tabheader = tab03.append(block_tabheader, { at: 0 })[0];
                const tab03_tabheader_label1 = tab03_tabheader.append(block_label)[0];
                tab03_tabheader_label1.setAttributes({ ...tab03_tabheader_label1.getAttributes(), rows: '1', label: `TEXTAREA (3/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab03_tabheader_label1' });
                const tab03_tabheader_label2 = tab03_tabheader.append(block_label)[0];
                tab03_tabheader_label2.setAttributes({ ...tab03_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays TEXTAREA controls that you can add to a SECTION. By default, they use 3 rows for height control, but you can adjust this as needed.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab03_tabheader_label2' });
                const tab03_tabfooter = tab03.append(block_tabfooter)[0];
                const button_textbox_previous = tab03_tabfooter.append(block_button)[0];
                button_textbox_previous.setAttributes({ ...button_textbox_previous.getAttributes(), logicalname: 'button_textbox_previous', label: 'Previous [2] TEXTBOX', eventid: event_onclick_textbox_previous.getAttributes().uniqueid });
                const button_datetime_next = tab03_tabfooter.append(block_button)[0];
                button_datetime_next.setAttributes({ ...button_datetime_next.getAttributes(), logicalname: 'button_datetime_next', label: 'Next [4] DATETIME', eventid: event_onclick_datetime_next.getAttributes().uniqueid });
            }
            const tab04 = tabs.append(block_tab)[0];
            {
                tab04.setAttributes({ ...tab04.getAttributes(), logicalname: 'pl_tab_datetime' });
                const tab04_sections = tab04.findType("SectionsComponent")[0];
                const tab04_section = tab04_sections.findType("SectionComponent")[0];
                tab04_section.setAttributes({ ...tab04_section.getAttributes(), logicalname: 'pl_tab04_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const datetime1 = tab04_section.append(block_datetime)[0];
                datetime1.setAttributes({ ...datetime1.getAttributes(), logicalname: 'pl_datetime1', datetimetype: 'DateAndTime', label: 'Date Time', required: '1' });
                const datetime2 = tab04_section.append(block_datetime)[0];
                datetime2.setAttributes({ ...datetime2.getAttributes(), logicalname: 'pl_datetime2', datetimetype: 'Date', label: 'Date', required: '1' });
                const datetime3 = tab04_section.append(block_datetime)[0];
                datetime3.setAttributes({ ...datetime3.getAttributes(), logicalname: 'pl_datetime3', datetimetype: 'Time', label: 'Time', required: '1' });
                const hide = tab04_section.append(block_datetime)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_datetime_hide', datetimetype: 'Date', label: 'HIDE', required: '1', disabled: '1', visible: `0` });

                const tab04_tabheader = tab04.append(block_tabheader, { at: 0 })[0];
                const tab04_tabheader_label1 = tab04_tabheader.append(block_label)[0];
                tab04_tabheader_label1.setAttributes({ ...tab04_tabheader_label1.getAttributes(), rows: '1', label: `DATETIME (4/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab04_tabheader_label1' });
                const tab04_tabheader_label2 = tab04_tabheader.append(block_label)[0];
                tab04_tabheader_label2.setAttributes({ ...tab04_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays DATETIME controls that you can add to a SECTION. DATETIME has three types: Date Time, Date, and Time that you can configure.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab04_tabheader_label2' });
                const tab04_tabheader_label3 = tab04_tabheader.append(block_label)[0];
                tab04_tabheader_label3.setAttributes({ ...tab04_tabheader_label3.getAttributes(), rows: '1', label: `Note: When you configure Time type, make sure to set the Date value for this control during the OnLoad event.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab04_tabheader_label3' });
                const tab04_tabfooter = tab04.append(block_tabfooter)[0];
                const button_textarea_previous = tab04_tabfooter.append(block_button)[0];
                button_textarea_previous.setAttributes({ ...button_textarea_previous.getAttributes(), logicalname: 'button_textarea_previous', label: 'Previous [3] TEXTAREA', eventid: event_onclick_textarea_previous.getAttributes().uniqueid });
                const button_number_next = tab04_tabfooter.append(block_button)[0];
                button_number_next.setAttributes({ ...button_number_next.getAttributes(), logicalname: 'button_number_next', label: 'Next [5] NUMBER', eventid: event_onclick_number_next.getAttributes().uniqueid });
            }
            const tab05 = tabs.append(block_tab)[0];
            {
                tab05.setAttributes({ ...tab05.getAttributes(), logicalname: 'pl_tab_number' });
                const tab05_sections = tab05.findType("SectionsComponent")[0];
                const tab05_section = tab05_sections.findType("SectionComponent")[0];
                tab05_section.setAttributes({ ...tab05_section.getAttributes(), logicalname: 'pl_tab05_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const number1 = tab05_section.append(block_number)[0];
                number1.setAttributes({ ...number1.getAttributes(), logicalname: 'pl_number1', numbertype: 'WholeNumber', label: 'Whole Number', required: '1', minvalue: 1, maxvalue: 100 });
                const number2 = tab05_section.append(block_number)[0];
                number2.setAttributes({ ...number2.getAttributes(), logicalname: 'pl_number2', numbertype: 'DecimalNumber', label: 'Decimal Number', required: '1', minvalue: 1000, maxvalue: 100000, precision: 1 });
                const number3 = tab05_section.append(block_number)[0];
                number3.setAttributes({ ...number3.getAttributes(), logicalname: 'pl_number3', numbertype: 'FloatingPointNumber', label: 'Floating Point Number', required: '1', minvalue: -100, maxvalue: 100, precision: 2 });
                const number4 = tab05_section.append(block_number)[0];
                number4.setAttributes({ ...number4.getAttributes(), logicalname: 'pl_number4', numbertype: 'Currency', label: 'Currency', required: '1', minvalue: 0, maxvalue: 1000, precision: 4 });

                const hide = tab05_section.append(block_number)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_number_hide', numbertype: 'Currency', label: 'HIDE', required: '1', minvalue: 0, maxvalue: 1000, precision: 4, disabled: '1', visible: `0` });

                const tab05_tabheader = tab05.append(block_tabheader, { at: 0 })[0];
                const tab05_tabheader_label1 = tab05_tabheader.append(block_label)[0];
                tab05_tabheader_label1.setAttributes({ ...tab05_tabheader_label1.getAttributes(), rows: '1', label: `NUMBER (5/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab05_tabheader_label1' });
                const tab05_tabheader_label2 = tab05_tabheader.append(block_label)[0];
                tab05_tabheader_label2.setAttributes({ ...tab05_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays NUMBER controls that you can add to a SECTION. NUMBER has four types: Whole Number, Decimal Number, Floating Point Number, and Currency that you can configure.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab05_tabheader_label2' });
                const tab05_tabheader_label3 = tab05_tabheader.append(block_label)[0];
                tab05_tabheader_label3.setAttributes({ ...tab05_tabheader_label3.getAttributes(), rows: '1', label: `Note: The symbol of the currency type will be displayed as the base currency. You cannot change it.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab05_tabheader_label3' });
                const tab05_tabfooter = tab05.append(block_tabfooter)[0];
                const button_datetime_previous = tab05_tabfooter.append(block_button)[0];
                button_datetime_previous.setAttributes({ ...button_datetime_previous.getAttributes(), logicalname: 'button_datetime_previous', label: 'Previous [4] DATETIME', eventid: event_onclick_datetime_previous.getAttributes().uniqueid });
                const button_lookup_next = tab05_tabfooter.append(block_button)[0];
                button_lookup_next.setAttributes({ ...button_lookup_next.getAttributes(), logicalname: 'button_lookup_next', label: 'Next [6] LOOKUP', eventid: event_onclick_lookup_next.getAttributes().uniqueid });
            }
            const tab06 = tabs.append(block_tab)[0];
            {
                tab06.setAttributes({ ...tab06.getAttributes(), logicalname: 'pl_tab_lookup' });
                const tab06_sections = tab06.findType("SectionsComponent")[0];
                const tab06_section = tab06_sections.findType("SectionComponent")[0];
                tab06_section.setAttributes({ ...tab06_section.getAttributes(), logicalname: 'pl_tab06_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const lookup1 = tab06_section.append(block_lookup)[0];
                lookup1.setAttributes({ ...lookup1.getAttributes(), logicalname: 'pl_lookup1', label: 'Lookup', entitylogicalname01: 'account', viewid01: `${viewid_AccountLookupView},${viewid_ActiveAccounts}`, usemainformdialogforcreate: '1', usemainformdialogforedit: '1', required: '1' });
                const lookup2 = tab06_section.append(block_lookup)[0];
                const viewid_DisabledUsers = await Crm.GetViewId("systemuser", "Disabled Users");
                const viewid_UserLookupView = await Crm.GetViewId("systemuser", "User Lookup View");
                const viewid_TeamsLookupView = await Crm.GetViewId("team", "Teams Lookup View");
                lookup2.setAttributes({ ...lookup2.getAttributes(), logicalname: 'pl_lookup2', label: 'Multiselect Lookup', entitylogicalname01: 'systemuser', viewid01: `${viewid_UserLookupView},${viewid_DisabledUsers}`, entitylogicalname02: 'team', viewid02: viewid_TeamsLookupView, required: '1' });

                const hide = tab06_section.append(block_lookup)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_lookup_hide', label: 'HIDE', entitylogicalname01: 'account', viewid01: viewid_AccountLookupView, disabled: '1', required: '1', visible: `0` });

                const tab06_tabheader = tab06.append(block_tabheader, { at: 0 })[0];
                const tab06_tabheader_label1 = tab06_tabheader.append(block_label)[0];
                tab06_tabheader_label1.setAttributes({ ...tab06_tabheader_label1.getAttributes(), rows: '1', label: `LOOKUP (6/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab06_tabheader_label1' });
                const tab06_tabheader_label2 = tab06_tabheader.append(block_label)[0];
                tab06_tabheader_label2.setAttributes({ ...tab06_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays LOOKUP controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab06_tabheader_label2' });
                const tab06_tabfooter = tab06.append(block_tabfooter)[0];
                const button_number_previous = tab06_tabfooter.append(block_button)[0];
                button_number_previous.setAttributes({ ...button_number_previous.getAttributes(), logicalname: 'button_number_previous', label: 'Previous [5] NUMBER', eventid: event_onclick_number_previous.getAttributes().uniqueid });
                const button_regarding_next = tab06_tabfooter.append(block_button)[0];
                button_regarding_next.setAttributes({ ...button_regarding_next.getAttributes(), logicalname: 'button_regarding_next', label: 'Next [7] REGRADING', eventid: event_onclick_regarding_next.getAttributes().uniqueid });
            }
            const tab07 = tabs.append(block_tab)[0];
            {
                tab07.setAttributes({ ...tab07.getAttributes(), logicalname: 'pl_tab_regarding' });
                const tab07_sections = tab07.findType("SectionsComponent")[0];
                const tab07_section = tab07_sections.findType("SectionComponent")[0];
                tab07_section.setAttributes({ ...tab07_section.getAttributes(), logicalname: 'pl_tab07_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const regarding1 = tab07_section.append(block_regarding)[0];
                regarding1.setAttributes({ ...regarding1.getAttributes(), logicalname: 'pl_regarding1', label: 'Regarding', required: '1' });
                const hide = tab07_section.append(block_regarding)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_regarding_hide', label: 'HIDE', disabled: '1', required: '1', visible: `0` });

                const tab07_tabheader = tab07.append(block_tabheader, { at: 0 })[0];
                const tab07_tabheader_label1 = tab07_tabheader.append(block_label)[0];
                tab07_tabheader_label1.setAttributes({ ...tab07_tabheader_label1.getAttributes(), rows: '1', label: `REGARDING (7/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab07_tabheader_label' });
                const tab07_tabheader_label2 = tab07_tabheader.append(block_label)[0];
                tab07_tabheader_label2.setAttributes({ ...tab07_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays REGARDING controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab07_tabheader_label2' });
                const tab07_tabheader_label3 = tab07_tabheader.append(block_label)[0];
                tab07_tabheader_label3.setAttributes({ ...tab07_tabheader_label3.getAttributes(), rows: '1', label: `Note: The REGARDING controls are the same as LOOKUP controls, but they select all entities that have the Activity setting set to true.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab07_tabheader_label3' });
                const tab07_tabfooter = tab07.append(block_tabfooter)[0];
                const button_lookup_previous = tab07_tabfooter.append(block_button)[0];
                button_lookup_previous.setAttributes({ ...button_lookup_previous.getAttributes(), logicalname: 'button_lookup_previous', label: 'Previous [6] LOOKUP', eventid: event_onclick_lookup_previous.getAttributes().uniqueid });
                const button_iframe_next = tab07_tabfooter.append(block_button)[0];
                button_iframe_next.setAttributes({ ...button_iframe_next.getAttributes(), logicalname: 'button_iframe_next', label: 'Next [8] IFRAME', eventid: event_onclick_iframe_next.getAttributes().uniqueid });
            }
            const tab08 = tabs.append(block_tab)[0];
            {
                tab08.setAttributes({ ...tab08.getAttributes(), logicalname: 'pl_tab_iframe' });
                const tab08_sections = tab08.findType("SectionsComponent")[0];
                const tab08_section = tab08_sections.findType("SectionComponent")[0];
                tab08_section.setAttributes({ ...tab08_section.getAttributes(), logicalname: 'pl_tab08_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const iframe1 = tab08_section.append(block_iframe)[0];
                iframe1.setAttributes({ ...iframe1.getAttributes(), logicalname: 'pl_iframe1', label: '', url: 'pl_/html/WebResource.html', rows: 5 });
                const hide = tab08_section.append(block_iframe)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_iframe_hide', label: 'HIDE', visible: `0`, rows: 3, url: 'pl_/html/WebResource.html' });

                const tab08_tabheader = tab08.append(block_tabheader, { at: 0 })[0];
                const tab08_tabheader_label1 = tab08_tabheader.append(block_label)[0];
                tab08_tabheader_label1.setAttributes({ ...tab08_tabheader_label1.getAttributes(), rows: '1', label: `IFRAME (8/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab08_tabheader_label1' });
                const tab08_tabheader_label2 = tab08_tabheader.append(block_label)[0];
                tab08_tabheader_label2.setAttributes({ ...tab08_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays IFRAME controls that you can add to a SECTION. By default, they use 5 rows for height control, but you can adjust this as needed.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab08_tabheader_label2' });
                const tab08_tabfooter = tab08.append(block_tabfooter)[0];
                const button_regarding_previous = tab08_tabfooter.append(block_button)[0];
                button_regarding_previous.setAttributes({ ...button_regarding_previous.getAttributes(), logicalname: 'button_regarding_previous', label: 'Previous [7] REGARDING', eventid: event_onclick_regarding_previous.getAttributes().uniqueid });
                const button_dropdown_next = tab08_tabfooter.append(block_button)[0];
                button_dropdown_next.setAttributes({ ...button_dropdown_next.getAttributes(), logicalname: 'button_dropdown_next', label: 'Next [9] DROPDOWN', eventid: event_onclick_dropdown_next.getAttributes().uniqueid });
            }
            const tab09 = tabs.append(block_tab)[0];
            {
                tab09.setAttributes({ ...tab09.getAttributes(), logicalname: 'pl_tab_dropdown' });
                const tab09_sections = tab09.findType("SectionsComponent")[0];
                const tab09_section = tab09_sections.findType("SectionComponent")[0];
                tab09_section.setAttributes({ ...tab09_section.getAttributes(), logicalname: 'pl_tab09_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const dropdown1 = tab09_section.append(block_dropdown)[0];
                dropdown1.setAttributes({ ...dropdown1.getAttributes(), logicalname: 'pl_dropdown1', label: 'Language', dropdowntype: 'Language', required: '1' });
                const dropdown2 = tab09_section.append(block_dropdown)[0];
                dropdown2.setAttributes({ ...dropdown2.getAttributes(), logicalname: 'pl_dropdown2', label: 'TimeZone', dropdowntype: 'TimeZone', required: '1' });
                const dropdown3 = tab09_section.append(block_dropdown)[0];
                dropdown3.setAttributes({ ...dropdown3.getAttributes(), logicalname: 'pl_dropdown3', label: 'Duration', dropdowntype: 'Duration', required: '1' });
                const hide = tab09_section.append(block_dropdown)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_dropdown_hide', label: 'HIDE', dropdowntype: 'Language', disabled: '1', required: '1', visible: `0` });

                const tab09_tabheader = tab09.append(block_tabheader, { at: 0 })[0];
                const tab09_tabheader_label1 = tab09_tabheader.append(block_label)[0];
                tab09_tabheader_label1.setAttributes({ ...tab09_tabheader_label1.getAttributes(), rows: '1', label: `DROPDOWN (9/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab09_tabheader_label1' });
                const tab09_tabheader_label2 = tab09_tabheader.append(block_label)[0];
                tab09_tabheader_label2.setAttributes({ ...tab09_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays DROPDOWN controls that you can add to a SECTION. DROPDOWN has three types: Language, Time Zone, and Duration that you can configure.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab09_tabheader_label2' });

                const tab09_tabfooter = tab09.append(block_tabfooter)[0];
                const button_iframe_previous = tab09_tabfooter.append(block_button)[0];
                button_iframe_previous.setAttributes({ ...button_iframe_previous.getAttributes(), logicalname: 'button_iframe_previous', label: 'Previous [8] IFRAME', eventid: event_onclick_iframe_previous.getAttributes().uniqueid });
                const button_optionset_next = tab09_tabfooter.append(block_button)[0];
                button_optionset_next.setAttributes({ ...button_optionset_next.getAttributes(), logicalname: 'button_optionset_next', label: 'Next [10] OPTIONSET', eventid: event_onclick_optionset_next.getAttributes().uniqueid });
            }
            const tab10 = tabs.append(block_tab)[0];
            {
                tab10.setAttributes({ ...tab10.getAttributes(), logicalname: 'pl_tab_optionset' });
                const tab10_sections = tab10.findType("SectionsComponent")[0];
                const tab10_section = tab10_sections.findType("SectionComponent")[0];
                tab10_section.setAttributes({ ...tab10_section.getAttributes(), logicalname: 'pl_tab10_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const optionset1 = tab10_section.append(block_optionset)[0];
                optionset1.setAttributes({ ...optionset1.getAttributes(), logicalname: 'pl_optionset1', optionsettype: 'OptionSet', label: 'OptionSet Dynamic', dynamic: '1', required: '1' });
                const optionset2 = tab10_section.append(block_optionset)[0];
                optionset2.setAttributes({ ...optionset1.getAttributes(), logicalname: 'pl_optionset2', optionsettype: 'OptionSet', label: 'OptionSet Local', required: '1', dynamic: `0`, logicaltype: '1', entitylogicalname01: 'account', optionsetname: 'account_accountcategorycode', default: '1' });
                const optionset3 = tab10_section.append(block_optionset)[0];
                optionset3.setAttributes({ ...optionset3.getAttributes(), logicalname: 'pl_optionset3', optionsettype: 'OptionSet', label: 'OptionSet Global', required: '1', dynamic: `0`, logicaltype: `0`, optionsetname: 'pl_globaloptionset', default: '100000001' });

                const optionset4 = tab10_section.append(block_optionset)[0];
                optionset4.setAttributes({ ...optionset4.getAttributes(), logicalname: 'pl_optionset4', optionsettype: 'MultiSelect OptionSet', label: 'MultiSelect OptionSet Dynamic', dynamic: '1', required: '1' });
                const optionset5 = tab10_section.append(block_optionset)[0];
                optionset5.setAttributes({ ...optionset5.getAttributes(), logicalname: 'pl_optionset5', optionsettype: 'MultiSelect OptionSet', label: 'MultiSelect OptionSet Local', required: '1', dynamic: `0`, logicaltype: '1', entitylogicalname01: 'account', optionsetname: 'account_accountcategorycode' });
                const optionset6 = tab10_section.append(block_optionset)[0];
                optionset6.setAttributes({ ...optionset6.getAttributes(), logicalname: 'pl_optionset6', optionsettype: 'MultiSelect OptionSet', label: 'MultiSelect OptionSet Global', required: '1', dynamic: `0`, logicaltype: `0`, optionsetname: 'pl_globaloptionset' });

                const hide = tab10_section.append(block_optionset)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_optionset_hide', optionsettype: 'OptionSet', label: 'HIDE', required: '1', dynamic: '1', disabled: '1', required: '1', visible: `0` });

                const tab10_tabheader = tab10.append(block_tabheader, { at: 0 })[0];
                const tab10_tabheader_label1 = tab10_tabheader.append(block_label)[0];
                tab10_tabheader_label1.setAttributes({ ...tab10_tabheader_label1.getAttributes(), rows: '1', label: `OPTIONSET (10/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab10_tabheader_label1' });
                const tab10_tabheader_label2 = tab10_tabheader.append(block_label)[0];
                tab10_tabheader_label2.setAttributes({ ...tab10_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays OPTIONSET controls that you can add to a SECTION. OPTIONSET have two types: OptionSet, and MultiSelect OptionSet. Each type you can configure as dynamic values, local OptionSet value, or global OptionSet value.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab10_tabheader_label2' });
                const tab10_tabfooter = tab10.append(block_tabfooter)[0];
                const button_dropdown_previous = tab10_tabfooter.append(block_button)[0];
                button_dropdown_previous.setAttributes({ ...button_dropdown_previous.getAttributes(), logicalname: 'button_dropdown_previous', label: 'Previous [9] DROPDOWN', eventid: event_onclick_dropdown_previous.getAttributes().uniqueid });
                const button_twooptions_next = tab10_tabfooter.append(block_button)[0];
                button_twooptions_next.setAttributes({ ...button_twooptions_next.getAttributes(), logicalname: 'button_twooptions_next', label: 'Next [11] TWOOPTIONS', eventid: event_onclick_twooptions_next.getAttributes().uniqueid });
            }

            const tab11 = tabs.append(block_tab)[0];
            {
                tab11.setAttributes({ ...tab11.getAttributes(), logicalname: 'pl_tab_twooptions' });
                const tab11_sections = tab11.findType("SectionsComponent")[0];
                const tab11_section = tab11_sections.findType("SectionComponent")[0];
                tab11_section.setAttributes({ ...tab11_section.getAttributes(), logicalname: 'pl_tab11_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const twooptions1 = tab11_section.append(block_twooptions)[0];
                twooptions1.setAttributes({ ...twooptions1.getAttributes(), logicalname: 'pl_twooptions1', label: 'TwoOptions Dropdown', twooptionstype: 'Dropdown', entitylogicalname01: 'contact', optionsetname: 'contact_donotemail', required: '1', default: `0` });
                const twooptions2 = tab11_section.append(block_twooptions)[0];
                twooptions2.setAttributes({ ...twooptions2.getAttributes(), logicalname: 'pl_twooptions2', label: 'TwoOptions Checkbox', twooptionstype: 'Checkbox', entitylogicalname01: 'contact', optionsetname: 'contact_donotemail', required: '1', required: '1', default: '1' });
                const twooptions3 = tab11_section.append(block_twooptions)[0];
                twooptions3.setAttributes({ ...twooptions3.getAttributes(), logicalname: 'pl_twooptions3', label: 'TwoOptions Toggle', twooptionstype: 'Toggle', entitylogicalname01: 'contact', optionsetname: 'contact_donotemail', required: '1', required: '1', default: '1' });

                const hide = tab11_section.append(block_twooptions)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_twooptions_hide', label: 'HIDE', twooptionstype: 'Checkbox', dynamic: `0`, entitylogicalname01: 'contact', optionsetname: 'contact_donotemail', disabled: '1', required: '1', visible: `0`, default: `0` });

                const tab11_tabheader = tab11.append(block_tabheader, { at: 0 })[0];
                const tab11_tabheader_label1 = tab11_tabheader.append(block_label)[0];
                tab11_tabheader_label1.setAttributes({ ...tab11_tabheader_label1.getAttributes(), rows: '1', label: `TWOOPTIONS (11/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab11_tabheader_label1' });
                const tab11_tabheader_label2 = tab11_tabheader.append(block_label)[0];
                tab11_tabheader_label2.setAttributes({ ...tab11_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays TWOOPTIONS controls that you can add to a SECTION. TWOOPTIONS have three types: Dropdown, Checkbox, and Toggle that you can configure.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab11_tabheader_label2' });

                const tab11_tabfooter = tab11.append(block_tabfooter)[0];
                const button_optionset_previous = tab11_tabfooter.append(block_button)[0];
                button_optionset_previous.setAttributes({ ...button_optionset_previous.getAttributes(), logicalname: 'button_optionset_previous', label: 'Previous [10] OPTIONSET', eventid: event_onclick_optionset_previous.getAttributes().uniqueid });
                const button_subgrid_next = tab11_tabfooter.append(block_button)[0];
                button_subgrid_next.setAttributes({ ...button_subgrid_next.getAttributes(), logicalname: 'button_subgrid_next', label: 'Next [12] SUBGRID', eventid: event_onclick_subgrid_next.getAttributes().uniqueid });
            }
            const tab12 = tabs.append(block_tab)[0];
            {
                tab12.setAttributes({ ...tab12.getAttributes(), logicalname: 'pl_tab_subgrid' });
                const tab12_sections = tab12.findType("SectionsComponent")[0];
                const tab12_section = tab12_sections.findType("SectionComponent")[0];
                tab12_section.setAttributes({ ...tab12_section.getAttributes(), logicalname: 'pl_tab12_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const subgrid1 = tab12_section.append(block_subgrid)[0];
                subgrid1.setAttributes({ ...subgrid1.getAttributes(), logicalname: 'pl_subgrid1', label: 'Accounts', entitylogicalname: 'account', viewids: `${viewid_AccountLookupView},${viewid_ActiveAccounts}`, visible: '1', contextual: '1', quickfind: '1', viewpicker: '1' });

                const hide = tab12_section.append(block_subgrid)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_subgrid_hide', label: 'HIDE', entitylogicalname: 'account', viewids: `${viewid_AccountLookupView},${viewid_ActiveAccounts}`, visible: `0` });

                const tab12_tabheader = tab12.append(block_tabheader, { at: 0 })[0];
                const tab12_tabheader_label1 = tab12_tabheader.append(block_label)[0];
                tab12_tabheader_label1.setAttributes({ ...tab12_tabheader_label1.getAttributes(), rows: '1', label: `SUBGRID (12/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab12_tabheader_label1' });
                const tab12_tabheader_label2 = tab12_tabheader.append(block_label)[0];
                tab12_tabheader_label2.setAttributes({ ...tab12_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays SUBGRID controls that you can add to a SECTION. You can configure properties to determine what you want to display.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab12_tabheader_label2' });
                const tab12_tabfooter = tab12.append(block_tabfooter)[0];
                const button_twooptions_previous = tab12_tabfooter.append(block_button)[0];
                button_twooptions_previous.setAttributes({ ...button_twooptions_previous.getAttributes(), logicalname: 'button_twooptions_previous', label: 'Previous [11] TWOOPTIONS', eventid: event_onclick_twooptions_previous.getAttributes().uniqueid });
                const button_chart_next = tab12_tabfooter.append(block_button)[0];
                button_chart_next.setAttributes({ ...button_chart_next.getAttributes(), logicalname: 'button_chart_next', label: 'Next [13] CHART', eventid: event_onclick_chart_next.getAttributes().uniqueid });
            }
            const tab13 = tabs.append(block_tab)[0];
            {
                tab13.setAttributes({ ...tab13.getAttributes(), logicalname: 'pl_tab_chart' });
                const tab13_sections = tab13.findType("SectionsComponent")[0];
                const tab13_section = tab13_sections.findType("SectionComponent")[0];
                tab13_section.setAttributes({ ...tab13_section.getAttributes(), logicalname: 'pl_tab13_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const chart1 = tab13_section.append(block_chart)[0];
                chart1.setAttributes({ ...chart1.getAttributes(), logicalname: 'pl_chart1', label: 'Chart', entitylogicalname: 'account', viewids: `${viewid_AllAccounts},${viewid_ActiveAccounts}`, visible: '1', visualizationid: `${visualizationid_NewAccountsByMonth}`, chartpicker: '1', viewpicker: '1' });

                const hide = tab13_section.append(block_chart)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_chart_hide', label: 'HIDE', entitylogicalname: 'account', viewids: `${viewid_AllAccounts},${viewid_ActiveAccounts}`, visible: `0`, visualizationid: `${visualizationid_NewAccountsByMonth}` });


                const tab13_tabheader = tab13.append(block_tabheader, { at: 0 })[0];
                const tab13_tabheader_label1 = tab13_tabheader.append(block_label)[0];
                tab13_tabheader_label1.setAttributes({ ...tab13_tabheader_label1.getAttributes(), rows: '1', label: `CHART (13/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab13_tabheader_label1' });
                const tab13_tabheader_label2 = tab13_tabheader.append(block_label)[0];
                tab13_tabheader_label2.setAttributes({ ...tab13_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays CHART controls that you can add to a SECTION. You can configure properties to determine what you want to display.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab13_tabheader_label2' });
                const tab13_tabfooter = tab13.append(block_tabfooter)[0];
                const button_subgrid_previous = tab13_tabfooter.append(block_button)[0];
                button_subgrid_previous.setAttributes({ ...button_subgrid_previous.getAttributes(), logicalname: 'button_subgrid_previous', label: 'Previous [12] SUBGRID', eventid: event_onclick_subgrid_previous.getAttributes().uniqueid });
                const button_rtb_next = tab13_tabfooter.append(block_button)[0];
                button_rtb_next.setAttributes({ ...button_rtb_next.getAttributes(), logicalname: 'button_rtb_next', label: 'Next [14] RICH TEXT BOX', eventid: event_onclick_rtb_next.getAttributes().uniqueid });
            }
            const tab14 = tabs.append(block_tab)[0];
            {
                tab14.setAttributes({ ...tab14.getAttributes(), logicalname: 'pl_tab_rich_text_box' });
                const tab15_sections = tab14.findType("SectionsComponent")[0];
                const tab15_section = tab15_sections.findType("SectionComponent")[0];
                tab15_section.setAttributes({ ...tab15_section.getAttributes(), logicalname: 'pl_tab14_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const rtb1 = tab15_section.append(block_rich_text_box)[0];
                rtb1.setAttributes({ ...rtb1.getAttributes(), logicalname: 'pl_rtb1', visible: '1', lib: 'pl_/json/RTEGlobalConfiguration.json', rows: 5 });
                const rtb2 = tab15_section.append(block_rich_text_box)[0];
                rtb2.setAttributes({ ...rtb2.getAttributes(), logicalname: 'pl_rtb2', visible: '1', rows: 3 });

                const hide = tab15_section.append(block_rich_text_box)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_rtb_hide', visible: `0` });

                const tab15_tabheader = tab14.append(block_tabheader, { at: 0 })[0];
                const tab15_tabheader_label1 = tab15_tabheader.append(block_label)[0];
                tab15_tabheader_label1.setAttributes({ ...tab15_tabheader_label1.getAttributes(), rows: '1', label: `RICH TEXT BOX (14/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab14_tabheader_label1' });
                const tab15_tabheader_label2 = tab15_tabheader.append(block_label)[0];
                tab15_tabheader_label2.setAttributes({ ...tab15_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays RICH TEXT BOX controls that you can add to a SECTION. You can configure the RTEGlobalConfiguration.json file to show/hide toolbars.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab14_tabheader_label2' });
                const tab15_tabfooter = tab14.append(block_tabfooter)[0];
                const button_chart_previous = tab15_tabfooter.append(block_button)[0];
                button_chart_previous.setAttributes({ ...button_chart_previous.getAttributes(), logicalname: 'button_chart_previous', label: 'Previous [13] CHART', eventid: event_onclick_chart_previous.getAttributes().uniqueid });
                const button_entity_optionset_next = tab15_tabfooter.append(block_button)[0];
                button_entity_optionset_next.setAttributes({ ...button_entity_optionset_next.getAttributes(), logicalname: 'button_entity_optionset_next', label: 'Next [15] ENTITY OPTIONSET', eventid: event_onclick_entity_optionset_next.getAttributes().uniqueid });
            }
            const tab15 = tabs.append(block_tab)[0];
            {
                tab15.setAttributes({ ...tab15.getAttributes(), logicalname: 'pl_tab_entity_optionset' });
                const tab15_sections = tab15.findType("SectionsComponent")[0];
                const tab15_section = tab15_sections.findType("SectionComponent")[0];
                tab15_section.setAttributes({ ...tab15_section.getAttributes(), logicalname: 'pl_tab15_section1', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const entity_optionset1 = tab15_section.append(block_entity_optionset)[0];
                entity_optionset1.setAttributes({ ...entity_optionset1.getAttributes(), logicalname: 'pl_entity_optionset1', label: 'Entity OptionSet', required: '1', para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname });

                const hide = tab15_section.append(block_entity_optionset)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_entity_optionset_hide', label: 'HIDE', disabled: '1', required: '1', visible: `0`, para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname });

                const tab15_tabheader = tab15.append(block_tabheader, { at: 0 })[0];
                const tab15_tabheader_label1 = tab15_tabheader.append(block_label)[0];
                tab15_tabheader_label1.setAttributes({ ...tab15_tabheader_label1.getAttributes(), rows: '1', label: `ENTITY OPTIONSET (15/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab15_tabheader_label1' });
                const tab15_tabheader_label2 = tab15_tabheader.append(block_label)[0];
                tab15_tabheader_label2.setAttributes({ ...tab15_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays ENTITY OPTIONSET controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab15_tabheader_label2' });
                const tab15_tabheader_label3 = tab15_tabheader.append(block_label)[0];
                tab15_tabheader_label3.setAttributes({ ...tab15_tabheader_label3.getAttributes(), rows: '1', label: `Note: This control will populate all entities of the current environment to the OPTIONSET control.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab15_tabheader_label3' });
                const tab15_tabfooter = tab15.append(block_tabfooter)[0];
                const button_rtb_previous = tab15_tabfooter.append(block_button)[0];
                button_rtb_previous.setAttributes({ ...button_rtb_previous.getAttributes(), logicalname: 'button_rtb_previous', label: 'Previous [14] RICH TEXT BOX', eventid: event_onclick_rtb_previous.getAttributes().uniqueid });
                const button_advfind_next = tab15_tabfooter.append(block_button)[0];
                button_advfind_next.setAttributes({ ...button_advfind_next.getAttributes(), logicalname: 'button_advfind_next', label: 'Next [16] ADVANCED FIND', eventid: event_onclick_advfind_next.getAttributes().uniqueid });
            }
            const tab16 = tabs.append(block_tab)[0];
            {
                tab16.setAttributes({ ...tab16.getAttributes(), logicalname: 'pl_tab_advfind' });
                const tab16_sections = tab16.findType("SectionsComponent")[0];
                const tab16_section = tab16_sections.findType("SectionComponent")[0];
                tab16_section.setAttributes({ ...tab16_section.getAttributes(), logicalname: 'pl_tab16_section', label: '', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const advfind1 = tab16_section.append(block_advfind)[0];
                advfind1.setAttributes({ ...advfind1.getAttributes(), logicalname: 'pl_advfind1', visible: '1', para_fetchxml: para_fetchxml.getAttributes().logicalname, para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname, para_validationerrormessage: para_validationerrormessage.getAttributes().logicalname, para_isvalid: para_isvalid.getAttributes().logicalname });

                const hide = tab16_section.append(block_advfind)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_advfind_hide', visible: `0`, para_fetchxml: para_fetchxml.getAttributes().logicalname, para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname, para_validationerrormessage: para_validationerrormessage.getAttributes().logicalname, para_isvalid: para_isvalid.getAttributes().logicalname });

                const tab16_tabheader = tab16.append(block_tabheader, { at: 0 })[0];
                const tab16_tabheader_label1 = tab16_tabheader.append(block_label)[0];
                tab16_tabheader_label1.setAttributes({ ...tab16_tabheader_label1.getAttributes(), rows: '1', label: `ADVANCED FIND (16/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab16_tabheader_label1' });
                const tab16_tabheader_label2 = tab16_tabheader.append(block_label)[0];
                tab16_tabheader_label2.setAttributes({ ...tab16_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays ADVANCED FIND controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab16_tabheader_label2' });
                const tab16_tabfooter = tab16.append(block_tabfooter)[0];
                const button_entity_optionset_previous = tab16_tabfooter.append(block_button)[0];
                button_entity_optionset_previous.setAttributes({ ...button_entity_optionset_previous.getAttributes(), logicalname: 'button_entity_optionset_previous', label: 'Previous [15] ENTITY OPTIONSET', eventid: event_onclick_entity_optionset_previous.getAttributes().uniqueid });
                const button_advfind_result_next = tab16_tabfooter.append(block_button)[0];
                button_advfind_result_next.setAttributes({ ...button_advfind_result_next.getAttributes(), logicalname: 'button_advfind_result_next', label: 'Next [17] ADVANCED FIND RESULT', eventid: event_onclick_advfind_result_next.getAttributes().uniqueid });
            }
            const tab17 = tabs.append(block_tab)[0];
            {
                tab17.setAttributes({ ...tab17.getAttributes(), logicalname: 'pl_tab_advfind_result' });
                const tab17_sections = tab17.findType("SectionsComponent")[0];
                const tab17_section = tab17_sections.findType("SectionComponent")[0];
                tab17_section.setAttributes({ ...tab17_section.getAttributes(), logicalname: 'pl_tab17_section', label: 'Section ADVANCED FIND RESULT', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const advfind_result1 = tab17_section.append(block_advfind_result)[0];
                advfind_result1.setAttributes({ ...advfind_result1.getAttributes(), logicalname: 'pl_advfind_result1', visible: '1', rows: 10, para_fetchxml: para_fetchxml.getAttributes().logicalname, para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname, para_layout_xml: para_layout_xml.getAttributes().logicalname, para_selected_records: para_selected_records.getAttributes().logicalname });
                const hide = tab17_section.append(block_advfind_result)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_advfind_result_hide', visible: `0`, para_fetchxml: para_fetchxml.getAttributes().logicalname, para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname, para_layout_xml: para_layout_xml.getAttributes().logicalname, para_selected_records: para_selected_records.getAttributes().logicalname });

                const tab17_tabheader = tab17.append(block_tabheader, { at: 0 })[0];
                const tab17_tabheader_label1 = tab17_tabheader.append(block_label)[0];
                tab17_tabheader_label1.setAttributes({ ...tab17_tabheader_label1.getAttributes(), rows: '1', label: `ADVANCED FIND RESULT (17/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab17_tabheader_label1' });
                const tab17_tabheader_label2 = tab17_tabheader.append(block_label)[0];
                tab17_tabheader_label2.setAttributes({ ...tab17_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays ADVANCED FIND RESULT controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab17_tabheader_label2' });
                const tab17_tabfooter = tab17.append(block_tabfooter)[0];
                const button_advfind_previous = tab17_tabfooter.append(block_button)[0];
                button_advfind_previous.setAttributes({ ...button_advfind_previous.getAttributes(), logicalname: 'button_advfind_previous', label: 'Previous [16] ADVANCED FIND', eventid: event_onclick_advfind_previous.getAttributes().uniqueid });
                const button_upload_next = tab17_tabfooter.append(block_button)[0];
                button_upload_next.setAttributes({ ...button_upload_next.getAttributes(), logicalname: 'button_upload_next', label: 'Next [18] UPLOAD', eventid: event_onclick_upload_next.getAttributes().uniqueid });
            }
            const tab18 = tabs.append(block_tab)[0];
            {
                tab18.setAttributes({ ...tab18.getAttributes(), logicalname: 'pl_tab_upload' });
                const tab18_sections = tab18.findType("SectionsComponent")[0];
                const tab18_section = tab18_sections.findType("SectionComponent")[0];
                tab18_section.setAttributes({ ...tab18_section.getAttributes(), logicalname: 'pl_tab18_section', label: 'Section UPLOAD', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const upload1 = tab18_section.append(block_upload)[0];
                upload1.setAttributes({ ...upload1.getAttributes(), logicalname: 'pl_upload1', label: 'Upload File', visible: '1', rows: 10, para_attachment_file_name: para_attachment_file_name.getAttributes().logicalname, para_uploaded_file_size: para_uploaded_file_size.getAttributes().logicalname });
                const hide = tab18_section.append(block_upload)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_upload_hide', label: 'HIDE', visible: `0`, para_attachment_file_name: para_attachment_file_name.getAttributes().logicalname, para_uploaded_file_size: para_uploaded_file_size.getAttributes().logicalname });

                const tab18_tabheader = tab18.append(block_tabheader, { at: 0 })[0];
                const tab18_tabheader_label1 = tab18_tabheader.append(block_label)[0];
                tab18_tabheader_label1.setAttributes({ ...tab18_tabheader_label1.getAttributes(), rows: '1', label: `UPLOAD (18/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab18_tabheader_label1' });
                const tab18_tabheader_label2 = tab18_tabheader.append(block_label)[0];
                tab18_tabheader_label2.setAttributes({ ...tab18_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays UPLOAD controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab18_tabheader_label2' });
                const tab18_tabfooter = tab18.append(block_tabfooter)[0];
                const button_advfind_result_previous = tab18_tabfooter.append(block_button)[0];
                button_advfind_result_previous.setAttributes({ ...button_advfind_result_previous.getAttributes(), logicalname: 'button_advfind_result_previous', label: 'Previous [17] ADVANCED FIND RESULT', eventid: event_onclick_advfind_result_previous.getAttributes().uniqueid });
                const button_advfind_and_result_next = tab18_tabfooter.append(block_button)[0];
                button_advfind_and_result_next.setAttributes({ ...button_advfind_and_result_next.getAttributes(), logicalname: 'button_advfind_and_result_next', label: 'Next [19] ADVANCED FIND AND RESULT', eventid: event_onclick_advfind_and_result_next.getAttributes().uniqueid });
            }
            const tab19 = tabs.append(block_tab)[0];
            {
                tab19.setAttributes({ ...tab19.getAttributes(), logicalname: 'pl_tab_advfind_and_result' });
                const tab19_sections = tab19.findType("SectionsComponent")[0];
                const tab19_section = tab19_sections.findType("SectionComponent")[0];
                tab19_section.setAttributes({ ...tab19_section.getAttributes(), logicalname: 'pl_tab19_section', label: 'Section ADVANCED FIND AND RESULT', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const advfind_and_result1 = tab19_section.append(block_advfind_and_result)[0];
                advfind_and_result1.setAttributes({ ...advfind_and_result1.getAttributes(), logicalname: 'pl_advfind_and_result1', label: 'ADVANCED FIND AND RESULT', visible: '1', para_fetchxml: para_fetchxml.getAttributes().logicalname, para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname });
                const hide = tab19_section.append(block_advfind_and_result)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_advfind_and_result_hide', label: 'HIDE', visible: `0`, para_fetchxml: para_fetchxml.getAttributes().logicalname, para_entitylogicalname: para_entitylogicalname.getAttributes().logicalname });

                const tab19_tabheader = tab19.append(block_tabheader, { at: 0 })[0];
                const tab19_tabheader_label1 = tab19_tabheader.append(block_label)[0];
                tab19_tabheader_label1.setAttributes({ ...tab19_tabheader_label1.getAttributes(), rows: '1', label: `ADVANCED FIND AND RESULT (19/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab19_tabheader_label1' });
                const tab19_tabheader_label2 = tab19_tabheader.append(block_label)[0];
                tab19_tabheader_label2.setAttributes({ ...tab19_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays ADVANCED FIND AND RESULT controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab19_tabheader_label2' });
                const tab19_tabfooter = tab19.append(block_tabfooter)[0];
                const button_upload_previous = tab19_tabfooter.append(block_button)[0];
                button_upload_previous.setAttributes({ ...button_upload_previous.getAttributes(), logicalname: 'button_upload_previous', label: 'Previous [18] UPLOAD', eventid: event_onclick_upload_previous.getAttributes().uniqueid });
                const button_multiselect_lookup_next = tab19_tabfooter.append(block_button)[0];
                button_multiselect_lookup_next.setAttributes({ ...button_multiselect_lookup_next.getAttributes(), logicalname: 'button_multiselect_lookup_next', label: 'Next [20] MULTISELECT LOOKUP', eventid: event_onclick_multiselect_lookup_next.getAttributes().uniqueid });
            }
            const tab20 = tabs.append(block_tab)[0];
            {
                tab20.setAttributes({ ...tab20.getAttributes(), logicalname: 'pl_tab_multiselect_lookup' });
                const tab20_sections = tab20.findType("SectionsComponent")[0];
                const tab20_section = tab20_sections.findType("SectionComponent")[0];
                tab20_section.setAttributes({ ...tab20_section.getAttributes(), logicalname: 'pl_tab20_section', label: 'Section MULTISELECT LOOKUP', labelwidth: 200, alignment: 'Left', position: 'Left' });

                const multiselect_lookup1 = tab20_section.append(block_multiselect_lookup)[0];
                multiselect_lookup1.setAttributes({ ...multiselect_lookup1.getAttributes(), logicalname: 'pl_multiselect_lookup1', label: 'MULTISELECT LOOKUP', visible: '1', para_targetentities: para_targetentities.getAttributes().logicalname, para_selectedentities: para_selectedentities.getAttributes().logicalname, para_disablemru: para_disablemru.getAttributes().logicalname, para_isdisabled: para_isdisabled.getAttributes().logicalname });
                const hide = tab20_section.append(block_multiselect_lookup)[0];
                hide.setAttributes({ ...hide.getAttributes(), logicalname: 'pl_multiselect_lookup_hide', label: 'HIDE', visible: '0', para_targetentities: para_targetentities.getAttributes().logicalname, para_selectedentities: para_selectedentities.getAttributes().logicalname, para_disablemru: para_disablemru.getAttributes().logicalname, para_isdisabled: para_isdisabled.getAttributes().logicalname });

                const tab20_tabheader = tab20.append(block_tabheader, { at: 0 })[0];
                const tab20_tabheader_label1 = tab20_tabheader.append(block_label)[0];
                tab20_tabheader_label1.setAttributes({ ...tab20_tabheader_label1.getAttributes(), rows: '1', label: `MULTISELECT LOOKUP (20/${totalTabs})`, visible: '1', disabled: `0`, istitle: '1', logicalname: 'tab20_tabheader_label1' });
                const tab20_tabheader_label2 = tab20_tabheader.append(block_label)[0];
                tab20_tabheader_label2.setAttributes({ ...tab20_tabheader_label2.getAttributes(), rows: '1', label: `This tab displays MULTISELECT LOOKUP controls that you can add to a SECTION.`, visible: '1', disabled: `0`, istitle: '0', logicalname: 'tab20_tabheader_label2' });
                const tab20_tabfooter = tab20.append(block_tabfooter)[0];
                const button_advfind_and_result_previous = tab20_tabfooter.append(block_button)[0];
                button_advfind_and_result_previous.setAttributes({ ...button_advfind_and_result_previous.getAttributes(), logicalname: 'button_advfind_and_result_previous', label: 'Previous [19] ADVANCED FIND AND RESULT', eventid: event_onclick_advfind_and_result_previous.getAttributes().uniqueid });
                //const button_multiselect_lookup_next = tab14_tabfooter.append(block_button)[0];
                //button_multiselect_lookup_next.setAttributes({ ...button_multiselect_lookup_next.getAttributes(), logicalname: 'button_multiselect_lookup_next', label: 'Next [20] MULTISELECT LOOKUP', eventid: event_onclick_multiselect_lookup_next.getAttributes().uniqueid });
            }
        }
        return {
            async run(editor, sender) {
                setTimeout(() => { editor.stopCommand('command_demo'); }, 1);
                try {
                    var result = await Crm.ShowConfirm("Please confirm whether you want to clear the editor and create all the controls that can be generated using the Dataverse Dialog Builder.\n\nOnce you've added the controls to the editor, click the 'Save & Publish' button and then the 'Preview' button to review all the controls created by the Dataverse Dialog Builder.");
                    if (result.confirmed) {
                        editor.runCommand('core:canvas-clear');
                        await createDemoDialog();
                    }
                }
                catch {
                    editor.runCommand('core:canvas-clear');
                    await createDemoDialog();
                }
            },
            stop(editor, sender) {
                editor.Panels.getButton('options_left', 'button_demo').active = false;
            }
        }
    }
    commands.add('command_demo', commandDemo(editor, opts));

    const commandLogicalName = (editor, opts) => {
        const re_render = () => {
            editor.getComponents().map((c) => {
                c.view.render();
            });
        }
        return {
            run(editor, sender) {
                re_render();
            },
            stop(editor, sender) {
                re_render();
            }
        }
    }
    commands.add('command_logicalname', commandLogicalName(editor, opts));

    const command_save_publish = (editor, opts) => {
        return {
            async run(editor, sender) {
                setTimeout(() => { editor.stopCommand('command_save_publish'); }, 1);
                Crm.ShowProcessing("Saving ...");
                const metadata = editor.getComponents().filter(c => c.attributes.type === 'MetadataComponent')[0].getAttributes();
                var input = {
                    logical_name: metadata.logicalname,
                    description: metadata.description,
                    full_description: metadata.fulldescription,
                    version: metadata.version,
                    from_xml: Helper.GetFormXml(editor)
                };
                var parameters = {};
                parameters.f = "UpsertDialog";
                parameters.input = JSON.stringify(input);
                var req = new XMLHttpRequest();
                var version = Crm.getXrm().Utility.getGlobalContext().getVersion().substring(0, 3);
                req.open("POST", Crm.getXrm().Utility.getGlobalContext().getClientUrl() + `/api/data/v${version}/pl_DataverseDialogBuilder`, true);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Accept", "application/json");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200 || this.status === 204) {
                            Crm.ShowProcessing("Publishing ...");
                            var output = JSON.parse(JSON.parse(this.responseText).output);
                            var parameters2 = {};
                            parameters2.ParameterXml = `<importexportxml><dialogs><dialog>${output.form_id}</dialog></dialogs></importexportxml>`;
                            var req2 = new XMLHttpRequest();
                            req2.open("POST", Crm.getXrm().Utility.getGlobalContext().getClientUrl() + `/api/data/v${version}/PublishXml`, true);
                            req2.setRequestHeader("OData-MaxVersion", "4.0");
                            req2.setRequestHeader("OData-Version", "4.0");
                            req2.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                            req2.setRequestHeader("Accept", "application/json");
                            req2.onreadystatechange = function () {
                                if (this.readyState === 4) { Crm.HideProcessing(); }
                            };
                            req2.send(JSON.stringify(parameters2));
                        } else {
                            Crm.HideProcessing();
                            Crm.ShowAlert(JSON.parse(this.responseText).error.message);
                        }
                    }
                };
                req.send(JSON.stringify(parameters));
            },
            stop(editor, sender) {
                editor.Panels.getButton('options', 'button_save_publish').active = false;
            },
        };
    }
    commands.add('command_save_publish', command_save_publish(editor, opts));

    const command_preview = (editor, opts) => {
        return {
            async run(editor, sender) {
                setTimeout(() => { editor.stopCommand('command_preview'); }, 1);
                await Crm.getXrm().Navigation.openDialog('pl_dataversedialogbuilder_preview', { position: 1, width: 150, height: 240 }, {});
                const session = JSON.parse(sessionStorage.getItem('pl_dataversedialogbuilder_preview'));
                if (session.button_click === 'ok')
                {
                    let parameters = {};
                    const metadata = editor.getComponents().filter(c => c.attributes.type === 'MetadataComponent')[0].getAttributes();
                    const options = { position: 1, width: session.width, height: session.height};
                    if (metadata.logicalname === 'pl_dataversedialogbuilder_demo') {
                        parameters = {
                            pl_para_entitylogicalname: "account",
                            pl_para_fetchxml: "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\"><entity name=\"account\"><attribute name=\"name\" /><attribute name=\"telephone1\" /><attribute name=\"accountid\" /><attribute name=\"primarycontactid\"/><order attribute=\"name\" descending=\"false\" /></entity></fetch>",
                            pl_para_validationerrormessage: "",
                            pl_para_isvalid: true,
                            pl_para_layout_xml: "<grid name=\"resultset\" object=\"1\" jump=\"name\" select=\"1\" icon=\"1\" preview=\"1\"><row name=\"result\" id=\"accountid\"><cell name=\"name\" width=\"300\" /><cell name=\"primarycontactid\" width=\"125\" /><cell name=\"telephone1\" width=\"125\" /></row></grid>",
                            pl_para_selected_records: '',
                            pl_para_entity_type: ''
                        };
                    }
                    Crm.getXrm().Navigation.openDialog(metadata.logicalname, options, parameters);
                }
            },
            stop(editor, sender) {
                editor.Panels.getButton('options', 'button_preview').active = false;
            },
        };
    }
    commands.add('command_preview', command_preview(editor, opts));
}

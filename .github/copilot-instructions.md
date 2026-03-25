# Dataverse Dialog Builder – Copilot Instructions

## Project Overview

WYSIWYG builder for Microsoft Dataverse custom dialogs using two stable (unsupported) APIs:
- `Xrm.Navigation.openDialog(...)`
- `formContext.ui.moveTo(...)`

Stack: **GrapesJS** (frontend plugin, TypeScript/JS) + **C# .NET Framework 4.6.2** (Dataverse plugin & web resources) + **DynamicsCrm.DevKit** (solution management).

## Architecture

```
DataverseDialogBuilder.GrapesJS/       # Main UI — GrapesJS plugin (npm)
DataverseDialogBuilder.WebResource/    # Compiled web resources deployed to Dataverse
DataverseDialogBuilder.CustomAction/   # Synchronous Dataverse plugin (dispatcher for server-side metadata API)
DataverseDialogBuilder.Console/        # CLI utilities and debug helpers
DataverseDialogBuilder.Shared/         # Shared C# entity classes (auto-generated)
DataverseDialogBuilder.SolutionPackager/  # Solution pack/extract tooling
DataverseDialogBuilder.Examples/       # Example implementations
```

## Build & Dev Commands

```bash
# GrapesJS plugin (run inside DataverseDialogBuilder.GrapesJS/)
npm install
npm run start          # Dev server with hot reload
npm run build          # Compile to dist/
npm run bump           # Bump patch version

# Deploy web resources (from DataverseDialogBuilder.WebResource/)
BUILD_AND_DEPLOY_ALL.bat
```

C# projects: open `DataverseDialogBuilder.sln` in Visual Studio 2022, restore NuGet, build normally.

## Code Conventions

### GrapesJS Controls (24 controls in `src/components/control/`)
Each control file exports a single factory function `(editor, options) => { type, methods }`:

```javascript
export default (editor, options) => ({
    type: 'ControlNameComponent',
    methods: {
        isComponent: (el) => el.classList?.contains('DDBControlClassName'),
        model: {
            defaults: {
                name: 'Display Name',
                classes: ['DDBControlClassName'],
                copyable: true, draggable: '.DDBSection', droppable: false,
                traits: [
                    { type: 'text-readonly', name: 'uniqueid', label: 'Unique Id' },
                    { type: 'text', name: 'logicalname', label: 'Logical Name' },
                    // ...
                ]
            },
            init() { /* set uniqueid via uuid() on creation */ },
            toFormXml() { /* returns FormXML string for this control */ }
        },
        view: {
            onRender({ el, model }) { /* DOM render logic */ }
        }
    }
});
```

**Key files:**
- `src/guid.js` — fixed Dataverse `classid` GUIDs for each control type (do not change these)
- `src/const.js` — UI strings, SVG icons, default dialog HTML template (`NewDDB`)
- `src/helper.js` — shared utilities
- `src/blocks.js` — GrapesJS drag-palette block definitions
- `src/commands.js` / `src/commands_button.js` — save/load/export XML commands
- `src/traits.js` — custom GrapesJS trait types

### FormXML Pattern
Controls generate XML consumed by Dataverse:
```xml
<row>
  <cell id='{guid}' visible='true'>
    <labels><label description='Label' languagecode='1033' /></labels>
    <control uniqueid='{guid}' id='logicalname' classid='{GUID from guid.js}' />
  </cell>
</row>
```

### File Naming
- JS/TS files: **camelCase** (`richtextbox.js`, `guid.js`)
- C# files: **PascalCase** (`Organization.generated.cs`)
- Constants/configs: descriptive names (`RTEGlobalConfiguration.js`)

### C# Custom Action
`PostDataverseDialogBuilderSynchronous.cs` dispatches on input parameter `f` to static methods on `Action`:
routes `GetObjectTypeCode`, `GetViewId`, `GetGlobalOptionSet`, `UpsertDialog`, etc.
When adding server-side features, add a new `case` in the dispatcher and a static method in `Action.cs`.

## Linting / Type Checking
- TypeScript strict mode is on (`tsconfig.json` — target `es5`, `strict: true`, outDir `./dist`)
- ESLint `^9.3.0` is installed but **no config file exists yet** — do not assume lint scripts work
- No pre-commit hooks — validate manually before committing

## References
- [Wiki](https://github.com/phuocle/Dataverse-Dialog-Builder/wiki)
- [Install Guide](https://github.com/phuocle/Dataverse-Dialog-Builder/wiki/Install-Dataverse-Dialog-Builder)
- [Controls Documentation](https://github.com/phuocle/Dataverse-Dialog-Builder/wiki/Controls)

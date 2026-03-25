# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WYSIWYG builder for Microsoft Dataverse custom dialogs. Uses two stable but unsupported APIs: `Xrm.Navigation.openDialog(...)` and `formContext.ui.moveTo(...)`. Dialogs are system forms with type `8` (FormXML).

Stack: **GrapesJS** plugin (TypeScript/JS frontend) + **C# .NET Framework 4.6.2** (Dataverse plugin & web resources) + **DynamicsCrm.DevKit** (deployment tooling).

## Build & Dev Commands

```bash
# GrapesJS plugin (run inside DataverseDialogBuilder.GrapesJS/)
npm install
npm run start          # Dev server with hot reload
npm run build          # Compile plugin to dist/

# Full build + deploy web resources (from DataverseDialogBuilder.WebResource/)
BUILD_AND_DEPLOY_ALL.bat   # builds GrapesJS -> copies to WebResource -> deploys via devkit CLI

# C# plugin debug deploy (from DataverseDialogBuilder.CustomAction/)
deploy.debug.bat

# Solution packaging (from DataverseDialogBuilder.SolutionPackager/)
Extract-then-Pack-DataverseDialogBuilder.bat
```

C# projects: open `DataverseDialogBuilder.sln` in Visual Studio 2022, restore NuGet packages, build. Target framework is .NET Framework 4.6.2.

No automated tests exist. No CI/CD pipeline. ESLint is installed but has no config file. TypeScript strict mode is on.

## Architecture

| Project | Purpose |
|---------|---------|
| `DataverseDialogBuilder.GrapesJS/` | Main UI - GrapesJS plugin (npm package). Source in `src/`, builds to `dist/index.js` |
| `DataverseDialogBuilder.WebResource/` | Compiled web resources deployed to Dataverse (html/js/css/images) |
| `DataverseDialogBuilder.CustomAction/` | Synchronous Dataverse plugin - server-side metadata API dispatcher |
| `DataverseDialogBuilder.Console/` | CLI utilities and debug helpers |
| `DataverseDialogBuilder.Shared/` | Shared C# entity classes (`.shproj`, includes auto-generated code) |
| `DataverseDialogBuilder.SolutionPackager/` | Dataverse solution pack/extract |
| `DataverseDialogBuilder.Others/` | 326+ reference dialog FormXML files from Microsoft first-party apps |
| `DataverseDialogBuilder.Examples/` | Example implementations with their own solution |

### Build Pipeline

`BUILD_AND_DEPLOY_ALL.bat` orchestrates: `grapesjs-cli build` in GrapesJS dir -> copies `dist/index.js`, CSS, HTML to WebResource dir -> transforms HTML comments for Dataverse deployment -> updates CSS paths -> deploys via `devkit webresource`.

### GrapesJS Plugin Architecture (`src/`)

Entry point: `src/index.js` - loads all subsystems and registers editor event handlers (clone, add, select).

- `src/components/` - Component types registered with GrapesJS editor
  - `control/` - 24 control types (button, textbox, lookup, optionset, subgrid, etc.)
  - `container/` - 8 container types (header, footer, section, tab, etc.)
  - `metadata/` - Metadata components (event, javascript, parameter, pcf)
- `src/blocks.js` - Drag palette block definitions
- `src/commands.js` / `src/commands_button.js` - Save/load/export FormXML commands
- `src/traits.js` - Custom GrapesJS trait types for the properties panel
- `src/guid.js` - Fixed Dataverse `classid` GUIDs per control type (**never change these**)
- `src/const.js` - UI strings, SVG icons, default dialog HTML template (`NewDDB`)
- `src/crm.js` - Dataverse interaction layer
- `src/helper.js` - Shared utilities

Each control file exports a factory: `(editor, options) => { type, methods }` with `isComponent()`, `model.defaults` (traits, drag rules), `model.toFormXml()`, and `view.onRender()`.

### C# Plugin Dispatcher

`PostDataverseDialogBuilderSynchronous.cs` receives custom action calls with input parameter `f` (function name) and `input` (JSON payload), dispatches to static methods on `Action.cs`. Routes include: `GetObjectTypeCode`, `GetViewId`, `GetGlobalOptionSet`, `UpsertDialog`, `GetForm`, `GetLanguageCode`, etc.

To add a server-side feature: add a `case` in the switch and a corresponding static method in `Action.cs`.

## Commit Convention

Conventional commits with emoji prefix: `<emoji> <type>(<scope>): <description>`

Types: `feat`, `fix`, `docs`, `refactor`, `style`, `perf`, `test`, `chore`, `wip`, `remove`, `hotfix`, `security`

## Key Constraints

- GrapesJS control GUIDs in `src/guid.js` are Dataverse system identifiers - do not modify
- `.generated.cs` files in `Shared/Entities/` are auto-generated from Dataverse metadata via `generator.bat` - do not hand-edit
- `DynamicsCrm.DevKit.Cli.json` contains deployment profiles referenced by build scripts
- The HTML template in `_index.html` uses comment markers (`BEGIN COMMENT`/`END COMMENT`/`BEGIN UNCOMMENT`/`END UNCOMMENT`) that get transformed during build for Dataverse deployment - preserve these markers

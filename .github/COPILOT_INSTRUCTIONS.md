# Copilot Instructions for Dataverse Dialog Builder

## Project Overview

Dataverse Dialog Builder is a WYSIWYG tool for creating Microsoft Dataverse custom dialogs. It provides a visual interface to build dialogs similar to Out-of-the-Box (OOB) dialogs like "Assign dialog" and "Close Opportunity dialog" using unsupported but stable Microsoft APIs.

**Key Technologies:**
- **Backend**: C# .NET (Web Resources, Custom Actions, Console apps)
- **Frontend**: JavaScript with GrapesJS visual editor
- **Platform**: Microsoft Dataverse/Power Platform
- **Tooling**: DynamicsCrm.DevKit for solution management

## Project Architecture

```
DataverseDialogBuilder/
├── DataverseDialogBuilder.Console/          # Console application for CLI operations
├── DataverseDialogBuilder.CustomAction/     # Dataverse custom actions
├── DataverseDialogBuilder.Examples/         # Example implementations
├── DataverseDialogBuilder.GrapesJS/         # JavaScript visual editor (main UI)
├── DataverseDialogBuilder.Others/           # Documentation and reference files
├── DataverseDialogBuilder.Shared/           # Shared C# entities and utilities
├── DataverseDialogBuilder.SolutionPackager/ # Solution packaging utilities
├── DataverseDialogBuilder.WebResource/      # Web resources for Dataverse
└── DataverseDialogBuilder.sln               # Main Visual Studio solution
```

## Core Functionality

The project enables creation of custom dialogs using two undocumented Microsoft APIs:
- `Xrm.Navigation.openDialog(...)`
- `formContext.ui.moveTo(...)`

These APIs are considered "unsupported code" but have been stable since 2018 and are used by Microsoft's first-party applications.

## Development Environment Setup

### Prerequisites
1. **Windows development environment** (required for .NET Framework 4.6.2)
2. **Visual Studio 2022** with .NET Framework development workload
3. **Node.js** (for GrapesJS frontend development)
4. **Microsoft Dataverse developer environment**
5. **DynamicsCrm.DevKit** (included in solution)

### Getting Started
1. Clone the repository to a Windows machine
2. Open `DataverseDialogBuilder.sln` in Visual Studio 2022
3. Restore NuGet packages and build solution (requires .NET Framework 4.6.2)
4. Navigate to `DataverseDialogBuilder.GrapesJS/` folder
5. Run `npm install` to install JavaScript dependencies
6. Run `npm run start` for local development of the visual editor
7. Use `BUILD_AND_DEPLOY_ALL.bat` in WebResource folder for deployment

### Cross-Platform Development Notes
- **JavaScript/GrapesJS components**: Can be developed on any platform with Node.js
- **.NET Framework components**: Require Windows with Visual Studio
- **Solution deployment**: Must be done from Windows environment

## Code Structure and Conventions

### C# Projects
- **Entities**: Auto-generated Dataverse entity classes in `DataverseDialogBuilder.Shared/Entities/`
- **Custom Actions**: Business logic in `DataverseDialogBuilder.CustomAction/`
- **Web Resources**: Dataverse web resources in `DataverseDialogBuilder.WebResource/`
- **Console Tools**: CLI utilities in `DataverseDialogBuilder.Console/`

### JavaScript/GrapesJS Structure
- **Components**: UI components in `src/components/`
- **Controls**: Dialog controls (textbox, label, button, etc.) in `src/components/control/`
- **Commands**: Editor commands in `src/commands.js`
- **Blocks**: Draggable blocks in `src/blocks.js`
- **Helpers**: Utility functions in `src/helper.js`
- **Constants**: GUID mappings and constants in `src/guid.js`

### File Naming Conventions
- **C# Files**: PascalCase (e.g., `Organization.generated.cs`)
- **JavaScript Files**: camelCase (e.g., `richtextbox.js`, `spacer.js`)
- **Configuration Files**: Descriptive names (e.g., `RTEGlobalConfiguration.js`)

## Key Design Patterns

### Control System
Each dialog control follows a consistent pattern:
```javascript
export default (editor, options) => ({
    type: 'ControlNameComponent',
    methods: {
        isComponent: (el) => { /* detection logic */ },
        model: {
            defaults: { /* default properties */ },
            init() { /* initialization */ },
            toFormXml() { /* XML generation */ }
        },
        view: {
            onRender({ el, model }) { /* rendering logic */ }
        }
    }
});
```

### Form XML Generation
Controls generate FormXML that Dataverse understands:
```xml
<row>
    <cell id='{guid}' visible='true'>
        <labels>
            <label description='Label Text' languagecode='1033' />
        </labels>
        <control uniqueid='{guid}' id='logicalname' classid='{control-guid}' />
    </cell>
</row>
```

## Build and Deployment

### Local Development
- Use `npm run start` in GrapesJS folder for local testing with hot reload
- Use Visual Studio for C# development and debugging
- JavaScript builds use TypeScript configuration with strict mode enabled

### Linting and Code Quality
- ESLint is included as a devDependency but no configuration file exists yet
- TypeScript strict mode enforces type safety
- Follow existing code patterns and conventions for consistency
- Consider setting up ESLint configuration for JavaScript code quality
- No pre-commit hooks configured - manual validation recommended

### Deployment to Dataverse
1. Build the solution in Visual Studio
2. Run `npm run build` to compile JavaScript components
3. Run `BUILD_AND_DEPLOY_ALL.bat` from WebResource folder
4. This compiles JavaScript, packages web resources, and deploys to Dataverse

### Solution Management
- Uses DynamicsCrm.DevKit for solution packaging
- Configuration in `DynamicsCrm.DevKit.*.json` files
- Supports both managed and unmanaged solutions

## Testing Guidelines

### Manual Testing
- Create test dialogs using the visual editor
- Verify XML generation is correct
- Test dialog functionality in Dataverse environment
- Validate across different form factors (desktop, mobile, Outlook)

### Code Quality
- Follow existing code patterns and conventions
- Ensure generated FormXML validates against Dataverse schema
- Test with various control combinations
- Verify backward compatibility with existing dialogs

## Common Issues and Solutions

### Unsupported API Concerns
- The project uses two undocumented APIs that are stable but unsupported
- Microsoft uses these same APIs in their first-party applications
- Risk is considered low based on 6+ years of stability

### Control Development
- Each control must implement proper XML generation
- Follow existing control patterns for consistency
- Ensure proper GUID mapping in `src/guid.js`
- Test rendering in both editor and runtime environments

### Deployment Issues
- Ensure Dataverse connection is properly configured
- Verify solution permissions and dependencies
- Check web resource references and paths

## Contribution Guidelines

### Making Changes
1. Follow established patterns for new controls or features
2. Update documentation for significant changes
3. Test thoroughly in development environment
4. Ensure generated XML is valid and follows conventions

### Code Review Focus Areas
- FormXML generation correctness
- Control rendering consistency
- Performance impact on large dialogs
- Cross-platform compatibility
- Backward compatibility with existing dialogs

### Best Practices
- Minimize dependencies and keep solution lightweight
- Follow Microsoft Dataverse development best practices
- Maintain consistency with OOB dialog patterns
- Document any new control types or significant features

## Security Considerations

- Web resources are deployed to Dataverse and inherit platform security
- No sensitive data should be stored in client-side code
- Follow Dataverse security model for data access
- Validate all user inputs in control implementations

## Performance Considerations

- Large dialogs with many controls may impact performance
- Optimize JavaScript bundle size for web resources
- Consider lazy loading for complex control types
- Test performance with realistic dialog sizes

## References

- [Project Wiki](https://github.com/phuocle/Dataverse-Dialog-Builder/wiki)
- [Install Guide](https://github.com/phuocle/Dataverse-Dialog-Builder/wiki/Install-Dataverse-Dialog-Builder)
- [Usage Guide](https://github.com/phuocle/Dataverse-Dialog-Builder/wiki/Use-Dataverse-Dialog-Builder)
- [Controls Documentation](https://github.com/phuocle/Dataverse-Dialog-Builder/wiki/Controls)
- [Community Blog Posts](https://bguidinger.com/blog/custom-dialog-boxes-part-1) (Historical reference)
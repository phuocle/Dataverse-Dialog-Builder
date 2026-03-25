@echo off
devkit solution --sdk-login --json "..\DynamicsCrm.DevKit.Cli.json" --profile "Extract-DataverseDialogBuilder"
powershell -Command "(gc DataverseDialogBuilder\Both\Other\Customizations.xml) -replace '    <Language>1066</Language>', '' | Out-File -encoding UTF8 DataverseDialogBuilder\Both\Other\Customizations.xml"
devkit solution --sdk-login --json "..\DynamicsCrm.DevKit.Cli.json" --profile "Pack-DataverseDialogBuilder"
exit
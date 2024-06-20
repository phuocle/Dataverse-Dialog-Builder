@echo off
for /f "delims=" %%d in ('dir /a:d /o:-n /s ..\packages\DynamicsCrm.DevKit.Cli.* /b') do (
    set DynamicsCrmDevKitCli=%%d
    goto break
)
:break
cd ..
cd DataverseDialogBuilder.GrapesJS
call grapesjs-cli build
copy dist\index.js ..\DataverseDialogBuilder.WebResource\js\DataverseDialogBuilder.js /y
copy public\lib\DataverseDialogBuilder.css ..\DataverseDialogBuilder.WebResource\css\DataverseDialogBuilder.css /y
copy _index.html ..\DataverseDialogBuilder.WebResource\html\DataverseDialogBuilder.html /y
cd ..
cd DataverseDialogBuilder.WebResource
powershell -Command "(gc html\DataverseDialogBuilder.html) -replace '<!--- BEGIN COMMENT -->', '<!--- BEGIN COMMENT' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
powershell -Command "(gc html\DataverseDialogBuilder.html) -replace '<!--- END COMMENT -->', 'END COMMENT -->' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
powershell -Command "(gc html\DataverseDialogBuilder.html) -replace '<!--- BEGIN UNCOMMENT', '<!-- -->' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
powershell -Command "(gc html\DataverseDialogBuilder.html) -replace 'END UNCOMMENT -->', '<!-- -->' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
powershell -Command "(gc html\DataverseDialogBuilder.html) -replace 'lib/DataverseDialogBuilder.css', '../../pl_/css/DataverseDialogBuilder.css' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
"%DynamicsCrmDevKitCli%\tools\DynamicsCrm.DevKit.Cli.exe" /sdklogin:"yes" /json:"..\DynamicsCrm.DevKit.Cli.json" /type:"webresources" /profile:"BUILD_AND_DEPLOY_ALL"
exit
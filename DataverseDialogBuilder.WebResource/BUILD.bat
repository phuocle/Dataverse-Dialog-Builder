@echo off
setlocal

pushd "%~dp0\..\DataverseDialogBuilder.GrapesJS" || exit /b 1
call .\node_modules\.bin\grapesjs-cli.cmd build
if errorlevel 1 goto :grapesjsBuildFailed

copy dist\index.js ..\DataverseDialogBuilder.WebResource\js\DataverseDialogBuilder.js /y
if errorlevel 1 goto :grapesjsBuildFailed
copy public\lib\DataverseDialogBuilder.css ..\DataverseDialogBuilder.WebResource\css\DataverseDialogBuilder.css /y
if errorlevel 1 goto :grapesjsBuildFailed
copy _index.html ..\DataverseDialogBuilder.WebResource\html\DataverseDialogBuilder.html /y
if errorlevel 1 goto :grapesjsBuildFailed
popd

pushd "%~dp0" || exit /b 1
powershell -NoProfile -Command "(gc html\DataverseDialogBuilder.html) -replace '<!--- BEGIN COMMENT -->', '<!--- BEGIN COMMENT' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
if errorlevel 1 goto :webResourceBuildFailed
powershell -NoProfile -Command "(gc html\DataverseDialogBuilder.html) -replace '<!--- END COMMENT -->', 'END COMMENT -->' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
if errorlevel 1 goto :webResourceBuildFailed
powershell -NoProfile -Command "(gc html\DataverseDialogBuilder.html) -replace '<!--- BEGIN UNCOMMENT', '<!-- -->' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
if errorlevel 1 goto :webResourceBuildFailed
powershell -NoProfile -Command "(gc html\DataverseDialogBuilder.html) -replace 'END UNCOMMENT -->', '<!-- -->' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
if errorlevel 1 goto :webResourceBuildFailed
powershell -NoProfile -Command "(gc html\DataverseDialogBuilder.html) -replace 'lib/DataverseDialogBuilder.css', '../../pl_/css/DataverseDialogBuilder.css' | Out-File -encoding UTF8 html\DataverseDialogBuilder.html"
if errorlevel 1 goto :webResourceBuildFailed
popd
exit /b 0

:grapesjsBuildFailed
set "buildExitCode=%errorlevel%"
popd
exit /b %buildExitCode%

:webResourceBuildFailed
set "buildExitCode=%errorlevel%"
popd
exit /b %buildExitCode%

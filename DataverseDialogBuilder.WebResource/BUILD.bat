@echo off
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
exit
<#

    This powershell core script contains all steps neccessary 
    to set this project up.

#>

# Install all npm packages
Set-Location ./Source
npm install
# Install nodemon globally
Set-Location ..
npm install nodemon -g

Write-Host "Project is ready to run."
Write-Host "Start run.ps1 to start the app."

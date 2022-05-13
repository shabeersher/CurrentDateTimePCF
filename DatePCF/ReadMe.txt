Instructions to execute the PCF code

1- Download the entire repository from the github
2- Extract the entire repository into a safe folder on your machine.

Updating respository code with all the dependencies
1- Navigate to the directory folder of the PCF in Node.js Command Prompt
2- Enter the following command "npm install update"
Note: This command will install all the necessary dependencies required by the project

Executing the project
1- Open Visual Studio Code and open the folder of the PCF code in VSCode
2- Navigate to the directory folder of the PCF in Node.js Command Prompt
3- To build the project, enter the command "npm run-script build"
4- To execute the project on your machine, enter the command "npm run start watch"

Deploying the project to CRM
1- Open Visual Studio Code and open the folder of the PCF code in VSCode
2- Navigate to the directory folder of the PCF in Node.js Command Prompt
3- To build the project, enter the command "npm run-script build"
4- Open "Developer Command Prompt for VSCode" and navigate to the root folder of the project
5- Enter the command "pac auth create --url <<CRM URL>>  
Note: Replace <<CRM URL>> with your CRM URL. example: pac auth create --url https://orged9ef146.crm.dynamics.com/
6- Enter your CRM credentials
7- Enter the command "pac auth list" to make sure you are connected to CRM
8- Enter the command "pac pcf push --publisher-prefix <<publisher prefix>> --force-import"
Note: Replace <<publisher prefix>> with your publisher prefix. example pac pcf push --publisher-prefix ava --force-import

Updating PCF
1- Change the version number of the PCF in the ControlManifest file
2- Rebuild the project
3- Deploy the project to CRM
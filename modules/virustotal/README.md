
The following two steps can be skipped if claudia is already installed and configured

- Installing Node.js , npm and claudia
  - Follow the steps on http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/ to install Node.js 4.3.2 version and npm
  - Follow the steps in https://claudiajs.com/tutorials/installing.html to properly install and configure claudia.

- Note- A lot of errors come if step 2 in above is not executed properly. 

After the previous step in /module folder copy virustotal folder in ec2 machine and  continue with the following steps- 

- Renaming following variables/tokens in nodejsvirtualbotdelay.js (line 3,4)

	- VIRUSTOTAL.PUBLICKEYACCESS <br>
		1-create an account on https://www.virustotal.com <br>
		2-put the "My API KEY" in this place as a string. 

	- AWS.S3.BUCKET- This is the name of the S3 BUCKET created in AWS.

- Commands for installing npm packages

	- sudo npm install claudia-bot-builder -S <br>
	- sudo npm install promise -S <br>
	- sudo npm install aws-sdk -S <br>
	- sudo npm install promise-delay -S <br>
	- sudo npm install node-virustotal -S <br>
	- sudo npm install natural -S <br>
	- sudo npm install crypto -S <br>

- Initialize the npm for creating package.json. Package.json contains all dependencies for deployment via claudia.

	- sudo npm init<br>
	
	Note- After entering the above command the following attributes will pop up which needs to be entered - <br>

	name- nodejsvirtualbotdelay [hit enter]<br>
	version- [hit enter]<br>
	description- [hit enter]<br>
	git repository- [hit enter]<br>
	keywords- [hit enter]<br>
	author- [hit enter]<br>
	liscence - [hit enter]<br>

	is this ok? [hit enter]

- Claudia create-

	claudia create --api-module nodejsvirtualbotdelay --region us-east-2 --timeout 120 --allow-recursion

	- note- <br>
		- make sure the --region is correct according to your ec2.<br>
		- nodejsvirtualbotdelay is the javascript file mentioned in sudo npm init and is the first file called after claudia deploys the bot.<br>

- Claudia update 
   
    claudia update  --configure-slack-slash-command

    - note- <br>
    	-Copy the verification token of the application from slack in the **Basic Information** page
    	- webhook as "json"
    - Test out slack command.
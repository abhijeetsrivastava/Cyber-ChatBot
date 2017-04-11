
The following two steps can be skipped if claudia is already installed and configured

- Installing Node.js , npm and claudia
  - Follow the steps on http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/ to install Node.js 4.3.2 version and npm
  - Follow the steps in https://claudiajs.com/tutorials/installing.html to properly install and configure claudia.

- Note- A lot of errors come if step 2 in above is not executed properly. 

After the previous step you can copy flask folder in ec2 machine and continue with the following steps- 

- Renaming few variables/tokens in bot.js (line 3,4)

	- AWS.S3.BUCKET- This is the name of the S3 BUCKET created in AWS.

- Commands for installing npm packages

	- sudo npm install claudia-bot-builder -S <br>
	- sudo npm install crypto -S <br>
	- sudo npm install node-fetch -S <br>
	- sudo npm install aws-sdk --S <br>
	- sudo npm install natural -S <br>

- Initialize the npm for creating package.json. Package.json contains all dependencies for deployment via claudia.

	- sudo npm init<br>
	
	Note- After entering the above command the following attributes will pop up which needs to be entered - <br>

	name- bot [hit enter]<br>
	version- [hit enter]<br>
	description- [hit enter]<br>
	git repository- [hit enter]<br>
	keywords- [hit enter]<br>
	author- [hit enter]<br>
	liscence - [hit enter]<br>

	is this ok? [hit enter]

- Claudia create-

	sudo claudia create --api-module bot --region us-east-1 

	- note- <br>
		- make sure the --region is correct according to your ec2.<br>
		- bot is the javascript file mentioned in sudo npm init and is the first file called after claudia deploys the bot.<br>

- Claudia update 
   
    claudia update  --configure-slack-slash-command

    - note- <br>
    	- Copy the verification token of the application from slack in the **Basic Information** page
    	- webhook as "json"
    - Test out slack command.




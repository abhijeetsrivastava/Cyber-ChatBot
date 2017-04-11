The following steps needs to be followed-

Steps:
- Installing Node.js , npm 
  - Follow the steps on http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/ to install Node.js 4.3.2 version and npm

After the previous step copy file_upload folder in ec2 machine and then do the following steps- 

- Changing the variables with the tokens/name of bucket

	- APPLICATION.TOKEN - This is the slack application token
	- AWS.S3.BUCKET- This is the name of the S3 BUCKET created in AWS.
	- SLACK.BOT.TOKEN - This is the token of the slack bot created.

- Installing npm packages-

	- sudo npm install @slack/client --save <br>
	- sudo npm install fs --save <br>
	- sudo npm install node-fetch --save <br>
	- sudo npm install https --save <br>
	- sudo npm install aws-sdk --save <br>

- Running file_upload as a process
  We need to run this so that the slack bot user becomes online and can listen for any file uploads- 
  	- check if forever is installed by using the command
  		- forever --version
  		- if forever is not installed 
  			sudo npm install forever -g

	- forever file_upload_final.js
		Now the bot user will be online forever.
      



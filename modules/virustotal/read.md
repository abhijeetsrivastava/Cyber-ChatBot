Steps:
1- renaming few variables/tokens in nodejsvirtualbotdelay.js (line 3,4)

	1-VIRUSTOTAL.PUBLICKEYACCESS <br>
		1-create an account on https://www.virustotal.com <br>
		2-put the "My API KEY" in this place as a string. 

	2-AWS.S3.BUCKET- This is the name of the S3 BUCKET created in AWS.

2-Commands for installing npm packages

run these commands- 

sudo npm install claudia-bot-builder -S <br>
sudo npm install promise -S <br>
sudo npm install aws-sdk -S <br>
sudo npm install promise-delay -S <br>
sudo npm install node-virustotal -S <br>
sudo npm install natural -S <br>
sudo npm install crypto -S <br>

3- initialize the npm for creating package.json. Package.json contains all dependencies for deployment via claudia.

sudo npm init<br>
Note- after you put the above command the following attributes will pop up which needs to be entered<br>

name- nodejsvirtualbotdelay<br>
version- [hit enter]<br>
description- [hit enter]<br>
git repository- [hit enter]<br>
keywords- [hit enter]<br>
author- [hit enter]<br>
liscence - [hit enter]<br>

is this ok? [hit enter]

4- Claudia create-

sudo claudia create --api-module nodejsvirtualbotdelay --region us-east-2 --timeout 120 --allow-recursion --configure-slack-slash-command

note- <br>
1-make sure the --region is correct according to your ec2.<br>
2- nodejsvirtualbotdelay is the javascript file you have mentioned in sudo npm init and is the first file called after claudia deploys the bot.<br>

When you run this you need to put Slack token(of the slack application you have created) and webhook as "json"


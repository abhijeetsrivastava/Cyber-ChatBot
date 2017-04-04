//IMPORTANTFILEUPLOAD
//sudo npm install @slack/client --save
//sudo npm install fs --save
//sudo npm install node-fetch --save
//sudo npm install https --save

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var fetch=require("node-fetch");
var bot_token = process.env.SLACK_BOT_TOKEN || APPLICATION.TOKEN;
var rtm = new RtmClient(bot_token);
var https= require('https');
var AWS = require('aws-sdk'),
env = process.env;
//This function starts the Bot User
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
        console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

rtm.on(RTM_EVENTS.FILE_SHARED, function handleUpload(file){

        var token= APPLICATION.TOKEN;
        var file_id=file.file.id;

        var request = fetch("https://slack.com/api/files.info?token="+token+"&file="+file_id+"&pretty=1").then( function(response) {
        return response.json();
}).then(function(json){
                    console.log (json.file.url_private_download);
                    var file_name=String(json.file.name);
                    var url=String(json.file.url_private_download);
                    var path=url.substring(23,url.length);
                    //EXTRACTING THE unique url directory
                    console.log(path);
                    var options = {
                        "method": "GET",
                        "hostname"  : "files.slack.com",
                        "path":path,
                        "rejectUnauthorized": "false",
                        "headers": {
                        "Authorization": "Bearer "+token
                    }};
		
                    var req = https.request(options, function(res) {
                    res.on('data', function(d) {
                    var s3 = new AWS.S3({accessKeyId: env.AWS_ID, secretAccessKey:env.AWS_KEY});
                    s3 = new AWS.S3({apiVersion: '2006-03-01'});
                    s3.putObject({
                        Bucket: AWS.S3.BUCKET,
                    	Key    : "chatbot",
                    	Body: d
                    }, function (err) {
                    if (err) 
                	   console.log(err);
            		else 
                	   console.log("Success File was uploaded");
            	
    			});
			});
		
		});
		req.end();
		 return "File got uploaded";
        });
});
rtm.start();
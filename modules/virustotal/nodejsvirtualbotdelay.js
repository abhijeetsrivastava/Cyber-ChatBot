'use strict';

const PUBLICACCESSKEY= VIRUSTOTAL.PUBLICKEYACCESS;
const S3BUCKET= AWS.S3.BUCKET;

const aws = require('aws-sdk');
var lambda = new aws.Lambda();
const botBuilder = require('claudia-bot-builder');
const promiseDelay = require('promise-delay');
const slackDelayedReply = botBuilder.slackDelayedReply;
const vt = require('node-virustotal');

var qav="av "; //according to the antivirus
let qvirus ="virus";
let qconfidence ="confidence";
let qreport = "report";
let qfamily ="family";
let qavsay="avsay"; //antivirus list that says it is a virus

let replynotvirus="This is not a virus";
var replyvirus="Alert: This file is a virus according to ";
var replyav="Alert: This file is a virus according to ";
var replyreport="Detail Report:\nThis file is a virus according to ";
var replyavlist ="Virus Alert: This file is a virus according to the following Antivirus:\n";
var replydontknow="Sorry I do not understand this question, please try again."
var replynotav="This file is not a virus according to ";
var replyFileNotFound ="This file was not found in VirutsTotal";

var hash=""; //global variable
var file_data = "";
var last_file="";
const dir="./files_uploaded";
var files ="";
var fullpath ="";

function botdelay(){
const api = botBuilder((message, apiRequest) => {
  //hash=message.text;
  return lambda.invoke({
    FunctionName: apiRequest.lambdaContext.functionName,
    Qualifier: apiRequest.lambdaContext.functionVersion,
    InvocationType: 'Event',
    Payload: JSON.stringify({
      slackEvent: message 
      // this will enable us to detect the event later and filter it
    })
  })
    .promise()
    .then(() => {
      return { 
        text: 'checking....',
        response_type: 'in_channel' 
      }
    }).catch(() => {
      return 'error........'
    });
});

api.intercept((event) => {
  if (!event.slackEvent) // if this is a normal web request, let it run
    return event;

    const message = event.slackEvent;
    const str = message.text;
    hash="";
    file_data="";
    last_file="";
    files ="";
    var fullpath="";
    var question=questiontype(str);
    
    if(hash=="") //if hash is not a part of the question get it from file
      hash=getHashFromFile();

    console.log("abhijeet" +question);
    const con = vt.MakePublicConnection();
    //public key for virustotal
    con.setKey(PUBLICACCESSKEY);
    var s="";
    let ans = 'not';
    console.log("abhijeet"+hash);
    return new Promise((resolve, reject) => {
    con.getFileReport(hash, data => {
	for(var key in data){
		var val=data[key];
		if(key=="scans")  
  	for(var k in val){
    		if(val[k]["detected"]==true){
    			s=s+k+"\n";
    		}
    	}
	}
      resolve(data);
    }, mistake => {
        console.log(JSON.stringify(mistake));
        reject(replyFileNotFound);
      });
    })
      .then(data => { // Data from resolve
        return slackDelayedReply(event.slackEvent, {
          text: replytoquestion(s , data, question),
	        response_type: 'in_channel'
        })
      })
      .catch(err => { // Mistake from reject
        return slackDelayedReply(event.slackEvent, {
          text: JSON.stringify(err)
        })
      })
      .then(() => false);
})

module.exports=api;
}

function replytoquestion(str , data, qtype){
  console.log("data"+data);
  if(qtype==qvirus){
      if(str=="")
        return replynotvirus;
      else return replyvirus + data["positives"]+" antivirus"; 
    }
    if(qtype==qreport)
      return replyreport +
    +data["positives"]+" antivirus\nMore detail can be found here\n"+data["permalink"];
    if(qtype==qavsay)
      return replyavlist+str;
    console.log(qtype+" abhijeet " + qtype.includes(qav));
    console.log("0  "+qtype.split(" ")[0]);
    if(qtype.includes(qav)){
      var avname=qtype.split(" ")[1];
      console.log(avname);
      console.log(str.toLowerCase().includes(avname.toLowerCase()));
      if(str.toLowerCase().includes(avname.toLowerCase()))
        return replyav+avname;
      else return replynotav + avname;
    }  
    return replydontknow +" You can try checking flask slash command";
}

function questiontype( sent)
{
  var natural = require('natural'),
    tokenizer = new natural.WordPunctTokenizer();
  var corpus = ["mcafee","does","scan","confidence","malware","virus","everything","family","category","detail","antivirus","bkav","totaldefense","microWorld-escan","nprotect","cmc","cat-quickheal","alyac","malwarebytes","zillya","aegislab","thehacker","alibaba","k7gw","k7antivirus","arcabit","baidu","f-prot","symantec","eset-nod32","trendmicro-housecall","avast","clamav","kaspersky","bitdefender","nano-antivirus","superantispyware","ad-aware","emsisoft","comodo","f-secure","drweb","vipre","trendmicro","sophos","cyren","jiangmin","avira","antiy","kingsoft","microsoft","virobot","gdata","ahnlab-v3","mcafee","avware","vba32","zoner","tencent","yandex","ikarus","fortinet","avg","panda","qihoo"];
   console.log("input:\n");
  var spellcheck = new natural.Spellcheck(corpus);
  var spelltry="Mcaffee";
  console.log(sent);
  var sentence=tokenizer.tokenize(sent);
  var temp="";
  for (var key in sentence)
  {
    temp=getHashFromString(sentence[key]);
    if(temp!=""){
      hash=temp;
      sentence[key]="";
    }
    var spell=spellcheck.getCorrections(sentence[key].toLowerCase(),1);
    if (spell.length!=0)
    {       
            sentence[key]=spell[0];
    }
  }
  console.log("tokens:hash"+hash);
  console.log(sentence);
  
  var isvirus=" malware virus safe open concern check ";
  var confidence= " confidence ";
  var report=" everything report detail more ";
  var av=" Mcafee Bkav TotalDefense MicroWorld-eScan nProtect CMC CAT-QuickHeal ALYac Malwarebytes Zillya AegisLab TheHacker Alibaba K7GW K7AntiVirus Arcabit Baidu F-Prot Symantec ESET-NOD32 TrendMicro-HouseCall Avast ClamAV Kaspersky BitDefender NANO-Antivirus SUPERAntiSpyware Ad-Aware Emsisoft Comodo F-Secure DrWeb VIPRE TrendMicro McAfee-GW-Edition Sophos Cyren Jiangmin Avira Antiy-AVL Kingsoft Microsoft ViRobot GData AhnLab-V3 McAfee AVware VBA32 Zoner Tencent Yandex Ikarus Fortinet AVG Panda Qihoo-360 ";
  var family=" family category ";
  var avsay=" antivirus list ";

  var reportCount=0,familyCount=0,isvirusCount=0,avsayCount=0;
  for (var key in sentence){
    var word=sentence[key].toLowerCase();
    if(av.toLowerCase().includes(" "+word+" ")){
      console.log("this is av question for " + word);
      return qav+word ;
    }
    if(confidence.includes(" "+word+" ")){
      console.log("this is a confidence question");
      return qconfidence;
    }
    if(report.includes(" "+word+" "))reportCount++;
    if(family.includes(" "+word+" "))familyCount++;
    if(isvirus.includes(" "+word+" "))isvirusCount++;
    if(avsay.includes(" "+word+" "))avsayCount++;
  }
  if(reportCount > 0) {
    console.log("this is a report question");
    return qreport;
  }
  else if(familyCount > 0){
    console.log("this is a family question");
    return qfamily;
  }
  else if(avsayCount>0 ){
    console.log("this is a avsay question");
    return qavsay;
  }
  else {
    console.log("this is a virus question");
    return qvirus;
  }
}
function getHashFromString(word) {
    var patt = new RegExp(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i);
    var res = patt.test(word);

    if(res==true){
      return word; 
    }
    else return "";
}

function getHashFromFile(){
    var file_in_s3 ="chatbot";
    var env = process.env;

    var s3 = new aws.S3({accessKeyId: env.AWS_ID, secretAccessKey:env.AWS_KEY});
        s3 = new aws.S3({apiVersion: '2006-03-01'});
    var s3param={
      //AWS S3 Bucket 
                Bucket: S3BUCKET,
                Key    : file_in_s3};
var userHash='';
return new Promise((resolve, reject) => {
        s3.getObject(s3param,function(err,data){
        if (err)
        { 
        console.log(err);
        console.log("\nNot found, hence aborted");
        reject("Error");
        }
        else
        {    
         userHash =userHash+require("crypto").createHash('sha256').update(data.Body).digest('hex');
                console.log("Userhash: "+userHash);
                resolve(userHash); 
        }
        });
}).then(data=>data).catch((err) => console.error(err));
}   

botdelay();
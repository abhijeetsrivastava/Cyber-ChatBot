//sudo npm install claudia-bot-builder --save
//sudo npm install crypto --save
//sudo npm install node-fetch --save
//sudo npm install aws-sdk --save
'use strict';
var botBuilder = require('claudia-bot-builder');
var AWS = require('aws-sdk'),
env = process.env,
fetch=require("node-fetch");
//require crypto in function gethash()

var qav="av "; //according to the av
let qvirus ="virus";
let qconfidence ="confidence";
let qreport = "report";
let qfamily ="family";
let qavsay="avsay"; //antivirus list that says it is a virus

let replynotvirus="This is not a virus";
var replyvirus="Alert: This file is a virus according to flask ";
var replyvirusfam="Alert: The family of this virus according to flask: ";
var replyav="Alert: This file is a virus according to ";
var replyreport="Detail Report:\nThis file is a virus according to flask";
var replyavlist ="Virus Alert: This file is a virus according to the following Antivirus:\n";
var replydontknow="Sorry I do not understand this question, please try again."
var replynotav="This file is not a virus according to ";

var hash=""; //global variable

function botdelay()
{
    module.exports = botBuilder (function (request) {
        var question=request.text;
        hash="";
        var query=questiontype(question);
         //hash="1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20";
        if(hash=="")
          return gethash(query);
        else 
        	return replytoquestion(query);
    });
}


function questiontype( sent)
{
  var natural = require('natural'),
    tokenizer = new natural.WordPunctTokenizer();
  var corpus = ["mcafee","does","scan","confidence","malware","virus","everything","family","category"
  ,"detail","antivirus","Bkav","TotalDefense","MicroWorld-eScan","nProtect","CMC","CAT-QuickHeal","ALYac","Malwarebytes","Zillya","AegisLab","TheHacker","Alibaba","K7GW","K7AntiVirus","Arcabit","Baidu","F-Prot","Symantec","ESET-NOD32","TrendMicro-HouseCall","Avast","ClamAV","Kaspersky","BitDefender","NANO-Antivirus","SUPERAntiSpyware","Ad-Aware","Emsisoft","Comodo","F-Secure","DrWeb","VIPRE","TrendMicro","McAfee-GW-Edition","Sophos","Cyren","Jiangmin","Avira","Antiy-AVL","Kingsoft","Microsoft","ViRobot","GData","AhnLab-V3","McAfee","AVware","VBA32","Zoner","Tencent","Yandex","Ikarus","Fortinet","AVG","Panda","Qihoo-360"];
  console.log("input:\n");
  
  var spellcheck = new natural.Spellcheck(corpus);
  var spelltry="Mcaffee";
  console.log(sent);
  //console.log(spelltry.toLowerCase());
  //console.log(spellcheck.getCorrections(spelltry.toLowerCase(), 1) );
  var sentence=tokenizer.tokenize(sent);
  var temp="";
  for (var key in sentence)
  {
  //      console.log(sentence[key].toLowerCase());
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

  var isvirus=" malware virus safe clean open concern ";
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
function gethash(query){
var file_in_s3="chatbot";
    var s3 = new AWS.S3({accessKeyId: env.AWS_ID, secretAccessKey:env.AWS_KEY});
            s3 = new AWS.S3({apiVersion: '2006-03-01'});
                var s3param={
                Bucket: 'chatb',
                Key    : file_in_s3};
                var userHash='';
                return new Promise((resolve, reject) => {
                s3.getObject(s3param,function(err,data){
                console.log("is this runing");
                if (err)
                {
                      console.log(err);
                      console.log("\nNot found, hence aborted");
                      reject("Error");
                }
                else
                {
                    userHash =userHash+require("crypto").createHash('sha256').update(data.Body).digest('hex');
                    hash=hash+userHash;
                    console.log("Userhash: "+userHash);
                    resolve(hash); 
                }
                });
                }).then(data=>replytoquestion(query)).catch((err) => console.error(err));
}
 function replytoquestion(query){
       var body =  {
            "filehash": hash,
            "search_type": "LIKE",
            "select": "hash,malware,family,versions",
            "limit": "10"
        };
        return fetch('http://fcas-test-0.us-east-1.elasticbeanstalk.com/cisc850/search/analysis', {
                method: 'POST',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
                json:true

        }).then(function(dat){return dat.json();}).then(function(data){
                console.log("the length is "+Object.keys(data.result).length);
                var flag=0;
                var mal=0
                var strfam='';
                var str='';
                var notunknown=0;
                for (var i=0;i<Object.keys(data.result).length; i++)
                {
                        console.log(query);
                        flag=1;
                        var resu=data.result[0];
                        if (query==qvirus && String(resu["malware"])!="0")
                        {
                                mal=mal+1;
                        }
                        if (query==qfamily && String(resu["family"])!="Unknown")
                        {
                                strfam= strfam+String(resu["family"])+" ";
                                notunknown=1;
                        }
                }
                if (flag==0)
                {
                        str=str+replynotvirus;
                }
                 else
                {
                        if (notunknown==0)
                        strfam= strfam+" Unknown";
                        if (query==qvirus)
                        {
                                if (mal>0)
                                {
                                str=str+replyvirus+String(mal)+" model(s)";
                                }
                                else
                                str=str+replynotvirus;
                        }
                        if (query==qfamily)
                        {
                                str=str+replyvirusfam+"\\n"+strfam;
                        }
                }
  var jsontext='{ "text": "'+str+'" , "response_type": "in_channel"  }';
  console.log(jsontext);
  var json= JSON.parse(jsontext);
  return json }).catch(err => console.log(err));
}
botdelay();



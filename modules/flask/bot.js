'use strict';

const S3BUCKET= AWS.S3.BUCKET;

var botBuilder = require('claudia-bot-builder');
var AWS = require('aws-sdk');
var env = process.env;
var fetch=require("node-fetch");

//these are the types of questions a user can ask
var qav = "av "; //according to the av
let qvirus ="virus";
let qconfidence ="confidence";
let qreport = "report";
let qfamily ="family";
let qavsay = "avsay"; //antivirus list that says it is a virus

//these are the replies user receives.
let replynotvirus = "This is not a virus";
var replyvirus = "Alert: This file is a virus according to flask ";
var replyvirusfam = "Alert: The family of this virus according to flask: ";
var replyav = "Alert: This file is a virus according to ";
var replyreport = "Detail Report:\nThis file is a virus according to flask";
var replyavlist = "Virus Alert: This file is a virus according to the following Antivirus:\n";
var replydontknow = "Sorry I do not understand this question, please try again."
var replynotav = "This file is not a virus according to ";

var hash = ""; //global variable

function botdelay()
{
    module.exports = botBuilder (function (request) {
        var question = request.text;
        hash = "";
        var query = questiontype(question);

        if(hash == "")// if a hash is not mentioned in the query, we get the hash from the file
            return getHashFromFile(query);
        else 
            return replytoquestion(query);
    });
}
//this returns the type of question asked by string sent
function questiontype (sent)
{
    var natural = require('natural') , tokenizer = new natural.WordPunctTokenizer();
    var corpus = ["mcafee","does","scan","confidence","malware","virus","everything","family","category","detail","antivirus","bkav","totaldefense","microWorld-escan","nprotect","cmc","cat-quickheal","alyac","malwarebytes","zillya","aegislab","thehacker","alibaba","k7gw","k7antivirus","arcabit","baidu","f-prot","symantec","eset-nod32","trendmicro-housecall","avast","clamav","kaspersky","bitdefender","nano-antivirus","superantispyware","ad-aware","emsisoft","comodo","f-secure","drweb","vipre","trendmicro","sophos","cyren","jiangmin","avira","antiy","kingsoft","microsoft","virobot","gdata","ahnlab-v3","mcafee","avware","vba32","zoner","tencent","yandex","ikarus","fortinet","avg","panda","qihoo"];
    var spellcheck = new natural.Spellcheck(corpus);
    var spelltry = "Mcaffee";
    var sentence = tokenizer.tokenize(sent);
    var temp = "";
    for (var key in sentence)
    {
        temp=getHashFromString(sentence[key]);
        if(temp != ""){
            hash=temp;
            sentence[key] = "";
        }
        var spell = spellcheck.getCorrections( sentence[key].toLowerCase() , 1 );
        if (spell.length != 0)
        {       
            sentence[key] = spell[0];
        }
    }
    var isvirus =" malware virus safe clean open concern check ";
    var confidence = " confidence ";
    var report =" everything report detail more ";
    var av =" Mcafee Bkav TotalDefense MicroWorld-eScan nProtect CMC CAT-QuickHeal ALYac Malwarebytes Zillya AegisLab TheHacker Alibaba K7GW K7AntiVirus Arcabit Baidu F-Prot Symantec ESET-NOD32 TrendMicro-HouseCall Avast ClamAV Kaspersky BitDefender NANO-Antivirus SUPERAntiSpyware Ad-Aware Emsisoft Comodo F-Secure DrWeb VIPRE TrendMicro McAfee-GW-Edition Sophos Cyren Jiangmin Avira Antiy-AVL Kingsoft Microsoft ViRobot GData AhnLab-V3 McAfee AVware VBA32 Zoner Tencent Yandex Ikarus Fortinet AVG Panda Qihoo-360 ";
    var family =" family category ";
    var avsay =" antivirus list ";

    var reportCount = 0, familyCount = 0, isvirusCount = 0, avsayCount = 0;
    for (var key in sentence){
        var word=sentence[key].toLowerCase();
        if(av.toLowerCase().includes(" " + word + " ")){
            return qav+word ;
        }
        if(confidence.includes(" " + word + " ")){
            return qconfidence;
        }
        if(report.includes(" " + word + " ")){
            reportCount++;
        }
        if(family.includes(" " + word + " ")){
            familyCount++;
        }
        if(isvirus.includes(" " + word + " ")){
            isvirusCount++;
        }
        if(avsay.includes(" " + word + " ")){
            avsayCount++;
        }
    }
    if(reportCount>0) {
        return qreport;
    }
    else if(familyCount>0){
        return qfamily;
    }
    else if(avsayCount>0){
        return qavsay;
    }
    else {
        return qvirus;
    }
}
// it gets hash from the string, any word that is alphanumeric is a hash
function getHashFromString (word) {
    var patt = new RegExp(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i);
    var res = patt.test(word);

    if(res==true){
        return word; 
    }
    else return "";
}
//gets the hash of the file from S3 bucket
function getHashFromFile (query){
    var file_in_s3="chatbot";
    var s3 = new AWS.S3({accessKeyId: env.AWS_ID, secretAccessKey:env.AWS_KEY});
    s3 = new AWS.S3({apiVersion: '2006-03-01'});

    var s3param = {
    Bucket: S3BUCKET,
    Key    : file_in_s3};

    var userHash = '';

    //Wait for file retrieval from S3, and then return the hash of the file
    return new Promise( (resolve, reject) => {
        s3.getObject(s3param , function (err,data){
            if (err)
            {
                reject("Error");
            }
            else
            {
                userHash = userHash + require("crypto").createHash('sha256').update(data.Body).digest('hex');
                hash = hash + userHash;
                resolve(hash); 
            }
        });
    }).then(data => replytoquestion(query) ).catch( (err) => console.error(err));
}

 function replytoquestion (query){

    //JSON structure to send to Flask API
    var body =  {
        "filehash"    : hash,
        "search_type" : "LIKE",
        "select"      : "hash,malware,family,versions",
        "limit"       : "10"
    };

    //Connecting with the Flask API
    return fetch('http://fcas-test-0.us-east-1.elasticbeanstalk.com/cisc850/search/analysis', {
        method    : 'POST',
        body      : JSON.stringify(body),
        headers   : { 'Content-Type': 'application/json' },
        json      : true

    }).then(function (response){ return response.json(); }).then (function (data){
        var flag = 0, mal = 0, notunknown = 0;
        //flag and counter of malware results and not unknown families
        var strfam = '', str = '';
        //strfam stores family, str stores the whole response to the user

        for (var i = 0 ; i < Object.keys(data.result).length ; i++)
        {
            flag = 1;
            var resultArray = data.result[0];
            if (query == qvirus && String( resultArray["malware"]) != "0")
            {
                mal = mal + 1;
            }
            if (query==qfamily && String( resultArray["family"]) != "Unknown")
            {
                strfam = strfam + String( resultArray["family"]) + " ";
                notunknown = 1;
            }
        }
        if (flag == 0)
        {
            str = str + replynotvirus;
        }
        else
        {
            if (notunknown == 0)
                strfam = strfam + " Unknown";
            if (query == qvirus)
            {
                if (mal > 0)
                {
                    str = str + replyvirus + String(mal) + " model(s)";
                }
                else
                    str = str + replynotvirus;
            }
            if (query == qfamily)
            {
                str = str + replyvirusfam + "\\n" + strfam;
            }
        }
        var reply = str ; 
        //encapsulating str into the reply variable

        var jsontext = '{ "text" : "' + reply + '" , "response_type" : "in_channel"  }';
        var json = JSON.parse( jsontext );
        return json;
    }).catch(err => console.log(err));
}

botdelay();


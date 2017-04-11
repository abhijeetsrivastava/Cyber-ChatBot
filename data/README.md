# Dialogues
Below is a description on the type of dialogues the chatbot can handle.
## vt / flask
 The two slash commands /flask and /vt can handle different types of questions. Below is the capability of each slash command.

| Slash Command | Type of Questions |
| ------------- |:-----------------:|
| /vt           | Virus Check       |
| /vt           | Detailed report   |
| /vt           | Specific AntiVirus|
| /vt           | How many AntiVirus|
| /flask        | Virus Check       |
| /flask        | Family/type       |


## NLP 
 1. Checking for virus<br>
  **USER**: 	/vt Is this a malware ? <br>
  **USER**: 	/flask Is this file a virus?<br>
  **USER**: 	/flask Is this file safe?<br>
  **USER**: 	/vt Is this file a virus?<br>
  **USER**: 	/flask Is this file clean?<br>
 2. Type of virus<br>
  **USER**: 	/flask family of this malware<br>
  **USER**: 	/flask family of 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 ?<br>
  **USER**: 	/flask category of 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 ?<br>

 3. Detailed report<br>
  **USER**: /vt Detailed report<br>
  **USER**: /vt Detailed report on 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 <br>
  **USER**: /vt Tell me more 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 <br>
  **USER**: /vt what more can you tell me about this file?<br>

 4. Asking specific AntiVirus to check<br>
  **USER**: /vt What can Mcaffee tell me?<br>
  **USER**: /vt What does Mcaffee say?<br>

 5. Asking how many Anti-viruses think about a particular file<br>
  **USER**: /vt How many Anti-virus think this file is not safe?<br>


## Asking questions via hash/file upload
 /flask 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 is a virus ?

 /vt is this a virus? 
## Sample Input and Output
 **USER**:  /vt Is this a malware ? <br>
 **BOT**:<br>
 checking....<br>
 "This file was not found in VirusTotal"<br><br>
 **USER**:  /flask Is this file a virus?<br>
 **BOT**: This is not a virus<br><br>
 **USER**:  /flask Is this file safe?<br>
 **BOT**: Alert: This file is a virus according to flask 1 model(s)<br><br>
 **USER**:  /vt Is this file a virus?<br>
 **BOT**:<br>
 checking....<br>
 "This file was not found in VirusTotal"<br><br>
 **USER**:  /flask Is this file clean?<br>
 **BOT**: Alert: This file is a virus according to flask 1 model(s)<br><br>
 **USER**:  /flask family of this malware<br>
 **BOT**: This is not a virus<br><br>
 **USER**:  /flask family of 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 ?<br>
 **BOT**: Alert: The family of this virus according to flask:<br>
 Gootkit<br><br>
 **USER**:  /flask category of 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 ?<br>
 **BOT**: Alert: The family of this virus according to flask:<br>
 Gootkit<br><br>
 **USER**: /vt Detailed report<br>
 **BOT**:<br>
 checking....<br>
 "This file was not found in VirusTotal" <br><br>
 **USER**: /vt Detailed report on 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 <br>
 **BOT**:<br>
 checking....<br>
 Detail Report:<br>
 This file is a virus according to 36 antivirus<br>
 More detail can be found here<br>
 https://www.virustotal.com/file/1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20/analysis/1480650054/<br><br>
 **USER**: /vt Tell me more 1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20 <br>
 **BOT**:<br>
 checking....<br>
 Detail Report:<br>
 This file is a virus according to 36 antivirus<br>
 More detail can be found here<br>
 https://www.virustotal.com/file/1686aeac3a7e5c46938a43152fbd7de2e1bc933a1b0d5252fb79d748e7202f20/analysis/1480650054/<br><br>
 **USER**: /vt what more can you tell me about this file?<br>
 **BOT**:<br>
 checking....<br>
 "This file was not found in VirusTotal" 
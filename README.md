# CISC850 - Cyber Chatbot
This is the repository for our project Cyber-Chatbot.
## Project Description
For this project, we have investigated the construction of a Cyber Chatbot. A powerful chatbot that can perform menial or repetitive tasks or work along side human analysts could significantly increase the effectiveness of security analysts.

During the development of the Cyber Chatbot we have focussed more on the Cyber part of the chatbot. Our chatbot can understand questions only related to cyber questions that we have targetted.  

## Collaborators
 * Abhijeet Srivastava (abhisri@udel.edu) <br>
 * Anupam Basu (anupamb@udel.edu) <br>
## Capabilities of the chatbot
 * Answer questions about a file or directly through hash.
 * Ask Cyber/Virus related question to the Cyber-ChatBot.
 * We have used [VirusTotal](http://www.virustotal.com/) API to answer the questions.
 * Some questions are answered via Flask API which is internal to University of Delaware's John Cavazos lab.
 * We have implemented NLP and the questions can be asked in more than one ways.
 ## Lesson learned
 * AWS' bot works on lambda function which can be hectic to deploy. <br>
 * Claudia.js framework takes care of the deployment where the actual chatbot code must be done in node.js. <br>
 * If we want to use python or any other language to develop the bot Claudia.js can not be used for it. <br>
 * If we can use any other CSP (cloud service provider) we can also try using other frameworks. <br>

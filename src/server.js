import { create, Whatsapp } from '@wppconnect-team/wppconnect';
import { stages, getStage,getItems,getType } from './stages.js';
import * as dotenv from 'dotenv'

dotenv.config()
global.globalUser = "";
global.globalDescricao = "";
global.bolCurso = false;
global.botTrigger = false
create({
    session: 'vendas',
    catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        console.log('Number of attempts to read the qrcode: ', attempts);
        console.log('Terminal qrcode: ', asciiQR);
        console.log('base64 image string qrcode: ', base64Qrimg);
        console.log('urlCode (data-ref): ', urlCode);
      },
      statusFind: (statusSession, session) => {
        console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        //Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
      },
      onLoadingScreen: (percent, message) => {
        console.log('LOADING_SCREEN', percent, message);
      },
    
    })
    .then((client) => start(client))
    .catch((error) => console.log(error));


 function start(client) {
        client.onMessage((message) => {
          if(message.body.includes('Facebook...') || message.body.includes('Instagram...')){ 
            botTrigger = true
          }
          if (!message.isGroupMsg && botTrigger===true) {
              const currentStage = getStage({ from: message.from });
              const currentType = getType({ from: message.from });
              const currentItems = getItems({ from: message.from });
              console.log(currentItems)
              console.log(currentType)
    
              const messageResponse = stages[currentStage].stage.exec({
                from: message.from,
                message: message.body,
                client,
              });
      
              if (messageResponse) {
                client.sendText(message.from, messageResponse).then(() => {
                  console.log('Message sent.');
                }).catch(error => console.error('Error when sending message', error));
              }

              /* if (messageResponse && currentType===2) {
                currentItems.forEach(element => {
                  console.log(element)
                  client.sendFile(message.from, element).then(() => {
                    console.log('Message sent.');
                  }).catch(error => console.error('Error when sending message', error));
                });
                
              
              } */
          }
        
        });
    };
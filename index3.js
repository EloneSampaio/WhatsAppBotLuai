// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
const wppconnect = require('@wppconnect-team/wppconnect');
require('dotenv').config()
let option;
let exec =true;
let tipo=null;
let started = false;
let bWelcome = false; //boolena welcome
let bMenu = false; //boolena welcome
let bAplicativo = false; //boolena welcome
let nome='xvx99*';
let opcao = 'xvx99*';
let bolUrgencia = false;

if(started===false){
iniciar_bot()
started = true;
}
async function iniciar_bot(){

  wppconnect.create({
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

  }

function start(client) {
        client.onMessage((message) => {
            welcome(client)
          
        });
}

    

/* async function action_button(client,number){
    let optionsButtonMessage = {
        useTemplateButtons: true,
        buttons: [
            {
                url: process.env.SITE,
                text: process.env.SITE_DESCRIPTION
            },
            {
                phoneNumber: process.env.NUMBER_CALL,
                text: process.env.CALL_DESCRIPTION
            }
        ],
        title: process.env.ACTION_BUTTON_TITLE,
        footer: process.env.ACTION_BUTTON_FOOTER
    }; 


    const sendButton = await client.sendTextMessage(to, "Escolher uma das opções abaixo", options);
} */

async function action_button(client,number){
    let optionsButtonMessage = {
        useTemplateButtons: true,
        buttons: [
            {
                url: "https://luaitech.com",
                text: "Nosso site"
            },
            {
                phoneNumber: "+55999422022",
                text: "Ligue agora"
            }
        ],
        title: "Você também pode",
        footer: "Acessa ou ligar "
    };


    const sendButton = await client.sendText(number, "Escolher uma das opções abaixo", optionsButtonMessage);
    
}

async function menu(client,number){
    
  await client.sendText(number,process.env.SERVICE_DESCRIPTION)
  await client.sendText(number,process.env.SERVICE_MENU_DESCRIPTION);
  await client.sendText(number,process.env.SERVICE_MENU_LIST);


}


async function welcome(client){

 client.onMessage(async (message) => {

    if(message.body === process.env.TRIGGER_1) {
	await	client.sendText(message.from,process.env.WELCOME);
    await    client.sendText(message.from,process.env.YOUR_NAME);
    }

    if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && nome==='xvx99*') {
		nome = message.body
        console.log(nome);
        client.sendText(message.from,process.env.WELCOME_CUSTOMER+nome);
        //menu
        menu(client,message.from)
        //botoes para acessar o site
        action_button(client,message.from)

        //esperar o usuario digitar a opção
        client.onMessage( (message) => {
            opcoes_menu2(client,message.from,message);
           });
    }
    


});

}


   async function opcoes_menu2(client,number,message){

    option = message.body;
    console.log(option)
    if(option==1){
        if(exec){
            aplicativos(client,number);
            exec=false;
            
            }
    }

     if(option==2){
        if(exec){
            sites(client,number);
            exec=false;
            
            }
    }

    if(option==3){
        if(exec){
            cursos(client,number);
            exec=false;
            
            }
    } 

}


async function aplicativos(client,number){
    await client.sendText(number,process.env.APP_FAQ);
    await client.sendText(number,process.env.APP_QUESTION_1);
    await client.sendFile(number, process.env.APP_IMG1);
    await client.sendFile(number, process.env.APP_IMG2);
    await client.sendFile(number, process.env.APP_IMG3);
    await client.sendFile(number, process.env.APP_IMG4);
    await client.sendText(number,process.env.APP_QUESTION_2);
    await client.onMessage(async (message) => {
        if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && message.type==='chat') {
            tipo = message.body
            if(tipo!==null){
               await isUrgente(client,message.from)
        }
        }
    });
   

}

async function sites(client,number){
    await client.sendText(number,process.env.SITE_FAQ);
    await client.sendText(number,process.env.SITE_QUESTION_1);
    await client.sendFile(number, process.env.SITE_IMG1);
    await client.sendFile(number, process.env.SITE_IMG2);
    await client.sendFile(number, process.env.SITE_IMG3);
    await client.sendFile(number, process.env.SITE_IMG4);
    await client.sendText(number,process.env.SITE_QUESTION_2);
    await client.onMessage( async(message) => {
        if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && message.type==='chat') {
            tipo = message.body
            if(tipo!==null){
                await isUrgente(client,message.from)
        }
        }
    });
   

}


async function cursos(client,number){
    
    await client.sendText(number,process.env.CURSO_FAQ);
    await client.sendText(number,process.env.CURSO_QUESTION_1);
    await client.sendFile(number, process.env.CURSO_IMG1);
    await client.sendFile(number, process.env.CURSO_IMG2);
    await client.sendFile(number, process.env.CURSO_IMG3);
    await client.sendFile(number, process.env.CURSO_IMG4);
    await client.sendText(number,process.env.CURSO_QUESTION_2);
    await client.onMessage(async (message) => {
        if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && message.type==='chat') {
            tipo = message.body
            if(tipo!==null){
                await isUrgente(client,message.from)
        }
        }
    });
   

}

async function agradecimento(client,number,status){
    if(status){
    await client.sendText(number,process.env.URGENTE_SIM);
    }else{
        await client.sendText(number,process.env.URGENTE_NAO);

    }

}

/* async function isUrgente(client,number){
    let button = new Buttons('Escolhe uma opção', [{ body: 'Sim' }, { body: 'Não' }], 'Urgente(Sim/Não)?', 'Escolha uma opção abaixo');
    client.sendText(number, button); 
    client.onMessage((message) => {  
        if(message.type='buttons_response'){    
               agradecimento(message.from);
        }
     });
  
} */


async function isUrgente(client,number){
   
    client.sendMessageOptions(number, 'Opções', {
      title: 'Escolhe uma opção          ',
      footer: 'Urgente(Sim/Não)?',
      isDynamicReplyButtonsMsg: true,
      dynamicReplyButtons: [
        {
          buttonId: 'idSim',
          buttonText: {
            displayText: 'Sim',
          },
          type: 1,
        },
        {
          buttonId: 'idNao',
          buttonText: {
            displayText: 'Não',
          },
          type: 1,
        },
      ],
    });
        
    client.onMessage((message) => {  
        console.log(message.type)
        if(message.type='buttons_response' && message.body=="Sim" && bolUrgencia===false){ 
              
            agradecimento(client,message.from,true);
            message.react('👍');   
            bolUrgencia = true
     }
     if(message.type='buttons_response' && message.body=="Não" && bolUrgencia===false){    
        agradecimento(message.from,false);
        message.react('👍');   
        bolUrgencia = true
 }
     });
  
}


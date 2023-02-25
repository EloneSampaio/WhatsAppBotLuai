const { Client, LocalAuth, Buttons, List,MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
var QRCode = require('qrcode')
require('dotenv').config()


//Moi c'est Sam

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


const productsList = new List(
    "Abaixo estão listados os serviços que prestamos",
    "Todos os serviços",
    [
      {
        title: "Serviços",
        rows: [
          { id: "Aplicativo móvel", title: "Aplicativo móvel" },
          { id: "Sites e Loja", title: "Sites e Loja" },
          { id: "Formação", title: "Formação" },
        ],
      },
    ],
    "Selecione a opção no menu"
  );
  const client = new Client({
    authStrategy: new LocalAuth(),
  });



 



client.on('qr', qr => {
     qrcode.generate(qr, {small: true});
    

      QRCode.toDataURL(qr, function (err, url) {
        console.log(url)
      })


   
});



client.on("ready", async () => {
console.log('WhatsApp já está conectado!');

    client.pupPage.addScriptTag({ path: require.resolve("@wppconnect/wa-js") });
    await client.pupPage.waitForFunction(() => window.WPP?.isReady);
    const isAuthenticated = await client.pupPage.evaluate(() => WPP.conn.isAuthenticated());
    if (isAuthenticated) {
        console.log('wppconnect já está on!');
        console.log(process.env.TRIGGER_1)
    }
});


client.initialize();


async function action_button(number){
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


    const sendButton = await client.pupPage.evaluate(
        (to, options) => WPP.chat.sendTextMessage(to, "Escolher uma das opções abaixo", options),
        number,
        optionsButtonMessage
    );
}



async function menu(number){
    
  await client.sendMessage(number,process.env.SERVICE_DESCRIPTION)
  await client.sendMessage(number,process.env.SERVICE_MENU_DESCRIPTION);
  await client.sendMessage(number,process.env.SERVICE_MENU_LIST);


}




client.on('message', message => {

    if(message.body === process.env.TRIGGER_1) {
		client.sendMessage(message.from,process.env.WELCOME);
        bWelcome = true
    }
    if(bWelcome){
    client.sendMessage(message.from,process.env.YOUR_NAME);
    bWelcome = false
    }
    if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && nome==='xvx99*') {
		nome = message.body
        console.log(nome);
        client.sendMessage(message.from,process.env.WELCOME_CUSTOMER+nome);
        //menu
        menu(message.from)
        //botoes para acessar o site
        action_button(message.from)

        //esperar o usuario digitar a opção
        client.on('message', message => {
            opcoes_menu2(message.from,message);
           });
     

     
    }
    


});




   async function opcoes_menu2(number,message){

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
    await client.sendMessage(number,process.env.APP_FAQ);
    await client.sendMessage(number,process.env.APP_QUESTION_1);
    await sendFile(number, process.env.APP_IMG1);
    await sendFile(number, process.env.APP_IMG2);
    await sendFile(number, process.env.APP_IMG3);
    await sendFile(number, process.env.APP_IMG4);
    await client.sendMessage(number,process.env.APP_QUESTION_2);
    await client.on('message', message => {
        if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && message.type==='chat') {
            tipo = message.body
            if(tipo!==null){
                isUrgente(message.from)
        }
        }
    });
   

}

async function sites(client,number){
    await client.sendMessage(number,process.env.SITE_FAQ);
    await client.sendMessage(number,process.env.SITE_QUESTION_1);
    await sendFile(number, process.env.SITE_IMG1);
    await sendFile(number, process.env.SITE_IMG2);
    await sendFile(number, process.env.SITE_IMG3);
    await sendFile(number, process.env.SITE_IMG4);
    await client.sendMessage(number,process.env.SITE_QUESTION_2);
    await client.on('message', message => {
        if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && message.type==='chat') {
            tipo = message.body
            if(tipo!==null){
                isUrgente(message.from)
        }
        }
    });
   

}


async function cursos(client,number){
    
    await client.sendMessage(number,process.env.CURSO_FAQ);
    await client.sendMessage(number,process.env.CURSO_QUESTION_1);
    await sendFile(number, process.env.CURSO_IMG1);
    await sendFile(number, process.env.CURSO_IMG2);
    await sendFile(number, process.env.CURSO_IMG3);
    await sendFile(number, process.env.CURSO_IMG4);
    await client.sendMessage(number,process.env.CURSO_QUESTION_2);
    await client.on('message', message => {
        if(message.body !==null &&  message.body!==process.env.TRIGGER_1 && message.type==='chat') {
            tipo = message.body
            if(tipo!==null){
                isUrgente(message.from)
        }
        }
    });
   

}

async function agradecimento(number,status){
    if(status){
    await client.sendMessage(number,process.env.URGENTE_SIM);
    }else{
        await client.sendMessage(number,process.env.URGENTE_NAO);

    }

}

async function isUrgente(number){
    let button = new Buttons('Escolhe uma opção', [{ body: 'Sim' }, { body: 'Não' }], 'Urgente(Sim/Não)?', 'Escolha uma opção abaixo');
    client.sendMessage(number, button); 
    client.on('message', message => {  

        if(message.type='buttons_response' && message.body=="Sim" && bolUrgencia===false){ 
              
               agradecimento(message.from,true);
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

async function sendFile(number,file){
    var media = MessageMedia.fromFilePath(file);
    await client.sendMessage(number, media, {caption: ""});
}
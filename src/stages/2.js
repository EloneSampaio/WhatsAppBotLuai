import { menu } from '../menu.js';
import { storage } from '../storage.js';


let items = [];

export const stageTwo = {
  exec({ from, message, client }) {
    if (message === '1') {
      items = [ process.env.APP_IMG1,process.env.APP_IMG2,process.env.APP_IMG3,process.env.APP_IMG4,process.env.APP_IMG5];
      let msg = '🚨  Você escolheu a opção *Aplicativos*  🚨\n\n';
      msg += process.env.APP_FAQ + "\n\n"
      msg += process.env.APP_QUESTION_1 + "\n\n"
      msg+= '\n-----------------------------------\n1️⃣ - ```CONTINUAR ATENDIMENTO``` \n0️⃣ - ```VOLTAR AO MENU```\n\n' ;
     // msg += process.env.APP_QUESTION_2 + "\n\n"

     items.forEach(element => {
      console.log(element)
      client.sendFile(from, element).then(() => {
        console.log('Message sent.');
      }).catch(error => console.error('Error when sending message', error));
    });

      storage[from].stage = 3;


      return msg;
    } else if (message === '2') {

      items = [ process.env.SITE_IMG1,process.env.SITE_IMG2,process.env.SITE_IMG3,process.env.SITE_IMG4];

      let msg = '🚨  Você escolheu a opção *Sites e Lojas*  🚨\n\n';
      msg += process.env.SITE_FAQ + "\n\n"
      msg += process.env.SITE_QUESTION_1 + "\n\n"
      msg+= '\n-----------------------------------\n1️⃣ - ```CONTINUAR ATENDIMENTO``` \n0️⃣ - ```VOLTAR AO MENU```\n\n' ;



      items.forEach(element => {
        console.log(element)
        client.sendFile(from, element).then(() => {
          console.log('Message sent.');
        }).catch(error => console.error('Error when sending message', error));
      });

      storage[from].stage = 3;


      return msg;



    }
    else if (message === '3') {


      let msg = '🚨  Você escolheu a opção *Formação/Cursos*  🚨\n\n';
      msg += process.env.CURSO_FAQ + "\n\n"
      msg += process.env.CURSO_QUESTION_1 + "\n\n"
      msg+= '\n-----------------------------------\n1️⃣ - ```CONTINUAR ATENDIMENTO``` \n0️⃣ - ```VOLTAR AO MENU```\n\n' ;

      storage[from].stage = 3;
      bolCurso =true;


      return msg;
    }

    else if (message === '0') {
      client.markUnseenMessage(from);

      storage[from].stage = 5;

      return '🔃 Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.';
    }

    return '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️';
  },
};
import { menu } from '../menu.js';
import { storage } from '../storage.js';

export const stageThree = {
  exec({ from, message, client }) {
    if (message === '1') {
      let msg = '🚨  Você escolheu continuar o atendimento   🚨\n\n';
     if(bolCurso===false){
      msg += "De mais detalhes sobre seu pedido" + "\n\n"
     }else{
      msg+=process.env.CURSO_FAQ_EXCEL +"\n\n";
      msg+=process.env.CURSO_FAQ_PROGRAMACAO +"\n\n";
      msg+="*Abaixo esta listado os cursos que lecionamos* \n\n"
      msg += '\n-----------------------------------\n1️⃣ - ```Excel``` \n2️⃣ - ```PowerBi``` \n3️⃣ - ```Programação [PHP,Desenvolvimento Mobile]```\n\n';
     
      msg += "🚨 Digite aqui quais *cursos* deseja fazer. 🚨" + "\n\n"
      msg +='🚨  Se estiver interessado em mais de um, porfavor digite todos em uma unica frase. \n\n';
      msg+= "Separando eles apenas por virgula. *Ex: [1,2]* 🚨\n\n";
     }
      storage[from].stage = 4;


      return msg;
    }

    else if (message === '0') {
      client.markUnseenMessage(from);

      storage[from].stage = 1;

      return '🔃 Encaminhando você para o menu. \n⏳ Por favor digite *LUAI* para continuar.';
    }

    return '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️';
  },
};
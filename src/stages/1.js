import { menu } from '../menu.js';
import { storage } from '../storage.js';



export const stageOne = {
  exec({ from, message, client }) {
    if (message.length>2) {
      storage[from].stage = 2;
      if(globalUser===''){
      globalUser = message;
      }
      let msg = process.env.WELCOME_CUSTOMER + globalUser;
     

      msg += "\n-----------------------------------\n"
      msg+= process.env.SERVICE_MENU_DESCRIPTION
      msg+= process.env.SERVICE_MENU_LIST
      msg += "\n-----------------------------------\n"

      return msg;
    }

    return '❌ *Digite um nome/texto válido, por favor.* \n⚠️ ```No mínimo 3 caractares``` ⚠️';
  },
};
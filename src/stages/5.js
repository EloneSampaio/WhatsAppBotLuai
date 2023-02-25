import { menu } from '../menu.js';
import { storage } from '../storage.js';

export const stageFive = {
    exec({ from, message, client }) {
        if (message === '1') {
            let msg = '🚨 *Finalizado seu pedido*  🚨\n\n';


            msg += '\n-----------------------------------\n1️⃣ - ```Encerrar Conversa``` \n0️⃣ - ```Voltar Ao Menu```\n\n';
            msg += process.env.URGENTE_SIM
            storage[from].stage = 6;


            return msg;
        } else if (message === '0') {
            let msg = '🚨 *Finalizado seu pedido*  🚨\n\n';
            msg += process.env.URGENTE_NAO
            storage[from].stage = 6;
            msg += '\n-----------------------------------\n1️⃣ - ```Encerrar Conversa``` \n0️⃣ - ```Voltar Ao Menu```\n\n';
            return msg;
        }

    },
};
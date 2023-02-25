import { menu } from '../menu.js';
import { storage } from '../storage.js';

export const stageFour = {
    exec({ from, message, client }) {
        if(bolCurso===true){
            message = "TODOS OS CURSOS SELECIONADOS"
        }
        if (message.length > 10) {
            let msg = '🚨 Obrigado*  🚨\n\n';
            if (globalDescricao === '') {
                globalDescricao = message
            }
            msg += "Sua mensagem foi registrada" + "\n\n"
            msg += "Sua solicitação é urgente?";
            msg += '\n-----------------------------------\n1️⃣ - ```Urgente``` \n0️⃣ - ```Posso esperar```\n\n';

            storage[from].stage = 5;


            return msg;
        }

        return '❌ *Texto muito curto.* \n⚠️ ```PORFAVOR ESCREVA UMA DESCRIÇÃO COM NO MINIMO 20 CARACTERES``` ⚠️';
    },
};
import { menu } from '../menu.js';
import { storage } from '../storage.js';

export const finalStage = {
    exec({ from, message, client }) {
        if (message === '1') {
            let msg = '🚨 *Resumo do seu pedido*  🚨\n\n';


            msg += '*Nome*:' + globalUser +"\n";
            msg+= "*Pedido*: "+ globalDescricao+"\n\n"
            msg+="Se quiser reiniciar o atendimento digite *LUAI* "
            storage[from].stage = 1;
            bolCurso =false
            globalDescricao= ''

            return msg;
        } else if (message === '0') {
            let msg = '🚨 Digite *LUAI*  para voltar ao menu 🚨\n\n';
            storage[from].stage = 1;
            bolCurso = false
            globalDescricao = ''
            return msg;
        }

    },
};
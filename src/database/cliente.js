import Cliente from './db.js';

export default {

    async createCliente(number) {
        const foundCliente = await Cliente.findOne({ whatsapp: number });
        if (!foundCliente) {

            const cliente = await Cliente.create({ whatsapp: number });
            return 'create'
        } else {
            return 'exist';
        }
    },

    async findCliente(number) {

        try {

            const foundCliente = await Cliente.findOne({ whatsapp: number });
            if (foundCliente) {

                return foundCliente;
            } else {
                return '';
            }
        } catch (error) {

            return error;
        }
    },

    async updateCliente(number, nome, texto) {
        let cliente = {}
        try {
            if (nome) {

                cliente = {
                    nome: nome,

                };

            }
            if (texto) {

                cliente = {

                    texto: texto,
                };

            }


            const updatedCliente = await Cliente.findOneAndUpdate({ whatsapp: number }, cliente, { new: true });
            if (updatedCliente) {

                return true;
            } else {

                return '';
            }
        } catch (error) {

            return error;
        }
    },
}



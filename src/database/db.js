import mongoose from 'mongoose';

import * as dotenv from 'dotenv'
dotenv.config()

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'));

mongoose.Promise = global.Promise;

  const Schema = mongoose.Schema;
  
  
  const myClienteSchema = new Schema({
  
    whatsapp: { type: String, default: '' },
    nome: String,
    texto: String,
    createdAt: { type: Date, default: Date.now }
  });
  export default mongoose.model('cliente', myClienteSchema);

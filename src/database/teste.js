import clienteModel from './cliente.js';




 let dados= clienteModel.createCliente("9235500033");
  //let dados =  clienteModel.findCliente("9235500033");
  dados.then(val =>  console.log(val.whatsapp))
  //clienteModel.updateCliente("9235500033","Elone","Quero um carro")
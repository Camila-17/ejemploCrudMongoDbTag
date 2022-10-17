//Teniendo el paquete de mongos instalado, se procede a crear un esquema por cada coleccion que se tenga en la BD

const mongoose = require('mongoose');
//Se crea el esquema (Estrucutura de campos) de la coleccion task
const Schema = mongoose.Schema;
//Definir el esquema para dicha coleccion
const TaskSchema = Schema({
  title: String,
  description: String,
  status: {
    type: Boolean,
    default: false
  }
});
// Exportar el esquema para que sea utilizado por otro archivo

module.exports = mongoose.model("tasks", TaskSchema);
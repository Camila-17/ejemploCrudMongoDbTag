const express = require("express"); //Framework: para las rutas o endPoints
const router = express.Router(); // El mismo manejo de rutas pero con el método Router de express
const Task = require("../models/tasks"); //Se importa el archivo task.js que contiene en equema TASK

router.get("/", async (req, res) => {
  const tasks = await Task.find(); //Task toma todos los documentos (registros) de la collections tasks
  //La siguiente instruccion permite invocar un archivo llamadado index.js, con el parametro tasks
  res.render("index", {
    tasks,
  });
});

//Se genera la ruta  para agregar una tarea
router.post("/add", async (req, res, next) => {
  const task = new Task(req.body); //Recoge los datos enviados desde el formulario (index.js)
  await task.save();
  res.redirect("/");
});

//Esta ruta permite cambiar el estado de una tarea tasks
router.get("/turn/:id", async (req, res) => {
  let { id } = req.params; //Desestructurando el parametro
  const task = await Task.findById(id); //Buscar el id de la tarea a cambiar el estado (true or false)
  task.status = !task.status; //Cambia el estado a true o false
  await task.save();
  res.redirect("/");
});

//Ruta para recuperar title y description de  la tarea a la cual se hace clic en editar
router.get("/edit/:id", async (req, res, next) => {
  const task = await Task.findById(req.params.id); //Task : queda con la informacion del __id de la task
  console.log(task);
  res.render("edit", { task }); //Invocar la plantilla edit.ejs con la informacion de la tarea seleccionada
});

//Ruta para cambiar o actualizar la informacion de la tarea (task) modificada
router.post("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body); //El formulario envia el title y description
  res.redirect("/");
});

router.get("/delete/:id", async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;

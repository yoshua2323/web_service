const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const TaskModel = require('./task_schema');

// Conectar a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexión exitosa a la base de datos");
}).catch(err => {
    console.error("Error al conectar a la base de datos:", err);
});

// Crear una tarea
router.post('/create-task', async (req, res) => {
    try {
        const { TaskId, Name, Deadline } = req.body;
        const task = new TaskModel({ TaskId, Name, Deadline });
        await task.save();
        res.status(200).send("Tarea creada correctamente");
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Obtener todas las tareas
router.get('/all-tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Actualizar una tarea
router.put('/update-task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const { Name, Deadline } = req.body;
        await TaskModel.findOneAndUpdate({ TaskId: taskId }, { Name, Deadline });
        res.status(200).send("Tarea actualizada correctamente");
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Eliminar una tarea
router.delete('/delete-task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        await TaskModel.deleteOne({ TaskId: taskId });
        res.status(200).send("Tarea eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        res.status(500).send("Error interno del servidor");
    }
});

module.exports = router;


/**
 * Se maneja en la API una arquitectura de 3 capas: 
 *  Router -> Controller -> Service Layer -> Data Access Layer
 */

const workoutService = require('../services/workoutService');

// TODO: features para implementar:
/** 
 * filtrar por otros campos
 * Opción de filtrar 5 workouts solamente, por ejemplo
 * Realizar la opción de paginación
 * Ordenar por fecha de creación, actualización etc.
*/
const getAllWorkouts = (req, res) => {

    const { mode } = req.query;
    try {
        const allWorkouts = workoutService.getAllWorkouts({ mode });
        res
            .status(200)
            .send({ status: "OK", data: allWorkouts });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
}

const getOneWorkout = (req, res) => {
    const { workoutId } = req.params;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: 'FAILED',
                data: { error: 'Parametro ":workoutId" no puede estar vacío' }
            })
    }
    try {
        const workout = workoutService.getOneWorkout(workoutId);
        res.send({ status: "OK", data: workout });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } })
    }
}

const createNewWorkout = (req, res) => {
    const { body } = req;
    // Se podría usar express-validator o otro paquete para validar
    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "Alguna de las siguiente claves está vacía o no se encuentra en el body: name, mode, equipment, exercises, trainerTips"
                }
            });
        return;
    }
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    }
    try {
        const createdWorkout = workoutService.createNewWorkout(newWorkout);
        res.status(201).send({ status: "OK", data: createdWorkout })
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
}

const updateOneWorkout = (req, res) => {
    const { workoutId } = req.params;
    const { body } = req;

    if (!workoutId) {
        res
            .status(400)
            .send({
                status: 'FAILED',
                data: { error: 'Parametro ":workoutId" no puede estar vacío' }
            })
    }
    try {
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
        res.send({ status: "OK", data: updatedWorkout });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
}

const deleteOneWorkout = (req, res) => {
    const { workoutId } = req.params;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: 'FAILED',
                data: { error: 'Parametro ":workoutId" no puede estar vacío' }
            })
    }
    try {
        workoutService.deleteOneWorkout(workoutId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}
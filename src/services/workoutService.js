// Acá se maneja la lógica del negocio
const { v4: uuid } = require('uuid');

const Workout = require('../database/Workout');

// Es buena práctica llamar los métodos de servicio como los del controlador
const getAllWorkouts = (filterParams) => {
    try {
        const allWorkouts = Workout.getAllWorkouts(filterParams);
        return allWorkouts;
    } catch (error) {
        throw error;
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = Workout.getOneWorkout(workoutId);
        return workout;
    } catch (error) {
        throw error;
    }
}

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("es-CO"),
        updatedAt: new Date().toLocaleString("es-CO")
    }
    try {
        const createdWorkout = Workout.createNewWorkout(workoutToInsert);
        return createdWorkout;
    } catch (error) {
        throw error;
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
        return updatedWorkout;
    } catch (error) {
        throw error;
    }
}

const deleteOneWorkout = (workoutId) => {
    try {
        Workout.deleteOneWorkout(workoutId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}
const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllWorkouts = (filterParams) => {
    try {
        const { mode } = filterParams;

        let workouts = DB.workouts
        if (mode) {
            return workouts.filter(workout =>
                workout.mode.toLowerCase().includes(mode.toLowerCase()));
        }
        return workouts;

    } catch (error) {
        throw { status: 500, message: error }
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const allWorkouts = DB.workouts;
        const workout = allWorkouts.find(workout => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 400,
                message: `No existe workout con el Id: ${workoutId}`
            }
        }
        return workout;

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

const createNewWorkout = (newWorkout) => {
    try {
        const workouts = DB.workouts;
        const isAlreadyAdded = workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout con el nombre ${newWorkout.name} ya existe`
            }
        }
        workouts.push(newWorkout);
        saveToDatabase(DB);

        return newWorkout;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        let workouts = DB.workouts;
        const isAlreadyAdded = workouts.findIndex(({ name }) => name === changes.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `ya existe workout con el nombre '${changes.name}'`,
            };
        }
        const indexForUpdate = workouts.findIndex(workout => workout.id === workoutId);
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `No existe workout con el Id: ${workoutId}`
            }
        }
        // Fusiona los dos objetos, en caso de cambiar algún valor, deja el objeto changes. Gracias al espread operator
        const updatedWorkout = {
            ...workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("es-CO")
        }
        workouts[indexForUpdate] = updatedWorkout;
        saveToDatabase(DB);

        return updatedWorkout;

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex(workout => workout.id === workoutId);
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `No existe workout con el Id: ${workoutId}`
            }
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase(DB);

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}
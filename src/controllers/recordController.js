
const recordService = require('../services/recordService');

const getRecordForWorkout = (req, res) => {
    const { workoutId } = req.params;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: 'FAILED',
                data: { error: 'Parametro ":workoutId" no puede estar vacío' }
            });
    }
    try {
        const record = recordService.getRecordForWorkout(workoutId);
        res
            .status(200)
            .send({ status: 'Ok', data: record });

    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
}

module.exports = {
    getRecordForWorkout
}
const express = require('express')

const app = express();
const PORT = process.env.PORT || 3002;

// middlewares
app.use(express.json());

// routes
app.use('/api/v1/workouts', require('./v1/routes/workoutRoutes'));

app.listen(PORT, () => {
    console.log(`API is listen on port ${PORT}`);
});
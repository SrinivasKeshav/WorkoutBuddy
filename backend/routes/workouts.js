const express = require('express');
const router = express.Router();
const { getAllWorkouts,
        getWorkout,
        createWorkout,
        deleteWorkout,
        updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);


router.route('/')
    .get(getAllWorkouts)
    .post(createWorkout)

router.route('/:id')
    .get(getWorkout)
    .delete(deleteWorkout)
    .patch(updateWorkout)

module.exports = router
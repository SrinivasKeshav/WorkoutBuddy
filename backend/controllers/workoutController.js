const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id;
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});
    res.status(200).json(workouts);
}

const getWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id);
    
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    res.status(200).json(workout);
}

const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(emptyFields.length){
        return res.status(400).json({error : 'Please fill in all fields', emptyFields})
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }
    
    const workout = await Workout.findByIdAndDelete(id);
    
    if(!workout) {
        return res.status(400).json({error: 'No such workout'})
    }
    
    res.status(200).json(workout);
}

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndUpdate(id, {...req.body});

    if (!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout);
}

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
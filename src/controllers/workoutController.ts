const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req: any, res: any) => {
  // newest ones first
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get one workout
const getWorkout = async (req: any, res: any) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    res.status(404).json({ error: 'Workout not found' });
  } else {
    res.status(200).json(workout);
  }
};

// create new workout
const createWorkout = async (req: any, res: any) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push('title');
  if (!reps) emptyFields.push('reps');
  if (!load) emptyFields.push('load');

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: `Please fill in the following fields: ${emptyFields.join(', ')}`,
      emptyFields
    });
  }
  // add document to database
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ message: 'Workout created', workout });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req: any, res: any) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    res.status(400).json({ error: 'Workout not found' });
  } else {
    res.status(200).json({ message: 'Workout deleted', workout });
  }
};

// update a workout
const updateWorkout = async (req: any, res: any) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout not found' });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    res.status(400).json({ error: 'Workout not found' });
  } else {
    res.status(200).json({ message: 'Workout updated', workout });
  }
};

// export all functions
export = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};

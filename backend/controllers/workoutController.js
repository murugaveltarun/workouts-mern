import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";



// get all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.send(400).json({ error: error.message });
  }
};


//get a single workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};



//create new workout
export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = []

  if(!title){
    emptyFields.push('title')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  if(!load){
    emptyFields.push('load')
  }

  if (emptyFields.length >0){
    return res.status(400).json({error: 'Please fil in all the fields', emptyFields})
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "not a valid id" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    req.status(400).json({ error: "workout not found " });
  }
  res.status(200).json({ message: "workout has been deleted." });
};


//patch a workout
export const patchWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "not a valid id" });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    req.status(400).json({ error: "workout not found " });
  }
  res.status(200).json({ message: "workout has been updated." }).json(workout);
};

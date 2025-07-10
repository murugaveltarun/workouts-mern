import express from "express";
import { createWorkout, getWorkouts ,getWorkout, deleteWorkout, patchWorkout} from "../controllers/workoutController.js";
const router = express.Router();

router.get("/",getWorkouts);

router.get("/:id",getWorkout);

router.post("/",createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", patchWorkout);

export default router;

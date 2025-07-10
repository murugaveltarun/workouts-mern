import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails.js";
import WorkoutForm from "../components/WorkoutForm.js";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await fetch("http://localhost:4000/api/workouts");
      const json = await response.json();


      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    }
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

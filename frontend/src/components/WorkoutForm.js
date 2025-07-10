import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
  const {dispatch} = useWorkoutsContext()
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([])
  async function handleSubmit(e) {
    e.preventDefault();

    const workout = { title, load, reps };
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added", json);
      dispatch({type:"CREATE_WORKOUT", payload:json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        placeholder="name of your exercise..."
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        className={emptyFields.includes('title')?'error':''}
      />

      <label>Reps (counts):</label>
      <input
        type="number"
        placeholder="number of reps..."
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
        className={emptyFields.includes('reps')?'error':''}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        placeholder="Weight in kg..."
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        value={load}
        className={emptyFields.includes('load')?'error':''}
      />

      <button type="submit">ADD</button>
      {error && (
        <div className="error"> {error} </div>
      )}
    </form>
  );
}

export default WorkoutForm;
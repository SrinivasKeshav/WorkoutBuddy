import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, reps, load };

    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (res.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log("new workout added:", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <Card sx={{ minWidth: 275, maxHeight: 500 }}>
      <CardContent>
        <form className="create" onSubmit={handleSubmit}>
          <h2>Add a new Workout</h2>

          <label htmlFor="title">Excercise Title</label>
          <input
            type="text"
            id="title"
            onChange={(evt) => setTitle(evt.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
          />

          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            id="reps"
            onChange={(evt) => setReps(evt.target.value)}
            value={reps}
            className={emptyFields.includes("load") ? "error" : ""}
          />

          <label htmlFor="load">Load (in Kg)</label>
          <input
            type="number"
            id="load"
            onChange={(evt) => setLoad(evt.target.value)}
            value={load}
            className={emptyFields.includes("reps") ? "error" : ""}
          />
          <button>Add Workout</button>
          {error && <div className="error">{error}</div>}
        </form>
      </CardContent>
    </Card>
  );
}

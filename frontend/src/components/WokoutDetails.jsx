import { useWorkoutContext } from "../hooks/useWorkoutContext";
import DeleteIcon from "@mui/icons-material/Delete";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    const res = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await res.json();

    if (res.ok) {
      console.log(json);
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>load (Kg): </strong>
        {workout.load}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span>
        <DeleteIcon style={{ display: "inline-block" }} onClick={handleClick} />
      </span>
    </div>
  );
}

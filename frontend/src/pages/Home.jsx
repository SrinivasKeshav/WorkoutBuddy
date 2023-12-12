import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import WorkoutDetails from "../components/WokoutDetails";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts");
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="Home">
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

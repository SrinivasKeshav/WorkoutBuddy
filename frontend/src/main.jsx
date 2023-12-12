import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkoutContextProvider } from "./contexts/WorkoutContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </React.StrictMode>
);

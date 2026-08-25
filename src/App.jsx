import { useEffect } from "react";
import { getAll } from "./services/tarea.service";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAll();
        console.log("Tasks fetched successfully:", tasks);
      } catch (e) {
        console.error("Error fetching tasks in App:", e);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Management</h1>
      <p>Check the developer console to view the API response.</p>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CategoryList } from "./components/CategoryList";
import { TagList } from "./components/TagList";
import { TaskList } from "./components/TaskList";
import { Login } from "./components/Login";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("tasks");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
      }}
    >
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="main-container">
        {currentTab === "tasks" && <TaskList />}
        {currentTab === "categories" && <CategoryList />}
        {currentTab === "tags" && <TagList />}
      </main>
    </div>
  );
}

export default App;

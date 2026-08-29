import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { CategoryList } from "./components/CategoryList";
import { TagList } from "./components/TagList";
import { TaskList } from "./components/TaskList";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("tasks");

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

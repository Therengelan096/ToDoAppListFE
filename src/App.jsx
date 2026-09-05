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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setIsAuthenticated(false);
    if (window.history && window.history.pushState) {
      window.history.pushState(null, "", window.location.href);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleLogout();
    } else {
      setIsAuthenticated(true);
    }
    const handlePopState = () => {
      const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
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
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onLogout={handleLogout}
      />

      <main className="main-container">
        {currentTab === "tasks" && <TaskList onUnauthorized={handleLogout} />}
        {currentTab === "categories" && (
          <CategoryList onUnauthorized={handleLogout} />
        )}
        {currentTab === "tags" && <TagList onUnauthorized={handleLogout} />}
      </main>
    </div>
  );
}

export default App;
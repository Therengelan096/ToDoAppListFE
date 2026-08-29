import { useEffect, useState } from "react";
import { getAll, update } from "../services/tarea.service";
import { TaskForm } from "./TaskForm";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAll();
      setTasks(data.tasks || data);
    } catch (err) {
      setError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleStatus = async (task) => {
    const newStatus = !task.is_completed;
    const payload = {
      title: task.title,
      description: task.description,
      category_id: task.category_id,
      is_completed: newStatus,
      tags: task.tags?.map((t) => t.id) || [],
    };

    try {
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, is_completed: newStatus } : t,
        ),
      );
      await update(task.id, payload);
    } catch (err) {
      console.error("Error al actualizar estado");
      fetchTasks();
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div style={{ padding: "10px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Gestión de Tareas</h2>
        <button
          onClick={() => {
            if (showForm) {
              handleCloseForm();
            } else {
              setEditingTask(null);
              setShowForm(true);
            }
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: showForm ? "#64748b" : "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Cerrar Formulario" : "+ Crear Tarea"}
        </button>
      </div>

      {showForm && (
        <TaskForm
          editingTask={editingTask}
          onTaskSaved={fetchTasks}
          onClose={handleCloseForm}
        />
      )}

      {loading && <p style={{ textAlign: "center" }}>Cargando tareas...</p>}

      {error && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <p style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</p>
          <button
            onClick={fetchTasks}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderColor: "#334155",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#1e293b" }}>
              <th>ID</th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => {
                const isDone = task.is_completed;
                return (
                  <tr key={task.id} style={{ textAlign: "center" }}>
                    <td>{task.id}</td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => handleToggleStatus(task)}
                        style={{
                          cursor: "pointer",
                          width: "18px",
                          height: "18px",
                        }}
                      />
                      <span
                        style={{
                          textDecoration: isDone ? "line-through" : "none",
                          color: isDone ? "#94a3b8" : "inherit",
                        }}
                      >
                        {task.title}
                      </span>
                    </td>
                    <td>
                      {task.category?.name ||
                        task.category_id ||
                        "Sin categoría"}
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor: isDone ? "#166534" : "#854d0e",
                          color: "white",
                          fontSize: "12px",
                        }}
                      >
                        {isDone ? "Completada" : "Pendiente"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEditClick(task)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No hay tareas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

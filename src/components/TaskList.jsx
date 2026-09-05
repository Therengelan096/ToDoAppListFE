import { useEffect, useState } from "react";
import { getAll, update, remove } from "../services/tarea.service";
import { TaskForm } from "./TaskForm";
import { TaskDetail } from "./TaskDetail";
import { Pagination } from "./Pagination";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = Array.isArray(tasks)
    ? tasks.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Math.ceil((tasks.length || 0) / itemsPerPage);

  const handleToggleStatus = async (task) => {
    const currentStatus = Boolean(task.is_completed || task.completed);
    const newStatus = !currentStatus;
    const payload = {
      title: task.title || task.titulo,
      description: task.description || task.descripcion,
      category_id: task.category_id || task.category?.id,
      is_completed: newStatus,
      tags: task.tags?.map((t) => (typeof t === "object" ? t.id : t)) || [],
    };

    try {
      setTasks(
        tasks.map((t) =>
          t.id === task.id
            ? { ...t, is_completed: newStatus, completed: newStatus }
            : t,
        ),
      );
      await update(task.id, payload);
    } catch (err) {
      console.error("Error al actualizar estado");
      fetchTasks();
    }
  };

  const handleEditClick = (task) => {
    setViewingTask(null);
    setDeletingTask(null);
    setEditingTask(task);
    setShowForm(true);
  };

  const handleViewClick = (task) => {
    setShowForm(false);
    setDeletingTask(null);
    setViewingTask(task);
  };

  const handleDeleteClick = (task) => {
    setShowForm(false);
    setViewingTask(null);
    setDeletingTask(task);
  };

  const confirmDelete = async () => {
    if (!deletingTask) return;
    try {
      setDeletingLoading(true);
      await remove(deletingTask.id);
      setTasks(tasks.filter((t) => t.id !== deletingTask.id));
      setDeletingTask(null);
    } catch (err) {
      alert("Error al eliminar la tarea");
    } finally {
      setDeletingLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const renderTags = (taskTags) => {
    if (!Array.isArray(taskTags) || taskTags.length === 0) {
      return <span style={{ color: "#94a3b8" }}>Sin etiquetas</span>;
    }

    const visibleTags = taskTags.slice(0, 3);
    const hasMore = taskTags.length > 3;

    return (
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {visibleTags.map((tag) => (
          <span
            key={tag.id || tag}
            style={{
              padding: "2px 6px",
              backgroundColor: "#334155",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {tag.name || tag.nombre || tag}
          </span>
        ))}
        {hasMore && (
          <span style={{ color: "#94a3b8", fontSize: "12px" }}>...</span>
        )}
      </div>
    );
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
              setViewingTask(null);
              setDeletingTask(null);
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
      {viewingTask && (
        <TaskDetail task={viewingTask} onClose={() => setViewingTask(null)} />
      )}

      {deletingTask && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setDeletingTask(null)}
        >
          <div
            style={{
              backgroundColor: "#1e293b",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              border: "1px solid #334155",
              color: "#f8fafc",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 12px 0", color: "#ef4444" }}>
              ¿Eliminar tarea?
            </h3>
            <p style={{ margin: "0 0 20px 0", color: "#cbd5e1" }}>
              ¿Estás seguro de que deseas eliminar la tarea{" "}
              <strong>"{deletingTask.title}"</strong>?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setDeletingTask(null)}
                disabled={deletingLoading}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#64748b",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingLoading}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {deletingLoading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
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
        <>
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
              {Array.isArray(currentTasks) && currentTasks.length > 0 ? (
                currentTasks.map((task) => {
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
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() => handleViewClick(task)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#0284c7",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Ver
                        </button>
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
                        <button
                          onClick={() => handleDeleteClick(task)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Eliminar
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

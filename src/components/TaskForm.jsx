import { useEffect, useState } from "react";
import { create, update } from "../services/tarea.service";
import { getAll as getCategories } from "../services/category.service";
import { getAll as getTags } from "../services/tag.service";

export const TaskForm = ({ onTaskSaved, onClose, editingTask = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [completed, setCompleted] = useState(false);

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSelectData();
  }, []);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || editingTask.titulo || "");
      setDescription(editingTask.description || editingTask.descripcion || "");

      const catId = editingTask.category_id || editingTask.category?.id;
      setCategoryId(catId ? String(catId) : "");

      if (Array.isArray(editingTask.tags)) {
        setSelectedTags(
          editingTask.tags.map((t) => (typeof t === "object" ? t.id : t)),
        );
      } else {
        setSelectedTags([]);
      }
      setCompleted(Boolean(editingTask.is_completed));
    }
  }, [editingTask]);

  const loadSelectData = async () => {
    try {
      const catData = await getCategories();
      const tagData = await getTags();
      setCategories(catData.categories || catData);
      setTags(tagData.tags || tagData);
    } catch (err) {
      console.error("Error al cargar categorías o etiquetas:", err);
    }
  };

  const handleTagToggle = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !categoryId) {
      setError("El título y la categoría son obligatorios");
      return;
    }

    const payload = {
      title,
      description,
      category_id: Number(categoryId),
      tags: selectedTags,
      is_completed: completed,
    };

    try {
      setLoading(true);
      setError(null);

      if (editingTask) {
        await update(editingTask.id, payload);
      } else {
        await create(payload);
      }

      if (onTaskSaved) onTaskSaved();
      if (onClose) onClose();
    } catch (err) {
      const titleError = err.errors?.title?.[0] || err.message;
      if (titleError && titleError.includes("already been taken")) {
        setError("El título ya está registrado. Por favor ingresa otro.");
      } else {
        setError(err.message || "Error al guardar la tarea");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h3 style={{ margin: 0, textAlign: "center", color: "#f8fafc" }}>
        {editingTask ? "Editar Tarea" : "Nueva Tarea"}
      </h3>

      {error && <p style={{ color: "#ef4444", margin: 0 }}>{error}</p>}

      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #475569",
        }}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #475569",
        }}
      />

      <div>
        <label
          style={{ display: "block", marginBottom: "4px", color: "#cbd5e1" }}
        >
          Categoría
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
        >
          <option value="">-- Seleccionar Categoría --</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name || cat.nombre}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "4px", color: "#cbd5e1" }}
        >
          Etiquetas
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {Array.isArray(tags) &&
            tags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "#3b82f6" : "#475569",
                    color: "white",
                  }}
                >
                  {tag.name || tag.nombre} {isSelected && "✓"}
                </button>
              );
            })}
        </div>
      </div>

      {editingTask && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label
            htmlFor="completed"
            style={{ color: "#cbd5e1", cursor: "pointer" }}
          >
            Marcar como completada
          </label>
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
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
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: editingTask ? "#3b82f6" : "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Guardando..."
            : editingTask
              ? "Actualizar Tarea"
              : "Crear Tarea"}
        </button>
      </div>
    </form>
  );
};

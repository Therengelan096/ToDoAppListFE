import { useState, useEffect } from "react";
import { create, update } from "../services/category.service";

export const CategoryForm = ({
  onCategorySaved,
  editingCategory,
  clearSelection,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || editingCategory.nombre || "");
    } else {
      setName("");
    }
  }, [editingCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (editingCategory) {
        await update(editingCategory.id, { name: name.trim() });
      } else {
        await create({ name: name.trim() });
      }

      setName("");
      if (clearSelection) clearSelection();
      if (onCategorySaved) onCategorySaved();
    } catch (err) {
      setError("Ocurrió un error al guardar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setError("");
    if (clearSelection) clearSelection();
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "8px 15px", marginRight: "10px" }}
        >
          {loading
            ? "Guardando..."
            : editingCategory
              ? "Actualizar"
              : "Guardar Categoría"}
        </button>

        {editingCategory && (
          <button
            type="button"
            onClick={handleCancel}
            style={{ padding: "8px 15px", backgroundColor: "#ccc" }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

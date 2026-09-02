import { useState, useEffect } from "react";
import { create, update } from "../services/tag.service";

export const TagForm = ({ onTagSaved, editingTag, clearSelection }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTag) {
      setName(editingTag.name || editingTag.nombre || "");
    } else {
      setName("");
    }
  }, [editingTag]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre de la etiqueta es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (editingTag) {
        await update(editingTag.id, { name: name.trim() });
      } else {
        await create({ name: name.trim() });
      }

      setName("");
      if (clearSelection) clearSelection();
      if (onTagSaved) onTagSaved();
    } catch (err) {
      setError("Ocurrió un error al guardar la etiqueta.");
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
      <h3>{editingTag ? "Editar Etiqueta" : "Nueva Etiqueta"}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Nombre de la etiqueta"
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
          {loading ? "Guardando..." : editingTag ? "Actualizar" : "Guardar Etiqueta"}
        </button>

        {editingTag && (
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
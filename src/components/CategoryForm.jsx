import { useState } from "react";
import { create } from "../services/category.service";

export const CategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await create({ name: name.trim() });

      setName("");
      if (onCategoryAdded) {
        onCategoryAdded();
      }
    } catch (err) {
      setError("Ocurrió un error al guardar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Nueva Categoría</h3>
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
          style={{ padding: "8px 15px" }}
        >
          {loading ? "Guardando..." : "Guardar Categoría"}
        </button>
      </form>
    </div>
  );
};

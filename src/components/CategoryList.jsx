import { useEffect, useState } from "react";
import { getAll } from "../services/category.service";
import { CategoryForm } from "./CategoryForm";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAll();
      setCategories(data.categories || data);
    } catch (err) {
      setError("Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setEditingCategory(category);
  };

  const clearSelection = () => {
    setEditingCategory(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Categorías</h2>

      <CategoryForm
        onCategorySaved={fetchCategories}
        editingCategory={editingCategory}
        clearSelection={clearSelection}
      />

      {loading && <p>Cargando categorías...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name || cat.nombre}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(cat)}
                      style={{ padding: "5px 10px", cursor: "pointer" }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No hay categorías disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
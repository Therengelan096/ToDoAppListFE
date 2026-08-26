// src/components/CategoryList.jsx
import { useEffect, useState } from "react";
import { getAll } from "../services/category.service";
import { CategoryForm } from "./CategoryForm";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Categorías</h2>

      {/* Formulario para el Ticket 8 */}
      <CategoryForm onCategoryAdded={fetchCategories} />

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
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name || cat.nombre}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No hay categorías disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

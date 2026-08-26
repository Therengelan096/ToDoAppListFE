import { useEffect, useState } from "react";
import { getAll } from "../services/category.service";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAll();
        setCategories(data.categories || data);
      } catch (err) {
        setError("Error al cargar las categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Categorías</h2>
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
    </div>
  );
};

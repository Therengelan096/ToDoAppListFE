import { useEffect, useState } from "react";
import { getAll, remove } from "../services/category.service";
import { CategoryForm } from "./CategoryForm";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

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

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await remove(categoryToDelete.id);
      closeDeleteModal();
      fetchCategories();
    } catch (err) {
      setError("No se pudo eliminar la categoría");
      closeDeleteModal();
    }
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
                      style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(cat)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ff4d4d",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
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

      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "Center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h3>Confirmar eliminación</h3>
            <p>
              ¿Estás seguro de que deseas eliminar la categoría{" "}
              <strong>
                {categoryToDelete?.name || categoryToDelete?.nombre}
              </strong>
              ?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={closeDeleteModal}
                style={{ padding: "8px 15px" }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "8px 15px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
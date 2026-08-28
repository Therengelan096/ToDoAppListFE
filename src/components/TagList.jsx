import { useEffect, useState } from "react";
import { getAll, remove, getById } from "../services/tag.service";
import { TagForm } from "./TagForm";

export const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTag, setEditingTag] = useState(null);

  // Estados para ver detalle
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Estados para eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const data = await getAll();
      setTags(data.tags || data);
    } catch (err) {
      setError("Error al cargar las etiquetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleEditClick = (tag) => {
    setEditingTag(tag);
  };

  const clearSelection = () => {
    setEditingTag(null);
  };

  const handleViewClick = async (id) => {
    try {
      setLoadingDetail(true);
      setShowDetailModal(true);
      const data = await getById(id);
      setSelectedTag(data.tag || data);
    } catch (err) {
      setError("No se pudo obtener el detalle de la etiqueta");
      setShowDetailModal(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTag(null);
  };

  const openDeleteModal = (tag) => {
    setTagToDelete(tag);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setTagToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (!tagToDelete) return;

    try {
      await remove(tagToDelete.id);
      closeDeleteModal();
      fetchTags();
    } catch (err) {
      setError("No se pudo eliminar la etiqueta");
      closeDeleteModal();
    }
  };

  return (
    <div style={{ padding: "10px 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Gestión de Etiquetas
      </h2>

      <TagForm
        onTagSaved={fetchTags}
        editingTag={editingTag}
        clearSelection={clearSelection}
      />

      {loading && <p style={{ textAlign: "center" }}>Cargando etiquetas...</p>}
      {error && (
        <p style={{ color: "#ef4444", textAlign: "center" }}>{error}</p>
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
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tags) && tags.length > 0 ? (
              tags.map((tag) => (
                <tr key={tag.id} style={{ textAlign: "center" }}>
                  <td>{tag.id}</td>
                  <td>{tag.name || tag.nombre}</td>
                  <td>
                    <button
                      onClick={() => handleViewClick(tag.id)}
                      style={{
                        padding: "6px 12px",
                        marginRight: "8px",
                        cursor: "pointer",
                        backgroundColor: "#0284c7",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleEditClick(tag)}
                      style={{
                        padding: "6px 12px",
                        marginRight: "8px",
                        cursor: "pointer",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(tag)}
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
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No hay etiquetas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal de Detalle */}
      {showDetailModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Detalle de la Etiqueta</h3>
            {loadingDetail ? (
              <p>Cargando detalle...</p>
            ) : selectedTag ? (
              <div>
                <p>
                  <strong>ID:</strong> {selectedTag.id}
                </p>
                <p>
                  <strong>Nombre:</strong>{" "}
                  {selectedTag.name || selectedTag.nombre}
                </p>
              </div>
            ) : (
              <p>No se encontró información.</p>
            )}
            <div className="modal-actions">
              <button
                onClick={closeDetailModal}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#475569",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar eliminación</h3>
            <p>
              ¿Estás seguro de que deseas eliminar la etiqueta{" "}
              <strong style={{ color: "#38bdf8" }}>
                {tagToDelete?.name || tagToDelete?.nombre}
              </strong>
              ?
            </p>
            <div className="modal-actions">
              <button
                onClick={closeDeleteModal}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#475569",
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
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
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

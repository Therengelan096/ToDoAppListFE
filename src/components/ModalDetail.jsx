import "./styles/ModalDetail.css";

export const ModalDetail = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Detalle de la Categoría</h3>
        {data ? (
          <div>
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>Nombre:</strong> {data.name || data.nombre}
            </p>
          </div>
        ) : (
          <p>No se encontró información.</p>
        )}
        <div className="modal-actions">
          <button onClick={onClose} className="btn-close">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

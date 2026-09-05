import "./styles/TaskDetailModal.css";

export const TaskDetail = ({ task, onClose }) => {
  if (!task) return null;
  const isDone = Boolean(task.is_completed);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="modal-badge-id">#{task.id}</span>
            <h3 className="modal-title">Detalle de Tarea</h3>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div>
            <span className="modal-field-label">Título</span>
            <h4 className="modal-field-value-title">
              {task.title || task.titulo}
            </h4>
          </div>

          <div>
            <span className="modal-field-label">Descripción</span>
            <p className="modal-field-value-desc">
              {task.description ||
                task.descripcion ||
                "Sin descripción proporcionada."}
            </p>
          </div>

          <div className="modal-row">
            <div className="modal-col">
              <span className="modal-field-label">Categoría</span>
              <p className="modal-category-text">
                {task.category?.name ||
                  task.category?.nombre ||
                  "Sin categoría"}
              </p>
            </div>

            <div className="modal-col">
              <span className="modal-field-label">Estado</span>
              <div>
                <span
                  className={`modal-status-badge ${
                    isDone ? "modal-status-completed" : "modal-status-pending"
                  }`}
                >
                  {isDone ? "Completada" : "Pendiente"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className="modal-field-label">Etiquetas</span>
            <div className="modal-tags-container">
              {Array.isArray(task.tags) && task.tags.length > 0 ? (
                task.tags.map((tag) => (
                  <span key={tag.id} className="modal-tag-chip">
                    {tag.name || tag.nombre}
                  </span>
                ))
              ) : (
                <span className="modal-empty-text">Sin etiquetas</span>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

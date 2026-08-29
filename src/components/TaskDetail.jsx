export const TaskDetail = ({ task, onClose }) => {
  if (!task) return null;
  const isDone = Boolean(task.is_completed);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          width: "90%",
          maxWidth: "500px",
          borderRadius: "12px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
          border: "1px solid #334155",
          padding: "24px",
          color: "#f8fafc",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #334155",
            paddingBottom: "12px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "4px",
                backgroundColor: "#334155",
                color: "#94a3b8",
                fontWeight: "bold",
              }}
            >
              #{task.id}
            </span>
            <h3 style={{ margin: 0, fontSize: "1.25rem" }}>Detalle de Tarea</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#94a3b8",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Título
            </span>
            <h4
              style={{
                margin: "4px 0 0 0",
                fontSize: "1.1rem",
                color: "#f1f5f9",
              }}
            >
              {task.title || task.titulo}
            </h4>
          </div>

          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Descripción
            </span>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "0.95rem",
                color: "#cbd5e1",
                backgroundColor: "#0f172a",
                padding: "10px",
                borderRadius: "6px",
                minHeight: "40px",
                whiteSpace: "pre-wrap",
              }}
            >
              {task.description ||
                task.descripcion ||
                "Sin descripción proporcionada."}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                }}
              >
                Categoría
              </span>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontWeight: "500",
                  color: "#38bdf8",
                }}
              >
                {task.category?.name ||
                  task.category?.nombre ||
                  "Sin categoría"}
              </p>
            </div>

            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                }}
              >
                Estado
              </span>
              <div style={{ marginTop: "4px" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    backgroundColor: isDone ? "#166534" : "#854d0e",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "inline-block",
                  }}
                >
                  {isDone ? "Completada" : "Pendiente"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Etiquetas
            </span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "6px",
              }}
            >
              {Array.isArray(task.tags) && task.tags.length > 0 ? (
                task.tags.map((tag) => (
                  <span
                    key={tag.id}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {tag.name || tag.nombre}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  Sin etiquetas
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              backgroundColor: "#475569",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

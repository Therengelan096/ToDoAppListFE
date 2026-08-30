export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        marginTop: "16px",
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "6px 12px",
          backgroundColor: currentPage === 1 ? "#334155" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Anterior
      </button>
      <span style={{ color: "#cbd5e1", fontSize: "14px" }}>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "6px 12px",
          backgroundColor: currentPage === totalPages ? "#334155" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Siguiente
      </button>
    </div>
  );
};
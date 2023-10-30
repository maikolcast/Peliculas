export default function Cabecera({
  imagenFondo,
  searchTerm,
  setSearchTerm,
  handleSearchChange,
  titulo,
  texto,
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#fff", textAlign: "left", marginBottom: "10px" }}>
        {titulo}
      </h2>
      <p
        style={{
          color: "#fff",
          textAlign: "left",
          marginBottom: "20px",
          maxWidth: "400px",
        }}
      >
        {texto}
      </p>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar película..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

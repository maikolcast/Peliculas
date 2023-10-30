import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  URL_DETALLE,
  API_KEY,
  URL_API,
  URL_CREDITOS,
} from "../utils/constants";
import axios from "axios";

const OtroComponente = () => {
  const [pelicula, setPelicula] = useState([]);
  const [creditos, setCreditos] = useState([]); // [
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const urlCompleta = `${location.pathname}`.substring(1);

  useEffect(() => {
    const fetchPelicula = async () => {
      setCargando(true);
      setError(null);

      try {
        const response = await axios.get(
          `${URL_DETALLE}${urlCompleta}?api_key=${API_KEY}&language=es-ES`
        );
        const responseCredits = await axios.get(
          `${URL_DETALLE}${urlCompleta}/credits?api_key=${API_KEY}&language=es-ES`
        );
        const pelicula = response.data;
        const creditos = responseCredits.data;
        setPelicula(pelicula);
        setCreditos(creditos);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        setError("Error al buscar la película");
      } finally {
        setCargando(false);
      }
    };
    fetchPelicula();
  }, [urlCompleta]);

  return (
    <div>
      <div
        style={{
          height: "60vh",
          backgroundImage: `url(${URL_API}${pelicula.backdrop_path})`,
          backgroundSize: "cover",
          display: "flex",
          padding: "20px",
        }}
      >
        <div>
          <img
            src={`${URL_API}${pelicula.poster_path}`}
            alt={pelicula.title}
            style={{ width: "400px" }}
          />
        </div>
        <div style={{ background: "rgba(0, 0, 0, 0.5)", padding: "20px" }}>
          <a
            href="/"
            style={{ color: "white", textDecoration: "none", fontSize: "25px" }}
          >
            Volver al inico / {pelicula.title}
          </a>
          <h2 style={{ color: "white" }}>{pelicula.title}</h2>
          <p style={{ color: "white" }}>{pelicula.overview}</p>
        </div>
      </div>

      <div style={{ margin: "5px" }}>
        <div className="row">
          <h1>Actores</h1>
          {creditos?.cast?.map((actor) => (
            <div
              className="col-md-3"
              key={actor.id}
              style={{
                marginBottom: "40px",
                display: "flex",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  actor.profile_path
                    ? `${URL_API}${actor.profile_path}`
                    : "http://phobic-heat.surge.sh/images/no_image.jpg"
                }
                alt={actor.name}
                style={{ width: "40%", height: "100%" }}
              />
              <div
                style={{
                  padding: "10px",
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "#fff",
                }}
              >
                <h5>{actor.name}</h5>
                <p>{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtroComponente;

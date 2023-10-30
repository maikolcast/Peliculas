import React, { useState, useEffect } from "react";
import PortadaPeliculas from "./components/portadas";
import Cabecera from "./components/cabecera";
import axios from "axios";
import { URL_API, API_KEY } from "./utils/constants";
import { useLocation } from "react-router-dom";
import DetallePelicula from "./views/detallePelicula";
import "./App.css";

const MovieComponent = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [pelicula, setPelicula] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [imagenFondo, setImagenFondo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const fetchPelicula = async () => {
      setCargando(true);
      setError(null);

      try {
        const response = await axios.get(
          searchTerm === ""
            ? `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
            : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${searchTerm}`
        );
        const pelicula = response.data.results;
        setPelicula(pelicula);

        if (!imagenFondo && pelicula.length > 0) {
          setImagenFondo(`${URL_API}${pelicula[0].backdrop_path}`);
          setTitulo(pelicula[0].original_title);
          setTexto(pelicula[0].overview);
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        setError("Error al buscar la película");
      } finally {
        setCargando(false);
      }
    };
    fetchPelicula();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {location.pathname === "/" ? (
        <>
          <Cabecera
            imagenFondo={imagenFondo}
            titulo={titulo}
            texto={texto}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchChange={handleSearchChange}
          />
          {cargando ? (
            <div style={{ textAlign: "center" }}>
              <div class="spinner-border" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="container">
                <h1 style={{ marginLeft: "8px" }}>
                  {searchTerm !== ""
                    ? "Resultado de busqueda"
                    : "Películas populares"}
                </h1>
              </div>
              <PortadaPeliculas pelicula={pelicula} />
            </>
          )}
        </>
      ) : (
        <DetallePelicula />
      )}
    </div>
  );
};

export default MovieComponent;

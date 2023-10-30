import { useNavigate } from "react-router-dom";
import { URL_API } from "../utils/constants";

const Portadas = ({ pelicula }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="container">
      <div className="row">
        {pelicula.length > 0 &&
          pelicula?.map((pelicula, index) => (
            <div className="col-md-3 col-sm-12" key={index}>
              <div
                className="card ms-2 mb-2"
                style={{ maxHeight: "500px", cursor: "pointer" }}
                onClick={() => handleClick(pelicula.id)}
              >
                <img
                  src={`${URL_API}${pelicula.poster_path}`}
                  className="card-img-top"
                  alt={pelicula.title}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Portadas;

import React, { useRef, useState } from "react";

function SearchMovies() {
  const input = useRef();
  const [movies, setMovies] = useState({});
  const [inputValue, setInputValue] = useState();
  // Credenciales de API
  const apiKey = "2fc68b74";

  async function getMovies() {
    const result = await fetch(
      `http://www.omdbapi.com/?s=${inputValue.replace(" ","-")}&apikey=${apiKey}`
    );
    const data = await result.json();

    if (result.status === 200) {
      console.log(data);
      setMovies(data);
    }
  }

  return (
    <div className="container-fluid">
      {apiKey !== "" ? (
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador */}
              <form method="GET">
                <div className="form-group">
                  <label htmlFor="keyword">Buscar por título:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="keyword"
                    onBlur={() => getMovies(inputValue)}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    ref={input}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Películas para la palabra: {inputValue}</h2>
            </div>
            {/* Listado de películas */}
            {movies.totalResults > 0 &&
              movies.Search.map((movie, i) => {
                return (
                  <div className="col-sm-6 col-md-3 my-4" key={i}>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">
                          {movie.Title}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            src={movie.Poster}
                            alt={movie.Title}
                            style={{
                              width: "90%",
                              height: "400px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <p>{movie.Year}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {movies.totalResults === 0 && (
            <div className="alert alert-warning text-center">
              No se encontraron películas
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-danger text-center my-4 fs-2">
          Eyyyy... ¿PUSISTE TU APIKEY?
        </div>
      )}
    </div>
  );
}

export default SearchMovies;

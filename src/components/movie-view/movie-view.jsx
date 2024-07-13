import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div>
      <div>
        <img
          src={movie.imagePath}
          alt={movie.Title}
          className="movie-image w-100"
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <br></br>
        <div className="movie-description" key={movie.Description}>
          {movie.Description}
        </div>
      </div>
      <div>
        <br></br>
        <span className="movie-genre">
          {movie.Genre.map((Genre) => (
            <div key={movie.Genre}>
              <span>Genre: </span>
              <span>{Genre.name}</span>
              <p>{Genre.description}</p>
            </div>
          ))}
        </span>
      </div>
      <div>
        <br></br>
        <div className="movie-director">
          {movie.Director.map((director) => (
            <div key={director.name}>
              <span>Director: </span>
              <span>{director.name}</span>
              <br></br>
              <span>Bio: </span>
              <span>{director.bio}</span>
              <br></br>
              <span>Born: </span>
              <span>{director.birthyear}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to={`/`}>
        <button className="back-button" style={{ cursor: "pointer" }}>
          Back
        </button>
      </Link>
    </div>
  );
};

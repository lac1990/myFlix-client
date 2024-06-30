import "./movie-view.scss";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
    <div >
      <img src={movie.ImageUrl} key={movie.ImageUrl} />
    </div>
    <div>
      <span>Title:</span>
      <span className="movie-title" key={movie.Title}>{movie.Title}</span>
    </div>
    <div>
      <span>Description: </span>
      <div className="movie-description" key={movie.Description}>
        {movie.Description}
      </div>
    </div>
    <div>
      <span>Genre: </span>
      <span className="movie-genre">
        {movie.Genre.map(genre => (
          <div key={movie._id}>
            <span>{genre.name}</span>
            <p>{genre.description}</p>
          </div>
        ))}</span>
    </div>
    <div>
      <span>Director: </span>
      <div className="movie-director">
        {movie.Director.map(director => (
          <div key={director.name}>
            <span>{director.name}</span>
            <span>{director.bio}</span>
            <span>{director.birthyear}</span>
            <span>{director.description}</span>
          </div>

        ))}</div>
    </div>
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};
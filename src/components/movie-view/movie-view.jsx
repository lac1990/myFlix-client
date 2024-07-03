import "./movie-view.scss";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
    <div >
      <img src="holder.png" key={movie.ImageUrl} />
    </div>
    <div>
      <span></span>
      <span className="movie-title" key={movie.Title}>{movie.Title}</span>
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
        {movie.Genre.map(Genre => (
          <div key={movie.Genre}>
            <span>Genre: </span><span>{Genre.name}</span>
            <p>{Genre.description}</p>
          </div>
        ))}</span>
    </div>
    <div>
      <br></br>
      <div className="movie-director">
        {movie.Director.map(director => (
          <div key={director.name}>
            <span>Director: </span><span>{director.name}</span>
            <br></br>
            <span>Bio: </span><span>{director.bio}</span>
            <br></br>
            <span>Born: </span><span>{director.birthyear}</span>
          
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
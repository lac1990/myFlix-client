
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img height={300} src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Year: </span>

        <span>{movie.Year}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Actors:</span>
        <span>{movie.Actors}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

/*MovieView.proptypes = {
  movie: PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      director: PropTypes.shape({
          name:PropTypes.string,
          bio: PropTypes.string,
          birthday: PropTypes.string,
          deathday: PropTypes.string
      }).isRequired,
      description: PropTypes.string,
      genre: PropTypes.string,
  }).isRequired
}; */

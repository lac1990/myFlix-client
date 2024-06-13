import PropTypes from "prop-types";
export const MovieCard = ({ movies, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movies);
      }}
    >
      {movies.Title}
    </div>
  );
};
MovieCard.propTypes = {
  movies: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

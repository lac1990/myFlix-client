import PropType from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  };
  MovieCard.propTypes = {
    movie: PropType.shape({
      Title: PropType.string.isRequired,
      Description: PropType.string.isRequired,
      Genre: PropType.string.isRequired,
      Director: PropType.string.isRequired,
      ImagePath: PropType.string.isRequired, 
    
    }).isRequired
  };
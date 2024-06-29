import PropType from "prop-types";
//import { Button, Card } from "react-bootstrap";

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
      Genre: PropType.object.isRequired,
      Director: PropType.object.isRequired,
      ImagePath: PropType.string.isRequired, 
    
    }).isRequired
  };
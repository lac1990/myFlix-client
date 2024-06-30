import propTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (  
    <Card
      onClick={() => onMovieClick(movie)}
      className='h-100'
    > 
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() =>
          onMovieClick(movie)} variant="link"
        >
          Open
        </Button>
      </Card.Body> 
    </Card>   
  );  
}; 
MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.arrayOf(propTypes.object),
    Director: propTypes.arrayOf(propTypes.object),
    ImageUrl: propTypes.string,
    Featured: propTypes.bool
  }).isRequired,
};
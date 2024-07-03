import propTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (  
    <Card
      onClick={() => onMovieClick(movie)}
      className='h-100'
    > 
      <Card.Img variant="top" src="holder.png100x100" />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() =>
          onMovieClick(movie)} variant="link"
        >
        </Button>
      </Card.Body> 
    </Card>   
  );  
}; 
MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
     // Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired
}),
    Director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birth: propTypes.string,
}),
    ImagePath: propTypes.string,
    Featured: propTypes.bool
  }).isRequired,
};
import propTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} className="card-img" />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <div className="mt-auto">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="primary" className="w-100">
              Open
            </Button>
          </Link>
        </div>
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
    Featured: propTypes.bool,
  }).isRequired,
};

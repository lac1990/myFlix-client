import propTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const addFav = () => {
    fetch(
      `https://movie-api-main-3.onrender.com/users/${user.Username}/${movie._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((movies) => {
        alert("Movie added");
      })
      .catch((e) => console.log(e));
  };
  const removeFav = () => {
    fetch(
      `https://movie-api-main-3.onrender.com/users/${user.Username}/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((movies) => {
        alert("Movie deleted");
      })
      .catch((e) => console.log(e));
  };
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} className="card-img" />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <div className="mt-auto">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="primary" className="H-100">
              Open
            </Button>
          </Link>
          <br></br>
          <br></br>
          <Button onClick={addFav}>Add to Favorites</Button>
          <Button onClick={removeFav}>Remove from Favorites</Button>
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
    ImagePath: propTypes.string,
    Featured: propTypes.bool,
  }).isRequired,
};

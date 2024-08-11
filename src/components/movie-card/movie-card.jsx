import propTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, setUser}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.FavoriteMovie && user.FavoriteMovie.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [movie._id]);

  const handleAddToFav = (movieID) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    fetch(
      `https://movie-api-main-3.onrender.com/users/${user.Username}/movies/${movieID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsFavorite(true);
        alert("Movie Added");
      })
      .catch((error) => console.error("Error", error));
  };
  const handleRemoveFromFav = (movieID) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    fetch(
      `https://movie-api-main-3.onrender.com/users/${user.Username}/movies/${movieID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((updatedUser) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite(true);
      alert("Movie deleted");
    })
    .catch((error) => console.error("Error", error));
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
          <div className="mt-auto">
            {isFavorite ? (
              <Button
                className="btn btn-warning"
                onClick={() => handleRemoveFromFav(movie._id)}
              >
                Remove from Favorites
              </Button>
            ) : (
              <Button
                className="btn back-button"
                onClick={() => handleAddToFav(movie._id)}
              >
                Add to Favorites
              </Button>
            )}
          </div>
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
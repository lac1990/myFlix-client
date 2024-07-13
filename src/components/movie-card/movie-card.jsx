import propTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, updateAction }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.FavoriteMovie && user.FavoriteMovie.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [movie.id]);

  const handleAddToFav = (movieId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    fetch(
      `https://movie-api-main-3.onrender.com/users/${user.Username}/movie/${movieId}`,
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
        alert("Movie added to your favorite list successfully!");
      })
      .catch((error) => console.error("Error adding favorite movies:", error));
  };

  const handleRemoveFromFav = (movieId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    fetch(
      `https://movie-api-main-3.onrender.com/users/${user.Username}/movie/${movieId}`,
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
        updateAction(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsFavorite(false);
        alert("Movie removed from your favorite list successfully!");
      })
      .catch((error) =>
        console.error("Error removing favorite movies:", error)
      );
  };

  return (
    <Card className="h-100" xs={12} sm={6} m={4}>
      <Card.Img variant="top" src={movie.imgURL} />
      <Card.Body className="d-flex flex-column">
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Card.Title>{movie.Title}</Card.Title>
        </Link>

        <div className="mt-auto">
          {isFavorite ? (
            <Button
              className="btn btn-warning"
              onClick={() => handleRemoveFromFav(movie.id)}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button
              className="btn back-button"
              onClick={() => handleAddToFav(movie.id)}
            >
              Add to Favorites
            </Button>
          )}
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

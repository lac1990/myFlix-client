import React from "react";
import propTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ favoriteMovieList, favMovies }) => {
 
  return (
    <div>
      {favoriteMovieList.length === 0 ? (
        <p>No favorite movies</p>
      ) : (
        favoriteMovieList.map((movie) => (
          <Card key={movie._id} className="mb-3">
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>

              <Link to={`/movies/${movie._id}`}>
                <Button variant="primary">Movie Info</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

FavoriteMovies.prototype = {
  FavoriteMovies: propTypes.array.isRequired
};
export default FavoriteMovies;
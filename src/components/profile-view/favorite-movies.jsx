import React from "react";
import propTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./favorite-movies.scss";

export const FavoriteMovies = ({ favoriteMovieList }) => {
  return (
    <div>
      {favoriteMovieList.length === 0 ? (
        <p>No favorite movies</p>
      ) : (
        favoriteMovieList.map((movie) => (
          <Card key={movie._id} className="mb-3">
            <Card.Body>
              <Card.Title className="mtitle1"> {movie.Title} </Card.Title>

              <Link to={`/movies/${movie._id}`}>
                <Button className="button-53" variant="primary">
                  Movie Info
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

FavoriteMovies.prototype = {
  FavoriteMovies: propTypes.array.isRequired,
};
export default FavoriteMovies;

import React from "react";
//import { Row, Col } from 'react-bootstrap';
import "./profile-view.scss";
//import { MovieView } from '../movie-view/movie-view';

function FavoriteMovies({ favoriteMovieList }) {
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movie) => {
        return (
          <div key={movie._id}>
            <img src={movie.ImagePath} />
            <Link to={`/movie/${movie._id}`}>
              <h4>movies.Title</h4>
            </Link>
            <button varients="secondary" onClick={() => removeFav(movie._id)}>
              remove from list
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteMovies;

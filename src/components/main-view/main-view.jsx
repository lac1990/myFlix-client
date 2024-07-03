import { useState, useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../Login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
   


    useEffect(() => {
        fetch("https://movie-api-main-3.onrender.com/movies")
          .then((response) => response.json())
          .then(data=>{
            const moviesFromApi = data.map((movie) => {
              return {
                _id: movie._id,
            ImagePath: movie.ImagePath,
            Title: movie.Title,
            Description: movie.Description,
            Genre: [{
              name: movie.Genre.Name,
              description: movie.Genre.Description
            }],
            Director: [{
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birthyear: movie.Director.Birth,
              description: movie.Director.Description,
            }]};
            });
          setMovies(moviesFromApi)})
          .catch(e=>console.log(e))
          
      }, []);
      return (
        <Row className="justify-content-md-center">
          {!user ? (
            <Col md={5}>
              <LoginView onLoggedIn={(user) => setUser(user)} />
              or
           <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-4" key={movie.Title} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

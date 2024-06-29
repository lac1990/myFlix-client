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
    const [token, setToken] = useState(null);


    useEffect(() => {
        fetch("https://movie-api-main-3.onrender.com/movies")
          .then((response) => response.json())
          .then(movies=>{
          setMovies(movies)})
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
          <MovieViewV
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
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onBookClick={(newSelectedMovie) => {
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

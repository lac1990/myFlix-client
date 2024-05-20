import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies] = useState([
    {
      id: 1,
      Title: 'Pulp Fiction',
      Year: '1994',
      Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of bandits intertwine in four tales of violence and redemption.',
      Genre: ['Thriller'],
      Director: ['Quentin Taratino'],
      ImagePath: 'https://res.cloudinary.com/dn9xgaxzj/image/upload/v1716218011/pulp_fiction_njyr8g.webp',
      Featured: true
    },
    {
      id: 2,
      Title: 'Goodfellas',
      Year: '1990',
      Description: 'A young man grows up in the mob and works very hard to advance himself through the ranks. He enjoys his life of money and luxury but is oblivious to the horror that he causes. A drug addiction and a few mistakes ultimately unravel his climb to the top.',
      Genre: ['Thriller'],
      Director: ['Martin Scorsese'],
      ImagePath: 'https://res.cloudinary.com/dn9xgaxzj/image/upload/v1716217784/goodfellas_zmfnek.jpg',
      Featured: true
    },
    {
      id: 3,
      Title: 'La La Land',
      Year: '2016',
      Description: 'Sebastian and Mia are drawn together by their common desire to do what they love. But as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.',
      Genre: ['Musical'],
      ImagePath: 'https://res.cloudinary.com/dn9xgaxzj/image/upload/v1716217430/la_la_land_kcsold.jpg',
      Featured: true
    }
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView 
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id}  
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

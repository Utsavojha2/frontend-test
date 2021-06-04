import { useState, useEffect } from 'react';
import { fetchMovieGenre, fetchMovieMakers } from '../features/fetchMovies';

const useSpecifics = (movieId) => {
    const baseURL = 'http://api.themoviedb.org/3';
    const [movieSpecifics, setMovieSpecifics] = useState({
        genre: null,
        director: null,
    });

    useEffect(() => {
     const fetchInfo = async (id) => {
        const genreData = await fetch(`${baseURL}${fetchMovieGenre(id)}`);
        const crewData = await fetch(`${baseURL}${fetchMovieMakers(id)}`);

        const respData = await genreData.json();
        const respCrewData = await crewData.json();
        setMovieSpecifics({
            genre: respData?.genres?.slice(0, 2).map((el) => el.name),
            director: respCrewData?.crew?.find((el) => el.department === 'Directing' || el.job === 'Director'),
        });
     };
     fetchInfo(movieId);
    }, []);

    return movieSpecifics;
};

export default useSpecifics;

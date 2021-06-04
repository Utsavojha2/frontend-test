import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetchMovies from '../features/fetchMovies';

const useResults = () => {
    const baseURL = 'http://api.themoviedb.org/3';
    const [results, setResults] = useState({
        loading: false,
        movieResults: [],
        fetchError: null,
    });
    const { asPath } = useRouter();
    const searchTerm = asPath?.split('=')[1]?.split('-').join(' ');

    useEffect(() => {
        const fetchBySearch = async () => {
          try {
            setResults({ ...results, loading: true });
            const data = await fetch(`${baseURL}${fetchMovies.searchedMovies(searchTerm)}`);
            const resp = await data.json();
            setResults({ loading: false, movieResults: resp?.results });
          } catch (error) {
            setResults({ ...results, loading: false, fetchError: error });
          }
        };
        fetchBySearch();
    }, [searchTerm]);

    return results;
};

export default useResults;

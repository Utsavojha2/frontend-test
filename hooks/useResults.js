import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetchMovies from '../features/fetchMovies';

const useResults = () => {
    const baseURL = 'https://api.themovied.org/3';
    const { asPath } = useRouter();
    const searchTerm = asPath?.split('=')[1]?.split('-').join(' ');

    const fetchBySearch = async (query) => {
      const data = await fetch(`${baseURL}${fetchMovies.searchedMovies(query)}`);
      const resp = await data.json();
      return resp;
    };

    const { data, error } = useSWR(`${searchTerm}`, fetchBySearch);

    return {
      movieResults: data?.results,
      loading: !data && !error,
      fetchError: error,
    };
};

export default useResults;

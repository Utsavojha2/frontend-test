import useSWR from 'swr';
import { fetchMovieGenre, fetchMovieMakers } from '../features/fetchMovies';

const useSpecifics = (movieId) => {
    const baseURL = 'https://api.themoviedb.org/3';

    const fetchInfo = async (id) => {
        const genreData = await fetch(`${baseURL}${fetchMovieGenre(id)}`);
        const crewData = await fetch(`${baseURL}${fetchMovieMakers(id)}`);
        const respData = await genreData.json();
        const respCrewData = await crewData.json();

        return {
            genre: respData?.genres?.slice(0, 2).map((el) => el.name),
            director: respCrewData?.crew?.find((el) => el.department === 'Directing' || el.job === 'Director'),
        };
    };

    const { data } = useSWR(`${movieId}`, fetchInfo);

    return data;
};

export default useSpecifics;

import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import NavItems from '../../components/NavItems';
import MovieList from '../../components/MovieList';
import fetchMovies from '../../features/fetchMovies';

const MovieGenre = ({
     setDropdownOpen, dropdownOpen, onDropdownToggle, resultsData,
    }) => {
    const { query: { genre } } = useRouter();
    const fetchedMovies = JSON.parse(resultsData);

    return (
        <div onClick={onDropdownToggle} role="presentation">
            <Head>
                <title>
                    Movies - &nbsp;
                    {genre && genre[0]}
                </title>
            </Head>
            <Header dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
            <NavItems />
            <MovieList results={fetchedMovies?.results} />
        </div>
    );
};

export async function getServerSideProps(context) {
    const { query: { genre } } = context;

    const data = await fetch(`${fetchMovies.fetchMoviesByGenre(genre[1])}`);
    const respData = await data.text();

    return {
        props: {
            resultsData: respData,
        },
    };
}

export default MovieGenre;

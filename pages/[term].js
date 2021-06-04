import { useRouter } from 'next/router';
import Head from 'next/head';
import useResults from '../hooks/useResults';
import Header from '../components/Header';
import NavItems from '../components/NavItems';
import MovieList from '../components/MovieList';

const SearchedMovies = ({ setDropdownOpen, dropdownOpen, onDropdownToggle }) => {
    const { asPath } = useRouter();
    const searchTerm = asPath?.split('=')[1]?.split('-').join(' ');
    const { movieResults } = useResults();

    return (
        <div onClick={onDropdownToggle} role="presentation">
            <Head>
                <title>
                    {!searchTerm ? 'Search' : `Search - ${searchTerm}`}
                </title>
            </Head>
            <Header
            value={searchTerm}
            setDropdownOpen={setDropdownOpen}
            dropdownOpen={dropdownOpen}
            />
            <NavItems />
            <MovieList results={movieResults} />
        </div>
    );
};

export default SearchedMovies;

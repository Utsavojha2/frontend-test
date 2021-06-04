import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import NavItems from '../components/NavItems';
import MovieList from '../components/MovieList';
import fetchMovies from '../features/fetchMovies';
import useResults from '../hooks/useResults';

export default function Home({
  resultsData, dropdownOpen, setDropdownOpen, onDropdownToggle,
}) {
  const { asPath } = useRouter();
  const searchTerm = asPath?.split('=')[1]?.split('-').join(' ');
  const { movieResults, loading } = useResults();
  const fetchedData = JSON.parse(resultsData);

  return (
    <div onClick={onDropdownToggle} role="presentation">
      <Head>
        <title>
          Movies -
          {searchTerm || 'Trending'}
        </title>
        <meta name="description" content="movie search,navigate through titles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header value={searchTerm} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <NavItems />
      <MovieList results={!searchTerm ? fetchedData?.results : movieResults} loading={loading && searchTerm} />
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch(`${fetchMovies.trendingMovies}`);
  const stylesheet = await data.text();

    return {
      props: {
        resultsData: stylesheet,
      },
    };
}

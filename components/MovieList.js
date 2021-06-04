import styled, { css } from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { favoriteList } from '../reducers/favoriteSlice';
import MovieCard from './MovieCard';
import { fetchDirectorInfo } from '../features/fetchMovies';
import DirectorModal from './DirectorModal';

const MovieList = ({ results, loading }) => {
    const layeredFavList = useSelector(favoriteList);
    const [currentID, setCurrentID] = useState(null);

    const getDirectorInfo = async (personId) => {
        const data = await fetch(`${fetchDirectorInfo(personId)}`);
        const respData = await data.json();
        return respData;
    };

    const { data, error } = useSWR(() => (
        currentID ? `${currentID}` : null
        ), getDirectorInfo);

    if (!loading && (!results || results?.length < 1)) {
        return (
            <Container error="true">
             <p>Oops! No Results Found.</p>
             <Link href="/">
                 <button type="button">Head Home</button>
             </Link>
            </Container>
        );
    }

    return (
        <Container>
            {currentID && <DirectorModal setCurrentID={setCurrentID} info={data} loading={!data && !error} />}
            {loading && <section></section>}
            {!loading && results && results.map(
                (el) => (
                <MovieCard
                    key={el.id}
                    el={el}
                    layeredFavList={layeredFavList}
                    setCurrentID={setCurrentID}
                />
                ),
            )}
        </Container>
    );
};

const Container = styled.div`
    flex: 1;
    display: grid;
    place-items: center;
    margin-top: 30px;
    margin-right: 110px;
    ${({ error }) => error === 'true' && css`
        @media screen and (max-width:768px){
            margin-right: 20px;
            margin-top: 45px;
        }
    `};

    & > p {
        font-weight: bold;
        font-size: 18px;
        color: gray;
        margin-top: 100px;
    }

    & > button{
        background: black;
        color: white;
        padding: 6px 9px;
        font-size: 17px;
        border: none;
        border-radius: 5px;
        outline-width: 0px;

        &:hover{
            cursor: pointer;
            filter: brightness(85%);
        }
    }

    & > section{
        background: transparent;
        -webkit-animation: load1 1s infinite ease-in-out;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
        color: gray;
        text-indent: -9999em;
        margin: 88px auto;
        margin-top: 20rem;
        position: relative;
        font-size: 3rem;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;

        @media screen and (max-width: 768px){
            margin-top: 20rem;
            margin-right: 6rem;
        }

        &:before, &:after{
            background: transparent;
            -webkit-animation: load1 1s infinite ease-in-out;
            animation: load1 1s infinite ease-in-out;
            width: 1em;
            height: 4em;
            position: absolute;
            top: 0;
            content: '';
        }

        &:before{
        left: -1.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
        }

        &:after{
            left: 1.5em;
        }

        @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em;
            height: 5em;
        }
        }
        @keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em;
            height: 5em;
        }
    }
    }
`;

export default MovieList;

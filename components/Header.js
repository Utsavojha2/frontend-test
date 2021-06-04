import { useRouter } from 'next/router';
import { Close, Favorite, SearchSharp } from '@material-ui/icons';
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import HistoryIcon from '@material-ui/icons/History';
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchTerms, resetTermsArray, searchTermHistory } from '../reducers/termsSlice';
import { favoriteList } from '../reducers/favoriteSlice';

const Header = ({ setDropdownOpen, dropdownOpen, value }) => {
    const browsedTerms = useSelector(searchTermHistory);
    const userFavorites = useSelector(favoriteList);
    const dispatch = useDispatch();
    const router = useRouter();
    const [term, setTerm] = useState('');

    useEffect(() => {
        if (browsedTerms.length > 5) {
            dispatch(resetTermsArray());
        }
    }, [browsedTerms]);

    const onMovieSearch = (e) => {
        e.preventDefault();
        const searchTerm = term?.trim();
        if (searchTerm) {
            dispatch(updateSearchTerms({
                id: Date.now(),
                query: searchTerm,
            }));
            setDropdownOpen(false);
            router.push('/', `/term=${searchTerm.split(' ').join('-')}`);
        }
    };

    const browseMovieHistory = (userQuery) => {
        router.push('/', `/term=${userQuery.split(' ').join('-')}`);
        setTerm(userQuery);
    };

    return (
        <Container>
            <InputSection dropdownOpen={dropdownOpen} length={browsedTerms.length}>
                <form onSubmit={onMovieSearch}>
                    <input value={term} onChange={(e) => setTerm(e.target.value)} type="text" placeholder="Search" data-attr="input_toggle" />
                    <Close onClick={() => setTerm('')} />
                    <span></span>
                    <SearchSharp onClick={onMovieSearch} />
                </form>
                {(dropdownOpen && browsedTerms.length) ? (
                    <DropdownSection>
                        {browsedTerms.map((el) => (
                        <p onClick={() => browseMovieHistory(el.query)} key={el.id} role="presentation">
                            <small><HistoryIcon /></small>
                            <span>{el.query}</span>
                        </p>
                        ))}
                    </DropdownSection>
                ) : null}
            </InputSection>
            <FavoriteSection onClick={() => router.push('/favorites')}>
                <h3>Favorites</h3>
                <Favorite />
                <span>{userFavorites?.length}</span>
            </FavoriteSection>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 25px;
    margin-top: 10px;
    justify-content: space-evenly;
`;

const InputSection = styled.div`
    border: 2px solid lightgray;
    padding: 6px 12px;
    border-radius:25px;
    max-width: 36%;
    flex: 1;
    margin-left: auto;
    position: relative;

    @media screen and (max-width: 768px){
        margin-left: 15px;
        max-width: 78%;
    }

    ${({ dropdownOpen, length }) => (dropdownOpen && length > 1) && css`
       border: 1px solid lightgray;
       border-bottom-left-radius: 0px;
       border-bottom-right-radius: 0px;
       border-top-left-radius: 8px;
       border-top-right-radius: 8px;
    `}

    & > form {
        display: flex;
        align-items: center;

        & > input{
            border: none;
            outline-width: 0px;
            font-size: 15px;
            flex: 1;
            text-indent: 2%;
        }

        & > span{
            width: 2px;
            height: 30px;
            background: lightgray;
            margin: 0 11px;
            @media screen and (max-width:768px){
                display: none;
            }
        }

        & > .MuiSvgIcon-root{
            cursor: pointer;
        }

        & > *:nth-child(2){
            @media screen and (max-width:768px){
                display: none;
            }
        }

        & > *:nth-child(4){
            margin-right: 5px;
        }
    }
`;

const FavoriteSection = styled.div`
    margin-left: auto;
    margin-right: 20px;
    position: relative;
    display: flex;
    align-items:center;
    column-gap: 6px;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    & > .MuiSvgIcon-root{
        font-size: 28px !important;
    }

    & > span{
        position: absolute;
        right: -12px;
        top: 10px;
        padding: 1px 4px;
        font-size: 15px;
        width: 20px;
        height: 20px;
        font-weight: bold;
        background: red;
        color: white;
        border-radius: 50%;
        padding-left: 6px;
    }

    @media screen and (max-width:768px){
        & > h3{
            display: none;
        }
    }
`;

const DropdownSection = styled.div`
    background: lightgray;
    position:absolute;
    z-index: 100;
    bottom: -200px;
    left: -1px;
    right: -1px;
    height: 200px;
    border: 1px solid lightgray;
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    & > p:nth-child(1){
        margin-top: 5px;
    }

    & > p {
        display: flex;
        align-items:center;
        column-gap: 8px;
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
        padding: 8px 8px;

        &:hover{
            cursor: pointer;
            background-color: #f1f2f5;
        }

        & > small > .MuiSvgIcon-root{
            font-size: 19px !important;
        }

        & > span{
            flex:1;
        }
    }
`;
export default Header;

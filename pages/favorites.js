import styled from 'styled-components';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import DeleteIcon from '@material-ui/icons/Delete';
import { favoriteList, removeFromFavorites } from '../reducers/favoriteSlice';

const favorites = () => {
    const userFavorites = useSelector(favoriteList);

    return (
        <Container>
            <Head>
                <title>Favorites</title>
            </Head>
            <Nav>
                <h2>Your Favorites List</h2>
                <Link href="/">
                    <button type="button">Head Home</button>
                </Link>
            </Nav>
            <Body>
                {userFavorites.length >= 1 ? (
                    <div>
                        {userFavorites.map((el) => <Card key={el.id} {...el} />)}
                    </div>
                ) : (
                    <section>
                        <h4>You have no movies on your wishlist!</h4>
                    </section>
                )}
            </Body>
        </Container>
    );
};

const Card = ({
     id, imgPath, poster_path, title,
    }) => {
    const dispatch = useDispatch();

    const deleteItem = () => {
        dispatch(removeFromFavorites({id}));
    };

    return (
        <Item>
            <div>
                <img src={`${imgPath}${poster_path}`} alt="" />
            </div>
            <h3>{title}</h3>
            <DeleteIcon onClick={deleteItem}/>
        </Item>
    );
};

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    column-gap: 25px;
    margin-bottom: 20px;

    & > div{
        display: inline-block;
        position: relative;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 50%;

        & > img{
            width: 100%;
            height: 100%;
        }
    }

    & > h3{
        font-size: 19px;
    }

    & > .MuiSvgIcon-root{
        position: absolute;
        top: 35px;
        right: -35px;
        font-size: 30px !important;
        &:hover{
            cursor: pointer;
            color: brown;
        }
    }
`;

const Nav = styled.div`
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 100px;

    @media screen and (max-width: 768px){
        column-gap: 15px;
        margin-top: 10px;
    }

    & > button{
        background: green;
        color: white;
        padding: 8px 11px;
        font-size: 17px;
        border: none;
        outline-width: 0px;
        border-radius: 5px;
        cursor: pointer;

        @media screen and (max-width: 768px){
            padding: 5px 8px;
            font-size: 14px;
        }

        &:hover{
            filter: brightness(80%);
        }
    }
`;

const Body = styled.div`
    flex: 1;
    display: grid;
    place-items: center;
    align-content: center;

    & > section > h4{
        font-size: 30px;
        color: gray;
    }

    & > div{
        margin-top: -90px;
        margin-right: 55px;
    }

`;

export default favorites;

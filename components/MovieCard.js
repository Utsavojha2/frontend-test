import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useSpecifics from '../hooks/useSpecifics';
import { addToFavorites, removeFromFavorites } from '../reducers/favoriteSlice';

const MovieCard = ({
    el: {
        id, title, overview,
        backdrop_path, poster_path,
    }, layeredFavList, setCurrentID,
}) => {
    const data = useSpecifics(id);
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [taskMessage, setTaskMessage] = useState({
        type: '',
        msg: '',
    });
    const imgPath = 'https://image.tmdb.org/t/p/w1280';
    const dispatch = useDispatch();
    const ifMovieExists = layeredFavList?.some((el) => el.id === id);
    const { type, msg } = taskMessage;

    useEffect(() => {
        const timerid = setTimeout(() => {
            setTaskMessage({
                type: '', msg: '',
            });
        }, 1200);

        return () => {
            clearTimeout(timerid);
        };
    }, [taskMessage]);

    const getRandomNumber = () => (
        Math.ceil(Math.random() * 6)
    );

    const onAddClick = () => new Promise((resolve, reject) => {
         const recievedNum = getRandomNumber();
         const isNumberEven = recievedNum % 2 === 0;
         setTimeout(() => {
             if (isNumberEven) {
                 reject('Failed to add');
             }
             resolve('Added to Favorites');
         }, 400);
    })
    .then((value) => setTaskMessage({ type: 'success', msg: value }))
    .then(() => (
        dispatch(addToFavorites({
        id, title, imgPath, poster_path,
        }))
    ))
    .catch((err) => setTaskMessage({ type: 'error', msg: err }));

    const onRemoveClick = () => {
        dispatch(removeFromFavorites({ id }));
        setTaskMessage({ type: 'success', msg: 'Removed' });
    };

    return (
        <Card>
            <CardHeader accordionOpen={accordionOpen} onClick={() => setAccordionOpen(!accordionOpen)}>
                <img src={`${imgPath}${backdrop_path || poster_path}`} alt={title} />
                <div>
                    <h3>{title}</h3>
                    {data?.genre && (
                        <p>
                            <p>Genre:</p>
                            <span>{data?.genre?.join('-')}</span>
                        </p>
                    )}
                    {data?.director && (
                    <p>
                        <p>Director:</p>
                       <span onClick={() => setCurrentID(data?.director.id)} role="presentation">{data?.director.name}</span>
                    </p>
                    )}
                </div>
                <IconButton>
                    {!accordionOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </CardHeader>
            <CardBody accordionOpen={accordionOpen}>
                <p>
                    {overview.substr(0, 270)}
                    ...
                </p>
                <p>
                    {overview.substr(0, 150)}
                    ...
                </p>

                {!ifMovieExists ? (
                    <button onClick={onAddClick} type="button">
                        ADD TO FAVORITE
                    </button>
                    ) : (
                    <button onClick={onRemoveClick} type="button">
                        REMOVE
                    </button>
                )}
            </CardBody>
            {msg && (
                <MessageBox type={type}>
                    <CheckIcon />
                    <PriorityHighIcon />
                    <p>{msg}</p>
                </MessageBox>
            )}
        </Card>
    );
};

const Card = styled.div`
    margin-bottom: 18px;
    width: 600px;

    @media screen and (max-width: 768px){
        margin-left: 12px;
        max-width: 350px;
    }
`;

const MessageBox = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
    column-gap: 10px;
    z-index: 10;
    position: fixed;
    width: 240px;
    bottom: 20px;
    left: 40vw;
    padding: 0px 12px;
    color: white;
    font-size: 17px;
    border-radius: 10px;

    ${({ type }) => (
        type === 'success' ? css`
        background: green;

        & > *:nth-child(2){
            display: none;
        }
    ` : css`
        background: red;

        & > *:nth-child(1){
            display: none;
        }
    `)};

    & > * {
        margin-left: 10px;
    }

    & > p {
        flex: 1;
        display: block;
        margin-left:auto;
        font-size: 18px;
        @media screen and (max-width: 768px){
            font-size: 16px;
        }
    }

    @media screen and (max-width: 768px){
        bottom: -50px;
        left: 28vw;
        width: 210px;
        padding: 0 6px;
    }
`;

const CardBody = styled.div`
    ${({ accordionOpen }) => (accordionOpen ? css`
        width: 100%;
        height: 180px;
        border: 2px solid lightgray;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top: none;
        margin-top: -5px;
        padding: 15px 12px;
        @media screen and (max-width: 768px){
            padding: 5px 10px;
        }
    ` : css`
        display: none;
    `)}

    & > p {
        color: gray;
        font-size: 16px;
    }

    & > *:nth-child(2){
        display: none;
    }

    @media screen and (max-width: 768px){
        & > *:nth-child(1){
            display: none;
        }

        & > *:nth-child(2){
         display: block;
        }
    }

    & > button{
        display: block;
        margin-left: auto;
        margin-right: auto;
        background-color: blue;
        border: none;
        outline-width: 0px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        padding: 8px 12px;
        font-size: 15px;

        @media screen and (max-width: 768px){
            padding: 5px 8px;
            font-size: 13px;
        }

        &:hover{
            cursor: pointer;
            filter: brightness(80%);
        }
    }
`;

const CardHeader = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    border: 2px solid lightgray;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    position: relative;

    &:hover{
        cursor: pointer;
        border: none;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.38), 0 6px 20px 0 rgba(0, 0, 0, 0.28);
    }

    ${({ accordionOpen }) => (accordionOpen && css`
        border-radius: 0px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;

        &:hover{
            webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            border: 2px solid lightgray;
        }

        & > img{
            border-top-left-radius: 9px;
        }
    `)}

    & > button{
        position: absolute;
        bottom: 20px;
        right: 18px;
        background: gray;
        width: 15px !important;
        height: 15px !important;
        color: white;

        &:hover{
            color: black;
            background: lightgray;
        }
    }


    & > img{
        height: 100%;
        max-width: 50%;
       object-fit: cover;
    }

    & > div{
        max-width: 300px;
        padding: 20px;

        @media screen and (max-width: 768px){
            padding: 3px 11px;
        }

        & > *:nth-child(3) > span{
            text-decoration: underline;
            text-decoration-color: blue;
            cursor: pointer;
        }

        & > *:nth-child(2){
            margin-top: -15px;
            @media screen and (max-width: 768px){
                margin-top: 0px;
                margin-left: -11px;
            }
        }

        & > *:nth-child(3){
            margin-top: -26px;
            @media screen and (max-width: 768px){
                margin-top: 0px;
                margin-left: -11px;
            }
        }

        & > p {
            display: flex;
            align-items:center;
            color: brown;

            @media screen and (max-width: 768px){
                & > *:nth-child(1){
                    display: none;
                }
            }
        }

        & > p > span{
            margin-left: 12px;
            font-weight: 500;
            color: gray;
            @media screen and (max-width: 768px){
                display: block;
                min-width: 100%;
            }
        }

        & > h3{
            font-size: 20px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            color: #1a0dab;
            max-width: 250px;

            @media screen and (max-width: 768px){
                font-size: 15px;
            }

            &:hover{
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }

    @media screen and (max-width: 768px){
        height: 150px;
    }
`;

export default MovieCard;

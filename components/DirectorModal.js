import { CircularProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';

const DirectorModal = ({ loading, info, setCurrentID }) => {
    const imgPath = 'https://image.tmdb.org/t/p/w1280';

    const onModalToggle = (e) => {
        const ifClickedOver = e.target.getAttribute('data-obj') === 'overlay';
        if (ifClickedOver) {
            setCurrentID(null);
        }
    };

    return (
        <Container onClick={onModalToggle} data-obj="overlay">
            <ModalBox>
                <Close onClick={() => setCurrentID(null)} />
                {loading ? <CircularProgress /> : (
                <>
                    <ModalHeader>
                        <h3>{info?.name}</h3>
                        <img src={`${imgPath}${info?.profile_path}`} alt={info?.name} />
                    </ModalHeader>
                    <ModalAttributes>
                        <p>
                            <CheckIcon />
                            Popular For
                            <span>{info?.known_for_department}</span>
                        </p>
                        <p>
                            <CheckIcon />
                            Birthplace
                            <span>{info?.place_of_birth}</span>
                        </p>
                    </ModalAttributes>
                    <ModalBody>
                        <p>
                            {info?.biography?.substr(0, 250)}
                            ...
                        </p>
                    </ModalBody>
                </>
                )}
            </ModalBox>
        </Container>
    );
};

const Container = styled.div`
     position: fixed;
     top: 0; bottom: 0; left: 0; right: 0;
     background: rgba(0,0,0,0.8);
     z-index: 20;
     display: grid;
    place-items: center;
`;

const ModalBox = styled.div`
    background: white;
    width: 500px;
    height: 350px;
    display: grid;
    place-items: center;
    padding: 12px 18px;
    position: relative;
    -webkit-animation: slide-top 1s linear reverse both;
    animation: slide-top 1s linear reverse both;

    @-webkit-keyframes slide-top {
    0% {
      -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-100px);
        transform: translateY(-100px);
    }
  }
  @keyframes slide-top {
    0% {
      -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-100px);
        transform: translateY(-100px);
    }
}

    & > .MuiSvgIcon-root{
        position: absolute;
        top:0;
        right: 0px;
        color: blue;
        font-size: 30px !important;

        &:hover{
            cursor: pointer;
            color: red;
        }
    }

    @media screen and (max-width: 768px){
        width: 350px;
        height: 420px;
    }
`;

const ModalAttributes = styled.div`
     display: flex;
     flex-direction: column;

     & > p {
        display: flex;
        align-items: center;
        column-gap: 8px;
        color: gray;

        & > span{
            color: skyblue;
            text-decoration: underline;
        }
     }
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-top:10px;

    & > img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const ModalBody = styled.div`
    color: gray;
    font-size: 16px;
`;

export default DirectorModal;

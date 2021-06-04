import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const NavItems = () => {
    const router = useRouter();
    const navRef = useRef(null);

    const navigationRoute = (e) => {
      const genreName = e.target.innerText;
      const genreId = e.target.getAttribute('data-id');
       if (!genreId) {
          router.push('/');
          return;
       }
      router.push('/genre/[...genre]', `/genre/${genreName}/${genreId}`);
    };

    useEffect(() => {
        [...navRef?.current?.children].forEach((child, index, array) => {
          child.addEventListener('click', navigationRoute);
            if (child.innerText === router?.query?.genre?.[0]) {
               child.classList.add('active');
            } else if (router.asPath === '/') {
              array[0].classList.add('active');
            } else {
                child.classList.remove('active');
            }
        });
    }, [router.asPath]);

    return (
        <NavContainer ref={navRef}>
        <li>Trending</li>
        <li data-id="28">Action</li>
        <li data-id="35">Comedy</li>
        <li data-id="27">Horror</li>
        <li data-id="16">Animation</li>
        </NavContainer>
    );
};

const NavContainer = styled.ul`
  margin-right: 105px;
  padding: 5px 25px;
  display: flex;
  align-items:center;
  justify-content: center;
  column-gap: 80px;
  list-style: none;
  font-weight: bold;
  color: gray;

  @media screen and (max-width: 768px){
    column-gap: 12px;
    margin-right: auto;
    margin-left: auto;
    font-size: 15px;
  }

  & > li.active{
    text-decoration: underline;
    color: blue;
  }

  > li:hover{
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default NavItems;

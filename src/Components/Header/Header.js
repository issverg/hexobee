import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import Burger from "./Burger";


const NavSector = styled.div`
    margin: 0;
    padding:0;
    position: fixed;
    z-index: 5;
    right: 0;
    left: 0;
    width: 100vw;
    height: 12vh;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    font-size: 2.3vw;
    justify-content: space-around;
    align-items: center;
              
        @media (max-width: 978px) {
            font-size: 2.5vw;
            right: -1vw;
            background-color: transparent;
        }
`;

const ScrollHead = styled.div`
${props => props.active && css`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    
  @media(min-width: 978px){
        width: 100%;
        color: white;
        background-color:#33beb3;
        animation: slideHeader 3s forwards;
        -webkit-animation: slideHeader 3s forwards;
        -moz-animation: slideHeader 3s forwards;
        -o-animation: slideHeader 3s forwards;
        
            @keyframes slideHeader {
                0% {     
                  opacity: 0;               
                }
                100% {
                opacity: 1;           
                }
            }
        }
  `}    
`;

    const Header = (props) => {
        const [scroll, setScroll] = useState(false);

        useEffect(() => {
            window.addEventListener("scroll", () => {
                setScroll(window.scrollY > 45);
            });
        }, []);
        let scroll_flag = scroll ? 'true' : '';
        return (
        <NavSector id="head" >
            <ScrollHead active={scroll_flag}>
            <Burger  changeLanguage={props.changeLanguage} currentLang={props.currentLang} setRef={props.setRef} scroll={scroll} burgerMenu = {props.burgerMenu} />
            </ScrollHead>
        </NavSector>
    );
};

export default Header;
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ARROW_BOTTOM} from "./Constants";

const ScrollDownButton = styled.button`
  position: fixed;
    top: 20px;
  left: 5px;
  border: none;
    background-color: transparent;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 1000;
    
     img {
         width: 50px;
         opacity: 0.7;
     }
  &:hover {
    transform: scale(1.1);
  }
    
    @media(min-width: 1200px) {
        left: 26vw;
        top: 3%
    }
`;

const ScrollToBottom = () => {
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Плавная прокрутка
        });
    };

    return (
        showButton ?
            <ScrollDownButton onClick={scrollToBottom} aria-label="Scroll to bottom">
           <img src={ARROW_BOTTOM} alt="arrow down"/>
        </ScrollDownButton> : null
    );
};

export default ScrollToBottom;
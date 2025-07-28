import React from 'react';
import styled from "styled-components";
import arrowRight from "../Images/arrow_right.png";
import arrowLeft from "../Images/arrow_left.png";
import hand from "../Images/hand.png";

const ArrowsWrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
opacity: 0.4;
`
const ImdArrow  = styled.img`
margin: 0 2vh;
width: 6vh;
height: 4vh;
`
const ImgHand  = styled.img`
margin: 0 2vh;
width: 4vh;
height: 4vh;
`
const Arrows = () => {
    return (
        <ArrowsWrapper>
            <ImdArrow src={arrowLeft} alt="arrow left"/>
            <ImgHand src={hand} alt="hand"/>
            <ImdArrow  src={arrowRight} alt="arrow right"/>
        </ArrowsWrapper>
    );
};

export default Arrows;
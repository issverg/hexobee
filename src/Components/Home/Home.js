import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import picBackground from "../../Images/descktop.webp";
import picBackgroundMobile from "../../Images/mobile.webp"
import {HONEYCOMB, LOGO_WHITE} from "../../Utils/Constants";
import {useTranslation} from "react-i18next";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const HomeAll= styled.div`
    height: 100%;
    hyphens: manual;
    a{
        text-decoration: none;
    }
`
const HomeWrapper = styled.div`
    padding-top: 11vh;
    height: 90vh;
    width: 100vw;
    background-image: url(${picBackground});
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: start;
    perspective: 1000px;
    
    @media(max-width: 978px) {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;  
    background-image: url(${picBackgroundMobile});
    }
    @media(max-width: 478px) {
        height: 74vh;
        margin-bottom: 11vh;
`;

const Content = styled.div`
    margin-inline-start: 5vw;
    margin-top: 1vw;
    display: flex;
    flex-direction: column;
    width: 40vw;
    justify-content: center;
    align-items: center;  
    color: white;
    letter-spacing: 3px;
    font-weight: bold;

    @media (max-width:978px) {
        margin-inline-start: 0;
        margin-top: 50vh;
        width: 70%;
        padding: 2vw;
    }

    @media (max-width: 480px) {
    margin-inline-start: 0;
    margin-top: 27vh;
    width: 90%;
    }     
`;


const LogoName2 = styled.img`
width: 25vh;
margin-bottom: 1vw;
animation: ${({dir}) => dir === "rtl" ? "slideLeftLogo 2.5s forwards" : "slideRightLogo 2.5s forwards"};
    
        @keyframes slideRightLogo {
    0% {
        transform: translateX(-200%);
    }
    100% {
        transform: translateX(0%);
    }
  }
    @keyframes slideLeftLogo {
        0% {
            transform: translateX(400%);
        }
        100% {
            transform: translateX(0%);
        }
    }
    @media (max-width: 978px) {
        margin-bottom: 5vh;
    }
    @media (max-width: 478px) {
        margin-bottom: 2vh;
    }
`;

const Slogan = styled.p`
    font-size: 4vh;
    text-transform: uppercase;
    animation: slideOpacitySlogan 6s;
    text-align: center;
    
         @keyframes slideOpacitySlogan {
         
    0% {
        opacity: 0;
    }
    100% {
         opacity: 1;
    }
}
    @media (max-width: 978px) {
        font-size: 3vh;
    }

`;

const ButtonOnlineOrder = styled.div`
    margin-top: 4vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #33beb3;
    width: 23vh;
    height: 23vh;
    border-radius: 50%;
    font-size:  2.3vh;
    letter-spacing: 0.2vw;
    font-weight: bold;
    color: white;
    animation: slideUpButton 3s forwards;
    text-transform: uppercase;
    cursor: pointer;
    
    @keyframes slideUpButton {
    0% {
        transform: translateY(150%);
        opacity: 0;
    }
    100% {
        transform: translateY(0%);
         opacity: 1;
    }
}

&:hover,
&:active,
&:focus{
    background-color: #596573;
    outline: none !important;
}
    @media (max-width: 478px) {
        margin-top: 2vh;
    }
`
const Line = styled.div`
            height: 0.3vh;
            width: 100%;
            margin: 0;
            `;
const Circle = styled.img`
    position: absolute;
    ${({dir}) => dir === 'rtl' ? 'right' : 'left'}:2%;
    top: 130vh;
    opacity: 0.1;
    width: 55vh;
    height:52vh;
    
    @media (max-width: 980px) {
        top: 150vh;
        left: 0;
        width: 40vh;
        height: 40vh;
    }
    @media (max-width: 478px) {
       display: none;
    }
`


const Home = props => {
    const { t,i18n} = useTranslation();
    const [direction, setDirection] = useState("ltr");

    useEffect(() => {
        setDirection(i18n.language === 'he' ? 'rtl' : 'ltr');
    }, [i18n.language]);

    return (
        <HomeAll id="home">
            <Header changeLanguage={props.changeLanguage}  currentLang={props.currentLang}/>
            <HomeWrapper >
                    <Content>
                        <LogoName2 src={LOGO_WHITE} alt='logo' dir={direction}/>
                        <Slogan>{t("home.slogan")}</Slogan>
                        <a  href= "https://wa.me/972547185598" target="blank" >
                            <ButtonOnlineOrder id = "about">{t("home.order_button")}
                        </ButtonOnlineOrder>
                        </a>
                    </Content>
            </HomeWrapper>
            <Line/>
            <Circle dir={direction}  src={HONEYCOMB} alt='circle'/>
            <About/>
            <Contact/>
            <Footer/>
        </HomeAll>
);
};

export default Home;
import React from 'react';
import styled from "styled-components";
import {FOOTER_IMG, FOOTER_IMG_MOBILE, LOGO_BLUE} from "../../Utils/Constants";
import {useTranslation} from "react-i18next";

const FooterWrapper = styled.div`
    position: relative;
    margin-top: 5vh;
    height: 25vh;
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100%;

    @media (max-width: 478px) {
        margin-top: 10vh;
        height: 100%;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }
`
const Background = styled.div`
    position: absolute;
    z-index: -1;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100%;
    background-image: url(${FOOTER_IMG});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    color: #354358;

    @media (max-width: 478px) {
        background-image: url(${FOOTER_IMG_MOBILE});
        background-size: contain;
        background-position: bottom;
        height: 100vh;
    }
`
const Content = styled.div`
    width: 80vw;
    display: flex;
    align-items: end;
    justify-content: space-between;
    background-color: transparent;

    @media (max-width: 478px) {
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }
`
const Navigate = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    padding: 0;

    a {
        margin-inline-start: 2vw;
        font-size: 1.5vw;
        text-decoration: none;
        color: #354358;
    }

    @media (max-width: 478px) {
        flex-direction: column;
        align-items: start;
        justify-content: start;
        margin: 40px 0;
        a {
            font-size: 3.5vh;
        }
    }
`

const Address = styled.span`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;
`
const Logo = styled.img`
    width: 17vh;

    @media (max-width: 1020px) {
        width: 15vh;
    }
    @media (max-width: 478px) {
        width: 18vh;
    }
`
const Ad = styled.p`
    margin: 0;
    font-size: 1vw;

    @media (max-width: 478px) {
        font-size: 1.5vh;
        width: 100vw;
        margin: 0;
        padding: 0;
    }

`
const Footer = () => {
    const {t} = useTranslation();
    return (
        <FooterWrapper>
            <Content>
                <Logo src={LOGO_BLUE} alt='logotype'/>
                <Navigate>
                    <a href="#home">
                        <li>{t('header.nav.home')}</li>
                    </a>
                    <a href="#portfolio">
                        <li>{t('header.nav.portfolio')}</li>
                    </a>
                    <a href="#about">
                        <li>{t('header.nav.about_us')}</li>
                    </a>
                    <a href="#contact">
                        <li>{t('header.nav.contact')}</li>
                    </a>
                </Navigate>
                <Address>
                    <Ad>{t('address')}</Ad>
                    <Ad>hexobee.dev@gmail.com</Ad>
                    <p dir="ltr">+(972)54-761-55-07</p>
                </Address>
            </Content>
            <Background/>
        </FooterWrapper>
    );
};

export default Footer;
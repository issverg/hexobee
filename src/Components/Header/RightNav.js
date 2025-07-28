import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useLocation} from "react-router-dom";
import {LOGO_BLUE, LOGO_WHITE} from "../../Utils/Constants";
import {faChevronDown, faGlobe} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";

const RightNavWrapper = styled.div`
width: 100vw;
height: 12vh;
display: flex;
margin: 0;
padding:  0 40px;
align-items: center;
justify-content: space-around;
    #servey_nav {
        border: 2px solid #33beb3;
        padding: 5px 15px;
        
        @media(max-width: 978px) {
            margin-top: 1vh;
            padding: 5px;
        }
    }
`
const UL = styled.div`
    list-style: none;
    height: 12vh;
    margin: 0;
    padding: 0;
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 3.2vh;
    flex-flow: row nowrap;

        @media(max-width: 978px) {
            position: fixed;
            flex-flow: column nowrap;
            background-color: aliceblue;
            text-align: justify-all;
            display: ${({open}) => open ? 'block' : 'none'};
            top: 0;
            right: 0;
            height: 100vh;
            width: 100vw;
            padding: 2vh;
            transition-property: display;
            transition: transform 5s ease-in-out;

            li {
                color:  #354358;
                font-size: 1.6rem;
                width: 50vw;
            } 
        }
    }
`;

const EndSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media(max-width: 978px) {
        flex-direction: column;
    }
`

const NabBar = styled.ol`
display: flex;
height: 12vh;
align-items: center;
justify-content: space-around;
text-decoration: none;
    li {
        margin-inline-start: 2.5vw;
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-decoration: none;
    }
    a{
       display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        border: 2px solid transparent;
        white-space: nowrap;
        letter-spacing: 1.5px;
        color: ${({colornav}) =>colornav};
       transition: all 300ms;
        
        &:hover {
            -ms-transform: scale(1.2);
            transform: scale(1.2);
        }

        &:active {
            color: #33beb3; 
        }   
    }
    @media(max-width: 1250px) {
        font-size: 3vh;
    }
    @media(max-width: 978px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 10vh;
        a {
            margin-inline-start: 0;
        }
    }

`
const NavigationBlock = styled.div`
    margin-top: 1vw;
display: flex;
align-items: center;
justify-content: space-around;
text-align: center;
    @media(max-width: 1700px) {
        a{
            font-size: 1.7vw;
        }
    }
    @media(max-width: 978px){
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
    }
`;

const LogoLink = styled.a`
text-decoration: none;   
`
const Logo = styled.img`
width: 17vh;
    
@media(max-width: 978px){
    margin: 15vh 0 0 0;
    width: 15vh;

}
`
const Dropdown = styled.span`
    margin-top: 1vw;
    display: flex;
    align-items: start;
    justify-content: space-around;
    color: #33beb3;
    height: fit-content;
    
    #chevron{
        width: 13px;
        margin-inline-start: 0.9vw;
        padding-top: 0.4vw;
    }

    @media(max-width: 978px){
        margin-top: 12vh;
        position: relative;
        align-items: start;
        justify-content: center;
    }
`
const Dropbtn = styled.span`
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline-start: 5vw;
    width: 100%;
    z-index: 5;

    svg {
        width: 20px;
        height: 20px;
        color: ${({colornav}) =>colornav};
        margin-inline-end: 1vw;
    }
    p{
        margin: 0;
        padding: 0;
        font-size: 3.2vh;
        color: ${({colornav}) =>colornav};
        text-align: center;
    }

    @media(max-width: 978px) {
        text-align: center;
        margin-inline-start:0;
        padding-inline-end: 0;
        p,svg {
            color: #33beb3;
        }
    }
`
const DropdownContent =styled.span`
    display: ${({show}) => show ? "flex" : "none" };
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 80%;
    background-color: #f8f8f8;
    min-width: 160px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    z-index: 1;
    text-align: center;
    
    p {
        color:#354358;
        padding: 6px;
        margin: 0;
        text-decoration: none;
        text-align: center;
        display: block;
        cursor: pointer;
    }

    p:hover {
        color:  #33beb3;
    }

    @media(max-width: 978px) {
        top: 110%;
    }
`
const Tel = styled.span`
    margin-inline-start: 1vw;
    margin-top: 1vw;
    width: 100%;
    text-align: start;
    text-wrap: nowrap;

p {
    color: ${({colornav}) =>colornav};
    font-weight: bold;
    letter-spacing: 1.5px;
    margin-bottom: 0;
    font-size: 3.3vh;
}
    @media(max-width: 1700px) {
        p{
            font-size: 1.5vw;
        }
    }
    @media(max-width: 978px) {
        text-align: center;
        p {
            color: #33beb3;
        }
    }
`
const RightNav = (props) => {
    const { t, i18n } = useTranslation();
    const [colorNav, setColorNav] = useState('#33beb3');
    const [isShowDropDown, setShowDropDown] = useState(false);
    const [address, setAddress] = useState('/survey-form-eng');
    const langs = t('header.languages', { returnObjects: true });


    const handleClickSurvey = () => {
        if(props.currentLang === 'ru'){
            setAddress('/survey-form-ru');
        }
        if(props.currentLang === 'en'){
            setAddress('/survey-form-eng');
        }
        if(props.currentLang === 'he' || props.currentLang === 'iw'){
            setAddress('/survey-form-he');
        }
    }

    let location = useLocation();
    const [isVisible, setVisibility] = useState(false);

    let setFromSignIn = () => {
        setVisibility(false);
    }

    function closeMenu() {
        props.setOpen(false);
    }

    const changeLanguagei18 = (lng) => {
        i18n.changeLanguage(lng);
        props.changeLanguage(lng);
        setShowDropDown(!isShowDropDown);
        closeMenu();
    };

    useEffect(() => {
        if (props.scroll === true) {
            setColorNav('white');
        } else {
            setColorNav('#354358');
        }
    }, [location, props.scroll]);


    return (
        <RightNavWrapper >
                <UL colornav={colorNav} open={props.open}>
                    <LogoLink href="#home"><Logo
                        src={(props.scroll === false || (document.documentElement.clientWidth < 978)) ? LOGO_BLUE : LOGO_WHITE}
                        alt='logotype'/>
                    </LogoLink>
                    <Tel colornav={colorNav}>
                    <p dir="ltr">+(972)54-761-55-07</p>
                    </Tel>
                    <EndSection>
                    <NavigationBlock onClick = {closeMenu}>
                        <NabBar colornav={colorNav}>
                            <li><a href="home">
                                {t('header.nav.home')}
                            </a></li>
                            <li><a href="#portfolio">
                                {t('header.nav.portfolio')}
                            </a></li>
                                <li><a href="#about">
                                {t('header.nav.about_us')}
                            </a></li>
                            <li><a href="#contact">
                                {t('header.nav.contact')}
                            </a></li>
                            <li><a id="servey_nav" onClick={() => handleClickSurvey()} href={address} target="_blank">
                                {t('header.nav.survey')}
                            </a></li>
                        </NabBar>
                    </NavigationBlock>

                        <Dropdown>
                        <Dropbtn colornav={colorNav} onClick={() => setShowDropDown(!isShowDropDown)}>
                            <FontAwesomeIcon icon={faGlobe}/>
                            <p>{t('header.nav.lang')}</p>
                            <FontAwesomeIcon id="chevron" icon={faChevronDown} />
                        </Dropbtn>
                            <DropdownContent show={isShowDropDown}>
                                {langs.map((v) =>
                                    <p onClick={() => changeLanguagei18(v.code)} key={v.code}>{v.nativeName}</p>)}
                            </DropdownContent>
                        </Dropdown>
                    </EndSection>
                </UL>
        </RightNavWrapper>
    );
}

export default RightNav;
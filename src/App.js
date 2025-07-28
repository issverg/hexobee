import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {WHATSAPP} from "./Utils/Constants";
import {useTranslation} from "react-i18next";
import Main from "./Components/Main";

const    AppWrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100%;
    padding: 0;
    margin: 0;
    direction: ${({dir}) => dir};
    display: flex;
    align-items: start;
    justify-content: center;
`


const WhatsAppImg = styled.img`
    position:fixed;
    ${({dir}) => dir === 'ltr' ? 'right' : 'left'}:1%;
    bottom: 1%;
    right: 0.5%;
    width: 110px;
    height: 110px;
    z-index: 10;
    cursor: pointer;
    opacity: ${(props) => (props.isScrolling ? "0.4" : "1")};
    transition: opacity 0.3s ease;
    color: white;
`
function App() {
    const i18n = useTranslation();
    let [direction, setDirection] = useState("ltr");
    let [currentLang, setCurrentLang] = useState(i18n.language);
    const [isScrolling, setIsScrolling] = useState(false);
    let scrollTimeout = null;

    const changeLanguage = (lang) => {
        setCurrentLang(lang);
console.log( lang);
        if (lang === 'he' || lang === 'iw') {
            setDirection ("rtl");
        }
        if (lang === 'en' || lang === 'ru') {
            setDirection ("ltr");
        }

        document.documentElement.dir = direction;
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true); // Пользователь начал скроллить — делаем прозрачным

            // Очищаем предыдущий таймаут
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Устанавливаем таймаут, чтобы через 300ms после остановки вернуть opacity: 1
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, []);

    useEffect(() => {
        setDirection((i18n.language === 'he' || i18n.language === 'iw') ? 'rtl' : 'ltr');
        document.documentElement.dir = direction;
    }, []);

  return (
      <AppWrapper className='row no-gutters g-0' dir={direction}>
          <a href= "https://wa.me/972547185598" target="blank" >
              <WhatsAppImg isScrolling={isScrolling}  dir={direction}  src={WHATSAPP} alt='whatsapp'/>
          </a>
        <Main dir={direction} changeLanguage={changeLanguage}  currentLang={currentLang} />
      </AppWrapper>
  );
}

export default App;
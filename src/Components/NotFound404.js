import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {BEE_2} from "../Utils/Constants";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7faff;
  padding: 2rem;
  text-align: center;
    @media (max-width: 768px) {
        padding: 1.5rem;
    }

    @media (max-width: 480px) {
        padding: 1rem;
    }
`;

const Emoji = styled.img`
    width: 150px;
    height: 150px;
    
    @media (max-width: 480px) {
        font-size: 3rem;
    }
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #33beb3;
  margin-bottom: 4rem;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 3rem;
    }

`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: #555;
  margin-bottom: 4rem;


`;

const StyledLink = styled(Link)`
  background-color: #33beb3;
  color: white;
    font-weight: bold;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 25px;
  text-decoration: none;
    letter-spacing: 3px;
  transition: background 0.3s ease;
    text-transform: uppercase;

  &:hover {
    background-color: #354358;
      color: white;
  }

`;

const NotFound404 = () => {
    const { t,i18n } = useTranslation();
    return (
        <Wrapper dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
            <Emoji src={BEE_2} alt="bee_2"/>
            <Title>{t('404.title')}</Title>
            <Subtitle>
                {t('404.subtitle_1')}<br />
                {t('404.subtitle_2')}
            </Subtitle>
            <StyledLink to="/"> {t('404.link')}</StyledLink>
        </Wrapper>
    );
};

export default NotFound404;
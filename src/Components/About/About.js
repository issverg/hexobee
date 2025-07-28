import React from 'react';
import styled from 'styled-components';
import SuccessStoriesSlide from "./SuccessStoriesSlide";
import ContentOfTheProgram from "./ContentOfTheProgram";
import {useTranslation} from "react-i18next";
import FactsStatistics from "../Home/FactsStatistics";

const AboutWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 1230px) {
        margin-top: 0;
    }
    @media (max-width: 968px) {
        margin-top: 13vw;
    }
`;

const ImagEinshtein = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1230px) {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 20vw;
        }
    }
`;

const AboutMission = styled.div`
    width: 80%;

    h1 {
        color: #354358;
    }

    h3 {
        font-weight: bold;
        color: #354358;
    }
    h2 {
        padding: 2vw;
    }

    p {
        padding: 0 3vw;
        text-align: justify;
    }

    img {
        margin-top: 2vw;;
        width: 17rem;
        height: 18rem;
    }
;
    @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
        p {
            padding: 2vw 6vw;
        }
    }
    @media (max-width: 478px) {
        margin-bottom: 3vh;
    }

`;

const About = () => {
    const {t} = useTranslation();
    return (
        <AboutWrapper>
            <FactsStatistics/>
            <AboutMission className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-9'>
                    <h1>{t('about.title')}</h1>
                    <h2>{t('about.text_1')}</h2>
                    <p>{t('about.text_2')}</p>
                    <p>{t('about.text_4')}</p>
                </div>
                <ImagEinshtein className='col-sm-12 col-md-12 col-lg-12 col-xl-3'>
                </ImagEinshtein>
            </AboutMission>
            <SuccessStoriesSlide/>
            <ContentOfTheProgram/>
        </AboutWrapper>
    );
};

export default About;
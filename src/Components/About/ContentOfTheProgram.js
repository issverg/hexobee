import React from 'react';
import styled from 'styled-components';
import {HONEYCOMB} from "../../Utils/Constants";
import {useTranslation} from "react-i18next";

const ContentOfTheProgramWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 50%;
    letter-spacing: 2px;
    text-align: center;
    padding: 16px;

    h1 {
        margin-bottom: 5vw;
    }

    @media (max-width: 678px) {
        margin: 8vw 0 0 0;
        padding: 0;
        justify-content: center;
    }
`;

const Leaning = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    width: 100%;
`;

const SectionTask = styled.div`
    padding: 2.5vw;

    p {
        text-align: left;
    }

    @media (max-width: 1200px) {
        #text_transform {
            text-align: center;
        }
    }
    @media (max-width: 768px) {
        p {
            text-align: left;
        }

        #text_transform {
            text-align: justify;
        }
    }
`;

const Circle = styled.img`
    position: absolute;
    top: 23%;
    opacity: 0.1;
    width: 60vh;
    height: 55vh;

    @media (max-width: 1600px) {
        right: 4%;

    }
    @media (max-width: 1300px) {
        right: 10%;
        top: 15%;
        width: 45vh;
        height: 45vh;
    }
    @media (max-width: 679px) {
        display: none;
    }
`
const ContentOfTheProgram = () => {
    const {t} = useTranslation();
    return (
        <ContentOfTheProgramWrapper>
            <Circle src={HONEYCOMB} alt='circle'/>
            <h1>{t('program.title')}</h1>
            <Leaning className='row no-gutters g-0'>
                <SectionTask className='col-sm-12 col-md-5 col-lg-4'>
                    {/*<Pic src={theoryPic} alt='pic'/>*/}
                    <h2>{t('program.period_1')}</h2>
                    <p>{t('program.text_1')}</p>
                </SectionTask>
                <SectionTask className='col-sm-12 col-md-5 col-lg-4'>
                    {/*<Pic imgwidth src={exercisePic} alt='pic'/>*/}
                    <h2>{t('program.period_2')}</h2>
                    <p> {t('program.text_2')}</p>
                </SectionTask>
                <SectionTask className='col-sm-12 col-md-12 col-lg-4'>
                    {/*<Pic src={examPic} alt='pic'/>*/}
                    <h2>{t('program.period_3')}</h2>
                    <p id="text_transform">{t('program.text_3')}</p>
                </SectionTask>
            </Leaning>
        </ContentOfTheProgramWrapper>
    );
};

export default ContentOfTheProgram;
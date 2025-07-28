import React, {useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";

const FactsStatisticsWrapper = styled.div`
    padding: 4vh;
    height: 40%;
    font-size: 1.325rem;
    line-height: 1.54;
    color: #354358;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: 1vh;
    
    #sign {
        color: #33beb3;
        //font-weight: bold;
        font-size: 3.8rem;
        @media (max-width: 478px) {
            font-size: 3rem;
        }
    }

    h1 {
        padding: 0 1vw;
    }

    @media (max-width: 1200px) {
        padding: 0;
        h1 {
            padding: 0 3vh;
        }
    }
    @media (max-width: 968px) {
        align-items: start;
        margin-bottom: 6vh;
    }
    @media (max-width: 478px) {
        margin-bottom: 10vh;
}
`;

const CounterField = styled.div`
padding: 3vh;
width: 100%;
display: flex;
align-items: center;
text-align: center;
justify-content: center;

@media (max-width: 968px){
    margin: 0;
    padding: 0;
}
`;
const Counter = styled.div`
  @media (max-width: 1200px){
      margin-top: 8vh;
} 
    @media (max-width: 978px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:start;
    }
`;

const CounterBody = styled.div`

`;

const CounterValue = styled.div`
  font-size: 3vw;
  text-align: center;
    text-wrap: nowrap;
  span{
  margin: 0.3vw;
  }
  
@media (max-width: 1200px){
    padding: 2vh;
    font-size: 4vh;    
} 
`;

const CounterPostfix = styled.span`

`;

const CounterTitle = styled.span`
`;

const FactsStatistics = () => {
    const {t} = useTranslation();

    return (
        <FactsStatisticsWrapper className='container-fluid'>
            {/*<h1>О НАС - БЕЗ ВОДЫ</h1>*/}
            <CounterField className='row'>
                <Counter className = 'col-6 col-md-3 col-lg-3'>
                    <CounterBody>
                        <CounterTitle>{t('fact_statistics.cost')}</CounterTitle>
                        <CounterValue h1>
                            1900
                            <CounterPostfix>{t('fact_statistics.price')}</CounterPostfix>
                        </CounterValue>
                        <CounterTitle>{t('fact_statistics.fullService')}</CounterTitle>
                    </CounterBody>
                </Counter>
                <Counter className = 'col-6 col-md-3 col-lg-3'>
                    <CounterBody>
                        <CounterTitle>{t('fact_statistics.delivery')}</CounterTitle>
                        <CounterValue h1>
                            5
                            <CounterPostfix>{t('fact_statistics.days')}</CounterPostfix>
                        </CounterValue>
                        <CounterTitle>{t('fact_statistics.firstDraft')}</CounterTitle>
                    </CounterBody>
                </Counter>
                <Counter className = 'col-6 col-md-3 col-lg-3'>
                    <CounterBody>
                        <CounterTitle>{t('fact_statistics.timeline')}</CounterTitle>
                        <CounterValue h1>
                            2
                            <span>{t('fact_statistics.months')}</span>
                            <CounterPostfix/>
                        </CounterValue>
                        <CounterTitle>{t('fact_statistics.freeSupport')}</CounterTitle>
                    </CounterBody>
                </Counter>
                <Counter className = 'col-6 col-md-3 col-lg-3'>
                    <CounterBody>
                        <CounterValue h1>
                            {/*<CountUp start={focus ? 0 : null} end={100} delay={0.3}  duration={4} redraw={true}>*/}
                            {/*</CountUp>*/}
                            <CounterPostfix id="sign">✓</CounterPostfix>
                        </CounterValue>
                        <CounterTitle>{t('fact_statistics.mobileAdaptation')}</CounterTitle>
                    </CounterBody>
                </Counter>
            </CounterField>
        </FactsStatisticsWrapper>
    );
};

export default FactsStatistics;
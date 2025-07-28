import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {FLAG_ENG, FLAG_ISR, FLAG_RUS} from "../../Utils/Constants";


const LangWrapper  = styled.div`
    position: fixed;
    top: 10vh;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Oranienbaum', serif;
    color: white;
    padding: 0;
    margin: 0;
    z-index: 10;
    width: 4vh;
    @media (max-width: 978px) {
        top: 27vh;
    }
`
const FlagPopUp  = styled.div`
    display: flex;
    margin-top: 0.5vh;
    text-decoration: none;
    height: 4.5vh;
    align-items: center;
    justify-content: center;
    
    img {
    display: flex;
    flex-direction:  column;
    align-content: center;
    justify-content: center;
    width: 4vh;
    height: 4vh;
    font-size: 3vh;
    color: white;
    text-align: center;
    background-color: #039be5;
}
`
const PopUpDescription  = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 17vh;
    height: 4vh;
    background-color: #596573;
    right: 4vh;
    p{
        margin-top: 20px;
        padding: 0;
    }
    @media (max-width: 1200px) {
   p{
       text-align: center;
       font-size: 2.2vh;
        }
    }
`

const LanguagesButton = () => {
const [isShown, setShown] = useState(false);
const [isShownHiddenArea1, setShownHiddenArea1] = useState(false);
const [isShownHiddenArea2, setShownHiddenArea2] = useState(false);
const [isShownHiddenArea3, setShownHiddenArea3] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
        setShown(true);
    }, 3000);
    return () => clearTimeout(timer);
}, [isShown]);
    const popupMenu = <div>
                            <FlagPopUp onTouchStart={() => setShownHiddenArea1(true)}
                                 onMouseOver={() => setShownHiddenArea1(true)} onMouseOut={() =>
                                setShownHiddenArea1(false)}>
                                    <img src={FLAG_ISR} alt="he"/>
                                {isShownHiddenArea1 ? <PopUpDescription><p>
                                    ИВРИТ</p></PopUpDescription> : ''}
                            </FlagPopUp>
                            <FlagPopUp onTouchStart={() => setShownHiddenArea2(true)}
                                 onMouseOver={() => setShownHiddenArea2(true)} onMouseOut={() =>
                                setShownHiddenArea2(false)} >
                                <img src={FLAG_ENG} alt="en"/>
                                {isShownHiddenArea2 ? <PopUpDescription><p>
                                    АНГЛИЙСКИЙ</p></PopUpDescription> : ''}
                            </FlagPopUp>
                            <FlagPopUp onTouchStart={() => setShownHiddenArea3(true)}
                                 onMouseOver={() => setShownHiddenArea3(true)} onMouseOut={() =>
                                setShownHiddenArea3(false)}>
                                <img src={FLAG_RUS} alt="rus"/>
                                {isShownHiddenArea3 ? <PopUpDescription><p>РУССКИЙ</p></PopUpDescription> : ''}
                            </FlagPopUp>
                        </div>;

    return (
        <LangWrapper>
            {isShown ? popupMenu : ""}
        </LangWrapper>
    );
};

export default LanguagesButton;
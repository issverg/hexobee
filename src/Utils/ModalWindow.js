import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";


const ModalWindowWrapper = styled.span`
    position: fixed;
    padding: 40px;
    width: 40vw;
    height: fit-content;
    background-color: #f8f8f8;
    box-shadow: 20px 20px 20px gray;
    top: 30%;
    left: 35%;
    border: 0.5px solid #33beb3 ;
    z-index: 1000;
    flex-direction: column;
    display: ${({ isShowModal }) => (isShowModal ? 'block' : 'none')};
    align-items: center;
    justify-content: center;
    
    p {
        font-size: 2.5vh;
        text-align: center;
    }
    @media(max-width: 678px) {  
        left: 10%;
        width: 80%;
    }
`
const ModalWindow = (props) => {
    const {t} = useTranslation();
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        setIsShowModal(props.isModalOpen);
    },[props.isModalOpen])

    return (
        <ModalWindowWrapper onClick={()=> setIsShowModal(false)} isShowModal={isShowModal}  >
            <h2>{t('modalTitle')}</h2>
            <p>{t('modalText')}</p>
        </ModalWindowWrapper>
    );
};

export default ModalWindow;
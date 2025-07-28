import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import ReadMore from "../../Utils/ReadMore/ReadMore";
import {useTranslation} from "react-i18next";
import * as emailjs from "@emailjs/browser";


const SuccessStoryWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: end;
    justify-content: start;
    box-shadow: 20px 20px 20px gray;
    overflow-y: auto;
    overflow-x: hidden;

    a {
        text-decoration: none;
        color: #354358;
        font-weight: 600;
        font-size: 2.5vh;

        :hover {
            color: #354358;
        }

        img {
            @media (max-width: 978px) {
                width: 10vw;
            }
        }
    }

    @media (max-width: 978px) {
        height: 90%;
    }
    @media (max-width: 678px) {
        box-shadow: none;
    }
`
const SuccessStorySection = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 978px) {
        flex-direction: column;
    }
`
const VideoStory = styled.div`
    object-fit: cover;
    margin-bottom: 2vh;
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: 1000;

    video {
        width: 80%;
        height: 80%;
        border: 0.5px solid gainsboro;
    }

    @media (max-width: 978px) {
        video {
            width: 80%;
            height: 90%;
        }
    }
`
const CaseTag = styled.span`
    display: inline-block;
    background: #354358;
    padding: 0.3rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    color: white;
    margin-bottom: 0.8rem;
    margin-inline-end: 1rem;
`;
const InfoSection = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    p {
        padding: 0 1rem;
        font-weight: 400;
        color: #33beb3;
        font-size: 1.4rem;
        cursor: pointer;
    }
`
const TechStack = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 1.5rem;

    @media (max-width: 978px) {
        padding: 1rem;
    }
`;

const TechItem = styled.span`
    border: 1px solid #33beb3;
    color: #354358;
    font-weight: 600;
    padding: 0.2rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
`;

const TitleStory = styled.h5`
    padding: 1rem 0;
    width: 80%;
    font-size: 3vh;
    text-align: center;
    color: #354358;
    font-weight: bolder;
`
const TitleSuccessStorySection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const MainSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const TextStory = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`
const TextStoryBox = styled.div`
    font-size: 2.5vh;
    width: 70%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ButtonGroup = styled.div`
    margin: 1rem 0;
    display: flex;
    gap: 0.8rem;
`;

const Button = styled.a`
    padding: 0.4rem 1rem;
    text-decoration: none;
    transition: all 0.3s;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: center;
`;

const PrimaryButton = styled(Button)`
    background: #33beb3;
    color: white !important;

    &:hover {
        background: #354358;
    }
`;

const OutlineButton = styled(Button)`
    border: 1px solid #354358;
    color: #354358 !important;

    &:hover {
        border: 2px solid #354358;
        color: #354358 !important;
    }
`;

// Стилизованные компоненты

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;
    backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
    background: white;
    width: 100vw;
    max-width: 400px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    position: relative;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
`;

const ModalTitle = styled.h3`
    margin: 0;
    font-size: 22px;
    color: #354358;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 80px;
    cursor: pointer;
    color: #354358;
    padding: 0;
    line-height: 1;

    &:hover {
        color: #354358;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    color: #354358;
    font-weight: 500;
`;

const Input = styled.input`
    padding: 12px 15px;
    border: 1px solid #dfe6e9;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        border-color: #33beb3;
        outline: none;
        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
    }
`;

const Textarea = styled.textarea`
    padding: 12px 15px;
    border: 1px solid #dfe6e9;
    border-radius: 8px;
    font-size: 16px;
    resize: vertical;
    min-height: 100px;
    transition: all 0.3s ease;

    &:focus {
        border-color: #33beb3;
        outline: none;
        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
    }
`;

const SubmitButton = styled.button`
    background: #33beb3;
    color: white;
    padding: 14px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 7px;
    margin-top: 10px;
    letter-spacing: 2px;

    &:hover {
        background: #354358;
    }

    &:active {
        transform: scale(0.98);
    }
`;

const InputVisibleNone = styled.input`
    display: none;
`

const SuccessStories = (props) => {
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const form = useRef();


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_h1vphxh', 'template_lewiula', form.current, {
                publicKey: 'jhCEXKdgNdbbtEUOy',
            })
            .then(
                () => {
                    //  setShowModal(true);
                    //  console.log('SUCCESS!');
                    e.target.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
        setIsModalOpen(false);
    };

    return (
        <SuccessStoryWrapper pic={props.storyPic}>
            <SuccessStorySection>
                {isModalOpen && (
                    <ModalOverlay onClick={() => setIsModalOpen(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <ModalHeader>
                                <ModalTitle>{t('modal_form_order.title')}</ModalTitle>
                                <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
                            </ModalHeader>

                            <Form ref={form} onSubmit={sendEmail}>
                                <InputVisibleNone
                                    type="text"
                                    name="category"
                                    value="🔥Hochu tak!"
                                />
                                <InputVisibleNone
                                    type="text"
                                    name="name_site"
                                    value={props.storyTitle}
                                    placeholder=""
                                />

                                <FormGroup>
                                    <Label>{t('modal_form_order.your_name')}</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder={t('modal_form_order.name_placeholder')}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>{t('modal_form_order.mail')}</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder={t('modal_form_order.mail_placeholder')}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>{t('modal_form_order.wishes')}</Label>
                                    <Textarea
                                        name="message"
                                        placeholder={`${t('modal_form_order.wishes_placeholder')}`}
                                        rows="4"
                                    />
                                </FormGroup>

                                <SubmitButton type="submit">
                                    {t('modal_form_order.button')}
                                </SubmitButton>
                            </Form>
                        </ModalContent>
                    </ModalOverlay>
                )}
                <MainSection>
                    <VideoStory >
                        <video autoPlay
                               muted
                               playsInline
                               loop
                               controls>
                            <source src={props.storyPic} type="video/mp4"/>
                        </video>
                    </VideoStory>
                    <InfoSection>
                        <CaseTag>{props.tag}</CaseTag>
                        <p>/</p>
                        <p onClick={() => setIsReviewOpen('true')}> {t('review_title')}</p>
                    </InfoSection>
                    <TitleSuccessStorySection>
                        <TitleStory>{props.storyTitle}</TitleStory>
                    </TitleSuccessStorySection>
                    <TextStory>
                        <TextStoryBox>
                            <ReadMore text={props.storyText}/>
                        </TextStoryBox>
                        <ButtonGroup>
                            <PrimaryButton href={props.demoUrl} target="_blank">
                                {t('portfolio.demo')}
                            </PrimaryButton>
                            <OutlineButton onClick={() => setIsModalOpen(true)}>
                                {t('portfolio.want')}
                            </OutlineButton>
                        </ButtonGroup>
                    </TextStory>
                    <TechStack>
                        {props.stack.map((tech, index) => (
                            <TechItem key={index}>{tech}</TechItem>
                        ))}
                    </TechStack>

                    {isReviewOpen && (
                        <ModalOverlay onClick={() => setIsReviewOpen(false)}>
                            <ModalContent>
                                <ModalHeader>
                                    <ModalTitle>{props.review}</ModalTitle>
                                    <CloseButton onClick={() => setIsReviewOpen(false)}>×</CloseButton>
                                </ModalHeader>
                            </ModalContent>
                        </ModalOverlay>)}
                </MainSection>

            </SuccessStorySection>
        </SuccessStoryWrapper>
    );
};

export default SuccessStories;
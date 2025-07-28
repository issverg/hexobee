import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import * as emailjs from "@emailjs/browser";
import {useTranslation} from "react-i18next";
import {IMaskInput} from 'react-imask';

const ContactsForm = styled.div`
    width: 100vw;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Oswald, sans-serif;

    #touch_title {
        margin: 3vw 0;
    }

    h2 {
        font-size: 3vh;
        color: #33beb3;
        text-align: center;
    }

    form {
        width: 50%;
        height: 100%;

        @media (max-width: 1200px) {
            width: 80%;
        }
        @media (max-width: 1200px) {
            width: 80%;
            height: fit-content;
        }
    }

    @media (max-width: 1200px) {
        h2 {
            font-size: 2.5vh;
        }

        #touch_title {
            margin: 7vw 0;
        }
    }
`;

const FormGroup = styled.div`
    margin: 1vw 0;

    input {
        margin: 1vw 0;
    }
`
const BtnPrimary = styled.input`
    margin-top: 2vw;
    font-weight: bold;
    background-color: #33beb3;
    border: none;
    text-decoration: none;

    &:hover {
        background-color: #354358;
        border: none;
    }

    &:active {
        background-color: #33beb3;
        border: none;
    }
`;

const InputVisibleNone = styled.input`
    display: none;
`

const ModalWindow = styled.span`
    position: fixed;
    padding: 40px;
    width: 40vw;
    height: fit-content;
    background-color: #f8f8f8;
    box-shadow: 20px 20px 20px gray;
    top: 30%;
    left: 35%;
    border: 0.5px solid #33beb3;
    z-index: 1000;
    flex-direction: column;
    display: ${({isShowModal}) => (isShowModal ? 'block' : 'none')};
    align-items: center;
    justify-content: center;

    p {
        font-size: 2.5vh;
        text-align: center;
    }

    @media (max-width: 678px) {
        left: 10%;
        width: 80%;
    }
`
const Contact = () => {
    const {t} = useTranslation();
    const form = useRef();
    const [selected, setSelected] = React.useState('');
    const [isShowModal, setShowModal] = React.useState(false);

    const handleChange = (newPhoneNumber) => {
        setSelected(newPhoneNumber.currentTarget);
    }

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_h1vphxh', 'template_lewiula', form.current, {
                publicKey: 'jhCEXKdgNdbbtEUOy',
            })
            .then(
                () => {
                    setShowModal(true);
                    console.log('SUCCESS!');
                    e.target.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    useEffect(() => {

    }, [isShowModal])

    return (
        <ContactsForm id="contact">
            <ModalWindow onClick={() => setShowModal(false)} isShowModal={isShowModal}>
                <h2>{t("modalTitle")}</h2>
            <p>{t("modalText")}</p>
            </ModalWindow>
            <form ref={form} onSubmit={sendEmail}>
                <fieldset>
                    <InputVisibleNone
                        type="text"
                        name="category"
                        value="🔥Contact us!"
                    />
                    <InputVisibleNone
                        type="text"
                        name="name_site"
                        value="🔥Contact us!"
                        placeholder=""
                    />
                    <legend><h1>{t('contacts.title')}</h1></legend>
                    <div className="card-header bg-transparent border-0 text-center"><h3
                        id="touch_title">{t('contacts.touch')}</h3></div>
                    <h2>{t('contacts.text')}</h2>
                    <FormGroup>
                        <label htmlFor="name">{t('contacts.name_label')}<span className="text-danger">*</span></label>
                        <input required id="name" name="name" type="text" className="form-control"
                               placeholder={t('contacts.name')}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="email">{t('contacts.email_label')}</label>
                        <input required id="email" name="email" type="email" className="form-control"
                               placeholder={t('contacts.email')}/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="contact">{t('contacts.phone_label')}<span
                            className="text-danger">*</span></label>
                        <IMaskInput
                            required={true}
                            onChange={(e) => handleChange(e)}
                            mask={"{+(972)} 00-000-00-00 "}
                            unmask={true}
                            lazy={false}
                            id="contact"
                            name="contact"
                            className="form-control"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="message">{t('contacts.message_label')}</label>
                        <textarea id="message" name="message" type="text" className="form-control"
                                  placeholder={t('contacts.message')}/>
                    </FormGroup>
                    <BtnPrimary type="submit" className="btn btn-primary w-100" value={t('contacts.send')}/>
                </fieldset>
            </form>
        </ContactsForm>
    );
};

export default Contact;
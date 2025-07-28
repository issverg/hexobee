import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const ReadOrHide = styled.span`
    padding-top: 2vh;
    cursor: pointer;
    font-size: 2.3vh;
    color: #33beb3;
`

const TextWrapper = styled.span`
    display: inline;
    width: 100%;
`

const ReadMore = props => {
    const {t} = useTranslation();
    const [showText, setShowText] = useState("");
    const readForward = t('read_more');
    const collapse = "  свернуть";
    const text = props.text;
    const [isReadMore, setIsReadMore] = useState(true);

    useEffect(() => {
        if (text.length > 110) {
            if (isReadMore === true) {
                setShowText(readForward);
            }
            if (isReadMore === false) {
                setShowText(text);
                setShowText(collapse);
            }
        }
    }, [isReadMore]);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <TextWrapper>
            <p>
                {isReadMore ? text.slice(0, 110) : text}
                <ReadOrHide onClick={toggleReadMore}>
                    <br/>
                    {showText}
                </ReadOrHide>
            </p>
        </TextWrapper>
    );
};
export default ReadMore;
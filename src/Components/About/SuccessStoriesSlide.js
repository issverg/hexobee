import React from 'react';
import {successStories} from "../../Utils/Constants";
import SuccessStories from "./SuccessStories";
import styled from "styled-components";
import Arrows from "../../Utils/Arrows";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import {useTranslation} from "react-i18next";
import {Navigation, Pagination} from "swiper/modules";


const SuccessStoriesWrapper = styled.div`
    padding: 5vh 0;
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        text-transform: uppercase;
    }

    @media screen and (max-width: 978px) {
        padding: 2vh 0;
        height: 100%;
    }
`
const SuccessStoriesWrapperSection = styled.div`
    margin-top: 4vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 978px) {
        height: 100%;
    }
`
const CoruselSwiper = styled(Swiper)`
    min-height: 110vh;
    width: 90%;
    float: right;

    .swiper-button-prev,
    .swiper-button-next {
        color: #33beb3;
    }

    @media (max-width: 1300px) {
        margin-top: 0;
        width: 100%;
        height: 100%;
    }
    @media (max-width: 678px) {
        min-height: 100%;
    }
`
const SuccessStoriesSlide = () => {
    const {t, i18n} = useTranslation();
    let langDirection = i18n.language === 'he' ? 'rtl' : 'ltr';
    let values = successStories.map((v, i) => {
            const stories = t('portfolio.successStories', {returnObjects: true});
            return (
                <SwiperSlide>
                    <SuccessStories key={v.id} storyPic={v.pic} tag={v.tag} stack={v.stack} review={stories[i].review}
                                    storyTellerName={stories[i].name} storyTitle={stories[i].storyTitle}
                                    storyText={stories[i].storyText}
                                    detailsUrl={v.detailsUrl} demoUrl={v.demoUrl}/></SwiperSlide>
            )
        }
    );

    return (
        <SuccessStoriesWrapper id="portfolio">
            <h1>{t('portfolio.title')}</h1>
            <SuccessStoriesWrapperSection>
                <CoruselSwiper
                    modules={[Pagination, Navigation]}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        800: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        }

                    }}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    loop={true}
                    watchSlidesProgress
                    dir={!langDirection ? "rtl" : "ltr"}
                    key={langDirection}
                >
                    {values}
                </CoruselSwiper>
            </SuccessStoriesWrapperSection>
            <Arrows/>
        </SuccessStoriesWrapper>
    );
};
export default SuccessStoriesSlide;
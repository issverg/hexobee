import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import SurveyFormHebrew from "./SurveyForm/SurveyFormHebrew";
import SurveyFormEng from "./SurveyForm/SurveyFormEng";
import SurveyFormRus from "./SurveyForm/ServeyFormRus";
import NotFound404 from "./NotFound404";

const Main = (props) => {
    return (
        <Routes>
            <Route path="/"  element={<div><Home dir={props.dir} changeLanguage={props.changeLanguage}  currentLang={props.currentLang}/></div>}/>
            <Route path="/home"  element={<div><Home dir={props.dir} changeLanguage={props.changeLanguage}  currentLang={props.currentLang}/></div>}/>
            <Route path="/survey-form-eng" exact element={<div><SurveyFormEng currentLang={props.currentLang}/></div>}/>
            <Route path="/survey-form-he" exact element={<div><SurveyFormHebrew  currentLang={props.currentLang}/></div>}/>
            <Route path="/survey-form-ru" exact element={<div><SurveyFormRus  currentLang={props.currentLang}/></div>}/>
            <Route path="*" exact element={<div><NotFound404/></div>}/>
        </Routes>
    );
};

export default Main;
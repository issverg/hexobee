import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle} from "styled-components";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {createRoot} from "react-dom/client";
import './Utils/locales/i18next';


const GlobalStyle = createGlobalStyle`
html {
    display: flex;
    align-items:start;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100vw;
    box-sizing: border-box;
    flex-wrap: wrap;
    overflow-x: hidden;
    font-family: Oswald,NotoSerifHebrew,"Noto Serif Hebrew Condensed", "Noto Serif Hebrew", sans-serif;
      }

      body {
      margin: 0;
      padding: 0;
      width: 100vw;
      background-color: #f8f8f8;
      letter-spacing: 2px;
      text-align: center;
      font-family:  Oswald,NotoSerifHebrew,"Noto Serif Hebrew Condensed", "Noto Serif Hebrew", sans-serif;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
    h1,h2,h3 {
        letter-spacing: 1px;
        text-align: center;
        font-family:  Oswald,NotoSerifHebrew,"Noto Serif Hebrew Condensed", "Noto Serif Hebrew", sans-serif;
   }
    h1 {
      margin-top: 5vw;
        color: #354358;
        font-weight: bold;
        text-transform: uppercase;
    }
    h2 {
        padding: 1vw;
        color: #33beb3;
    }
    h3 { 
        font-weight: bold;
        color: #354358;
    }
    p {
    font-size: 2.5vh;
        font-family: Oswald, Noto Serif Hebrew Condensed, sans-serif;
    }
`;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
            <GlobalStyle/>
            <BrowserRouter>
                    <App/>
            </BrowserRouter>
    </React.StrictMode>
);
reportWebVitals();

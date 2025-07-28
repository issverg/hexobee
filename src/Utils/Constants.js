
// About Us
import bee from '../Images/bee.png';
import honeyComb from '../Images/honeyComb.png';

//Languages
import flag_isr from "../Images/flag_Is.png";
import flag_eng from "../Images/flag_eng.png";
import flag_rus from "../Images/flag_rus.jpg";

//SuccessStoriesSlide
import bee_3 from '../Images/bee_3.png';
import storyPic_1 from "../Images/dumplings.mp4";
import storyPic_2 from "../Images/inna.mp4";
import storyPic_3 from "../Images/chistodey.mp4";
import storyPic_4 from "../Images/tennis_v.mp4";
import storyPic_5 from "../Images/landing_page2.mp4";
import storyPic_6 from "../Images/burger.mp4";

import storyPoster_1 from "../Images/dumplings.png";
import storyPoster_2 from "../Images/inna.png";
import storyPoster_3 from "../Images/chistodey.png";
import storyPoster_4 from "../Images/tennis.png";
import storyPoster_5 from "../Images/build.png";
import storyPoster_6 from "../Images/burger.png";

//logo
import logo_w from "../Images/Hexobee_logo_png_white.webp";
import logo_b from "../Images/Hexobee_logo_last_png.webp";
import logo_dark from "../Images/Hexobee_logo_last_png_darkblue.webp";
//Our Partners
//import telRan from "../Images/Tel-Ran.1.png";

//ContentOfTheProgram
import meeting from "../Images/meeting.jpeg";


//footer
import footer_imd from "../Images/footer.png";
import footer_imd_mobile from "../Images/footer_1.png";

// Other
import whatsapp from "../Images/whatsapp.png";
import whatsapp_1 from "../Images/whatsapp_2.png";
import arrow_bottom from "../Images/arrow_bottom.png";
import bee_2  from "../Images/bee.png";

//footer
export const FOOTER_IMG = footer_imd;
export const FOOTER_IMG_MOBILE = footer_imd_mobile;

// Other
export const WHATSAPP = whatsapp;
export const WHATSAPP_1 = whatsapp_1;
export const ARROW_BOTTOM = arrow_bottom;
export const  BEE_2 = bee_2;


//Languages
export const FLAG_ISR = flag_isr;
export const FLAG_ENG = flag_eng;
export const FLAG_RUS = flag_rus;

//About Us
export const BEE = bee;
export const HONEYCOMB = honeyComb;

//logo
export const LOGO_WHITE = logo_w;
export const LOGO_BLUE = logo_b;
export const LOGO_DARK = logo_dark;


//ContentOfTheProgram
export const MEETING = meeting;

//SuccessStoriesSlide
export const BEE_3 = bee_3;

export const storyPic1 = storyPic_1;
export const storyPic2 = storyPic_1;
export const storyPic3 = storyPic_1;
export const storyPic4 = storyPic_1;
export const storyPic5 = storyPic_1;
export const storyPic6 = storyPic_1;


export const successStories = [
    {
        id: "InnaGusinskay",
        poster: storyPoster_2,
        tag: "Website",
        stack: ['React', 'Styled-components', 'Bootstrap', 'HTML'],
        pic: storyPic_2,
        detailsUrl: "https://innagusinski.web.app/",
        demoUrl: "https://innagusinski.web.app/"
    },
    {id: "Chistodey",
        poster: storyPoster_3,
        tag: "Website",
        stack: ['React', 'Styled-components', 'Bootstrap', 'HTML'],
        pic: storyPic_3,
        detailsUrl:"https://chistodey.web.app/",
        demoUrl: "https://chistodey.web.app/"
    },
    {id: "TennisClub",
        poster: storyPoster_4,
        tag: "Landing page",
        stack: ['JavaScript', 'Css', 'HTML'],
        pic: storyPic_4,
        demoUrl: "https://tennisclub.web.app/",
        detailsUrl:"https://tennisclub.web.app/" },
    {id: "constructionCompany",
        poster: storyPoster_5,
        tag: "Landing page",
        stack: ['JavaScript', 'Css', 'HTML'],
        pic: storyPic_5,
        demoUrl: "https://constructioncompany.web.app/",
        detailsUrl:"https://constructioncompany.web.app/" },
    {id: "BurgerRestaurant",
        poster: storyPoster_6,
        tag: "Website",
        stack: ['React', 'Styled-components', 'Bootstrap','HTML'],
        pic: storyPic_6,
        demoUrl: "#",
        detailsUrl:"#" },
    {id: "Pelmenim",
        poster: storyPoster_1,
        tag: "Website",
        stack: ['React', 'Styled-components', 'Bootstrap','HTML'],
        pic: storyPic_1,
        demoUrl: "#",
        detailsUrl:"#" },];

//Main
export const homePage = 'home';
export const aboutUsPage = "about_us";
export const teamPage = 'team';
export const productsPage = 'products';
export const contactPage = 'contact';
export const loginPage = 'sing-in';

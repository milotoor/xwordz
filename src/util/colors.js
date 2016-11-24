
import { getColorClass } from 'react-mdl';

const
    // Primary colors
    primary    = 'light-blue',
    primary700 = getColorClass(primary, 700),
    primary500 = getColorClass(primary, 500),
    primary100 = getColorClass(primary, 100),

    // Accent colors
    accent    = 'green',
    accent700 = getColorClass(accent, 'A700'),
    accent400 = getColorClass(accent, 'A400'),
    accent200 = getColorClass(accent, 'A200'),

    // ...White
    white = 'rgb(255, 255, 255)',
    black = 'rgb(  0,   0,   0';


const text = {
    // Greys
    grey900: 'rgba(0, 0, 0, 0.87)',
    grey800: 'rgba(0, 0, 0, 0.74)',
    grey700: 'rgba(0, 0, 0, 0.62)',
    grey600: 'rgba(0, 0, 0, 0.54)',
    grey500: 'rgba(0, 0, 0, 0.38)',
    grey400: 'rgba(0, 0, 0, 0.26)',
    grey300: 'rgba(0, 0, 0, 0.12)',
    grey200: 'rgba(0, 0, 0, 0.07)',
    grey100: 'rgba(0, 0, 0, 0.04)',
    grey50 : 'rgba(0, 0, 0, 0.02)'
};


const background = {
    grey900: 'rgb( 33,  33,  33)',
    grey800: 'rgb( 66,  66,  66)',
    grey700: 'rgb( 97,  97,  97)',
    grey600: 'rgb(117, 117, 117)',
    grey500: 'rgb(158, 158, 158)',
    grey400: 'rgb(189, 189, 189)',
    grey300: 'rgb(224, 224, 224)',
    grey200: 'rgb(238, 238, 238)',
    grey100: 'rgb(245, 245, 245)',
    grey50 : 'rgb(250, 250, 250)'
};


export default {
    primary700,
    primary500,
    primary100,

    accent700,
    accent400,
    accent200,

    white,
    black,

    text,
    background
};

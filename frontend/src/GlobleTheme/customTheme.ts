import {createTheme} from "@mui/material";

export const myTheme = createTheme({
    palette: {
        primary: {
            main: '#ea0d74',
        },
        secondary: {
            main: '#9acb79',
        }
    },

    typography: {
        fontFamily: [
            'Nunito',
            'sans-serif',
        ].join(','),
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        body1: {
            fontWeight: '400',
        },
        allVariants: {
            wordWrap: 'break-word',
        },

    },
})
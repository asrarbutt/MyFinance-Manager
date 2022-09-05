import {createTheme} from "@mui/material";

declare module "@mui/material/styles" {
    interface CustomPalette {
        neutral: {
            main: string;
            contrastText: string;
        };
        backgroundColor: string;
        navbarBackgroundColor: string;
        linkButtonColor: string;
        linkButtonFontColor: string;
    }

    interface Palette extends CustomPalette {
    }

    interface PaletteOptions extends CustomPalette {
    }
}


export const myTheme = createTheme({
    palette: {
        primary: {
            main: '#112b3c',
        },
        secondary: {
            main: '#9acb79',
        },

        neutral: {
            main: '#fff',
            contrastText: '#002255',
        },
        backgroundColor: '#7f0aec',
        navbarBackgroundColor: '#0258B4',
        linkButtonColor: '#f57b29',
        linkButtonFontColor: '#EFEFEF'

    },

    shape: {
        borderRadius: 5
    },
    typography: {
        fontFamily: [
            'Nunito',
            'sans-serif',
        ].join(','),
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontSize: 13,
        body1: {
            fontWeight: '400',
        },
        allVariants: {
            wordWrap: 'break-word',
        },
        button: {
            fontStyle: 'bold',
            fontSize: 15,
        }
    },

})
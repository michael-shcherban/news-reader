import { createTheme } from "@mui/material";
// import "@mui/styles";

export const theme = createTheme({
    palette: {
        primary: {
            light: '#ff0405',
            main: '#c60304',
            dark: '#790000',
            contrastText: '#fff',
        },
        secondary: {
            main: '#58595B',
            light: '#A7A9AC',
            dark: '#231F20',
            contrastText: '#fff',
        },
        text: {
          primary: '#2e3538',
        }
    },
    typography: {
        htmlFontSize: 16,
        fontSize: 14,
        fontFamily: [
            '-apple-system',
            '"BlinkMacSystemFont"',
            '"Segoe UI"',
            '"Roboto"',
            '"Oxygen"',
            '"Ubuntu"',
            '"Cantarell"',
            '"Fira Sans"',
            '"Droid Sans"',
            '"Helvetica Neue"',
            'sans-serif'
        ].join(','),
    },
});

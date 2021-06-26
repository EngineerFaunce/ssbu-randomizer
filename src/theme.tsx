import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#5581FA",
        },
        secondary: {
            main: "#CB93FA",
        },
        error: {
            main: "#FB3640",
        },
        warning: {
            main: "#F1FA6E",
        },
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#5581FA",
        },
        secondary: {
            main: "#CB93FA",
        },
        error: {
            main: "#FB3640",
        },
        warning: {
            main: "#F1FA6E",
        },
    },
});

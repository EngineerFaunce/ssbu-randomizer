import { useState, useEffect } from "react";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: "transparent",
        display: "flex",
        alignItems: "center",
    },
    container: {
        position: "relative",
    },
    toggle: {
        position: "absolute",
        right: "-30%",
    },
}));

function NavMenu({ controller }: any) {
    const classes = useStyles();

    const [icon, setIcon] = useState(<Brightness7Icon htmlColor="#ffec99" />);
    const darkMode = controller.state;
    const setDarkMode = controller.setState;

    useEffect(() => {
        window?.localStorage.setItem("darkTheme", darkMode.toString());

        setIcon(
            darkMode ? (
                <Brightness3Icon htmlColor="#bac8ff" />
            ) : (
                <Brightness7Icon htmlColor="#ffec99" />
            )
        );
    }, [darkMode]);

    return (
        <AppBar position="static" className={classes.appBar} elevation={0}>
            <Toolbar>
                <Box
                    display="flex"
                    alignItems="center"
                    className={classes.container}
                >
                    <Typography variant="h6" align="center" color="textPrimary">
                        SSBU Randomizer
                    </Typography>

                    <Tooltip title="Toggel dark mode">
                        <IconButton
                            aria-label="toggle dark mode"
                            onClick={() => {
                                setDarkMode(!darkMode);
                            }}
                            className={classes.toggle}
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavMenu;

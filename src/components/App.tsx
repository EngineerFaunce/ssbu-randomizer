import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    IconButton,
    List,
    ListItem,
    Paper,
    ThemeProvider,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { lightTheme, darkTheme } from "../theme";
import { fighters } from "../data/fighters";
import Fighter from "./Fighter";

const useStyles = makeStyles((theme) => ({
    root: {
        alignContent: "center",
        justifyContent: "center",
    },
    list: {
        alignContent: "center",
        borderRadius: "0.25rem",
        maxWidth: "400px",
        maxHeight: "600px",
        overflow: "auto",
        margin: "auto",
    },
}));

// https://stackoverflow.com/a/2450976
const shuffle = (array: any) => {
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

function App() {
    const classes = useStyles();
    const [fighterList, setFighterList] = useState([]);
    const [darkMode, setDarkMode] = useState(
        window?.localStorage.getItem("darkTheme") === "true" ? true : false
    );
    const [icon, setIcon] = useState(<Brightness7Icon htmlColor="#ffec99" />);

    const themeConfig = darkMode ? darkTheme : lightTheme;

    const handleGenerate = (e: any) => {
        e.preventDefault();
        setFighterList(shuffle([...fighters]));
    };

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
        <ThemeProvider theme={themeConfig}>
            <CssBaseline />
            <Container maxWidth="md" className={classes.root}>
                <Box textAlign="center">
                    <Typography variant="h2">SSBU Randomizer</Typography>
                    <IconButton
                        aria-label="toggle dark mode"
                        onClick={() => {
                            setDarkMode(!darkMode);
                        }}
                    >
                        {icon}
                    </IconButton>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>

                    {fighterList.length !== 0 && (
                        <List className={classes.list}>
                            <Paper>
                                {fighterList.map((fighter: any) => {
                                    return (
                                        <ListItem key={fighter.name}>
                                            <Fighter
                                                name={fighter.name}
                                                series={fighter.series}
                                                isEcho={fighter.isEcho}
                                                iconURL={fighter.iconURL}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </Paper>
                        </List>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;

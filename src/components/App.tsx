import { useState } from "react";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    List,
    ListItem,
    Paper,
    ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { lightTheme, darkTheme } from "../theme";
import { fighters } from "../data/fighters";
import Fighter from "./Fighter";
import NavMenu from "./NavMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "center",
    },
    list: {
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

    const themeConfig = darkMode ? darkTheme : lightTheme;

    const handleGenerate = (e: any) => {
        e.preventDefault();
        setFighterList(shuffle([...fighters]));
    };

    return (
        <ThemeProvider theme={themeConfig}>
            <CssBaseline />
            <Box mt={12}>
                <Container maxWidth="xl">
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <NavMenu
                                controller={{
                                    state: darkMode,
                                    setState: setDarkMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box textAlign="center">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleGenerate}
                                >
                                    Generate
                                </Button>
                            </Box>
                        </Grid>
                        {fighterList.length !== 0 && (
                            <Grid item xs={12}>
                                <Paper elevation={4} className={classes.list}>
                                    <List>
                                        {fighterList.map((fighter: any) => {
                                            return (
                                                <ListItem key={fighter.name}>
                                                    <Fighter
                                                        name={fighter.name}
                                                        series={fighter.series}
                                                        isEcho={fighter.isEcho}
                                                        iconURL={
                                                            fighter.iconURL
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                    <Box textAlign="center" justifyContent="center">
                        <Box mb={2} />
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;

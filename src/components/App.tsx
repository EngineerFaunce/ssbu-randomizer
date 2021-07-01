import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
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

interface FighterData {
    id: number;
    name: string;
    series: string;
    isEcho: boolean;
    iconURL: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 0.5rem",
        [theme.breakpoints.up("sm")]: {
            position: "absolute",
            top: "5%",
        },
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
    let currentIndex = array.length,
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
    const [isCheck, setIsCheck] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState(
        window?.localStorage.getItem("darkTheme") === "true" ? true : false
    );

    const themeConfig = darkMode ? darkTheme : lightTheme;

    // Handle button click for generating randomized list
    const handleGenerate = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsCheck([]);
        setFighterList(shuffle([...fighters]));
    };

    // Handle toggling of checkbox
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;

        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };

    return (
        <ThemeProvider theme={themeConfig}>
            <CssBaseline />
            <Grid container alignItems="center" className={classes.root}>
                <Grid item xs={12}>
                    <NavMenu
                        controller={{
                            state: darkMode,
                            setState: setDarkMode,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box textAlign="center" mb={2}>
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
                                {fighterList.map((fighter: FighterData) => {
                                    return (
                                        <ListItem
                                            key={fighter.id}
                                            disabled={isCheck.includes(
                                                fighter.id + ""
                                            )}
                                        >
                                            <Checkbox
                                                color="primary"
                                                id={fighter.id + ""}
                                                onChange={handleToggle}
                                                checked={isCheck.includes(
                                                    fighter.id + ""
                                                )}
                                            />
                                            <Fighter
                                                name={fighter.name}
                                                series={fighter.series}
                                                isEcho={fighter.isEcho}
                                                iconURL={fighter.iconURL}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </ThemeProvider>
    );
}

export default App;

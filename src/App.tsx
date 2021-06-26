import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    List,
    ListItem,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fighters } from "./fighters";
import Fighter from "./components/Fighter";

const useStyles = makeStyles({
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
});

function App() {
    const classes = useStyles();
    const [fighterList, setFighterList] = useState([]);

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

    const handleClick = (e: any) => {
        e.preventDefault();
        setFighterList(shuffle([...fighters]));
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <Box textAlign="center">
                <Typography variant="h2">SSBU Randomizer</Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Generate
                </Button>

                {fighterList.length !== 0 && (
                    <List className={classes.list}>
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
                    </List>
                )}
            </Box>
        </Container>
    );
}

export default App;

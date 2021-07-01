import { Avatar, Box, Typography } from "@material-ui/core";

type AppProps = {
    name: string;
    series: string;
    isEcho: boolean;
    iconURL: string;
};

function Fighter({ name, series, isEcho, iconURL }: AppProps) {
    return (
        <Box display="flex" alignItems="center">
            <Avatar src={iconURL} />
            <Typography variant="subtitle1">{name}</Typography>
        </Box>
    );
}

export default Fighter;

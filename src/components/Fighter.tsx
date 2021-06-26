import { Avatar, Box, Checkbox, Typography } from "@material-ui/core";

type AppProps = {
    name: string;
    series: string;
    isEcho: boolean;
    iconURL: string;
};

function Fighter({ name, series, isEcho, iconURL }: AppProps) {
    return (
        <Box display="flex" alignItems="center">
            <Checkbox color="primary" />
            <Avatar src={iconURL} />
            <Typography variant="subtitle1">{name}</Typography>
        </Box>
    );
}

export default Fighter;

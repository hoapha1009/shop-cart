import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import productApi from '../../../api/productApi';

const useStyles = makeStyles((theme) => ({
    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 auto',
    },
}));

const ListPage = () => {
    const classes = useStyles();

    React.useEffect(() => {
        (async () => {
            const response = await productApi.getAll({ _page: 1, _limit: 10 });
            console.log({ response });
        })();
    }, []);

    return (
        <Box>
            <Container>
                <Grid container>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>Left column</Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>Right column</Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ListPage;

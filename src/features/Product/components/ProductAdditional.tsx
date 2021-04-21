import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
    product: any | {};
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 4),
    },
    title: {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        paddingBottom: theme.spacing(3),
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}));

const ProductAdditional = (props: Props) => {
    const classes = useStyles();
    const { product } = props;
    return (
        <Paper elevation={0} className={classes.root}>
            <Box>
                <Typography component='h4' className={classes.title}>
                    Thông tin khuyến mãi
                </Typography>
            </Box>
            <Typography variant='body1'>{`Miễn phí vận chuyển: ${
                product.isFreeShip ? 'CÓ' : 'KHÔNG'
            }`}</Typography>
            <Typography variant='body1'>{`Khuyến mãi: ${
                product.isPromotion ? 'CÓ' : 'KHÔNG'
            }`}</Typography>
        </Paper>
    );
};

export default ProductAdditional;

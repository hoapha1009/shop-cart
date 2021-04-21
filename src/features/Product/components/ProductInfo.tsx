import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import formatPrice from '../../../utils/common';

interface P {
    product: any;
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    description: {
        margin: theme.spacing(2, 0),
    },
    priceBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[300],
    },
    salePrice: {
        marginRight: theme.spacing(3),
        fontSize: theme.typography.h4.fontSize,
        fontWeight: 'bold',
    },
    originalPrice: {
        marginRight: theme.spacing(2),
        textDecoration: 'line-through',
    },
}));

const ProductInfo: React.FC<P> = ({ product }) => {
    const {
        name,
        shortDescription,
        salePrice,
        originalPrice,
        promotionPercent,
    } = product;
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography component='h1' variant='h4'>
                {name}
            </Typography>
            <Typography className={classes.description}>
                {shortDescription}
            </Typography>
            <Box className={classes.priceBox}>
                <Box component='span' className={classes.salePrice}>
                    {formatPrice(salePrice)}
                </Box>
                {promotionPercent && (
                    <>
                        <Box component='span' className={classes.originalPrice}>
                            {formatPrice(originalPrice)}
                        </Box>
                        <Box component='span'>{`-${promotionPercent}%`}</Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default ProductInfo;

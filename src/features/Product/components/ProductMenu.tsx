import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

interface Props {}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: `1px solid ${theme.palette.grey[300]}`,

        '& > li': {
            padding: theme.spacing(2, 4),
        },

        '& > li > a': {
            color: theme.palette.grey[700],
            fontWeight: 'bold',
            transition: 'all 0.25',
        },

        '& > li > a.active': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
}));

const ProductMenu = (props: Props) => {
    const classes = useStyles();
    const { url } = useRouteMatch();
    return (
        <Box component='ul' className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>
                    Mô tả
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`}>
                    Khuyến mãi thêm
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`}>
                    Đánh giá
                </Link>
            </li>
        </Box>
    );
};

export default ProductMenu;

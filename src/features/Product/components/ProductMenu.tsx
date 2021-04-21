import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

interface Props {}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',

        '& > li': {
            padding: theme.spacing(2, 4),
        },

        '& > li > a': {
            color: theme.palette.grey[700],
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
                    Description
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`}>
                    Additional
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`}>
                    Reviews
                </Link>
            </li>
        </Box>
    );
};

export default ProductMenu;

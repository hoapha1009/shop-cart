import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, ShoppingCart } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import StorefrontIcon from '@material-ui/icons/Storefront';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Login from '../../features/Auth/Login';
import Register from '../../features/Auth/Register';
import { signOut } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/cartSelectors';
import { hideMiniCartClick } from '../../features/Cart/cartSlice';
import ShowMiniCart from '../../features/Cart/showMiniCart';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
    },
    name: {
        textDecoration: 'none',
        '&:hover, &:focus': {
            textDecoration: 'none',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        marginRight: '20px',
    },
    closeBtn: {
        zIndex: 1,
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(3),
        fontSize: '25px',
        cursor: 'pointer',
        opacity: '0.5',
    },
    box: {
        paddingBottom: theme.spacing(2),
    },
    miniCart: {
        position: 'absolute',
        top: theme.spacing(6.5),
        right: theme.spacing(4.2),
    },
}));

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

const Header = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState(MODE.LOGIN);
    const loggedInUser = useAppSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const cartItemsCount = useAppSelector(cartItemsCountSelector);
    const history = useHistory();
    const showMiniCart = useAppSelector((state) => state.cart.showMiniCart);

    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignOut = () => {
        handleCloseMenu();
        const action = signOut();
        dispatch(action);
    };

    const handleCartClick = () => {
        history.push('/cart');
    };

    const handleCartClose = () => {
        dispatch(hideMiniCartClick());
    };

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Link to='/' className={classes.name}>
                        <StorefrontIcon
                            fontSize='large'
                            className={classes.logo}
                        />
                    </Link>

                    <Typography variant='h6' className={classes.title}>
                        <Link to='/' className={classes.name}>
                            HaFa
                        </Link>
                    </Typography>
                    {!isLoggedIn && (
                        <Button color='inherit' onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}
                    {isLoggedIn && (
                        <IconButton color='inherit' onClick={handleClickMenu}>
                            <AccountCircle />
                        </IconButton>
                    )}
                    <IconButton
                        aria-label='show 4 new mails'
                        color='inherit'
                        onClick={handleCartClick}
                    >
                        <Badge badgeContent={cartItemsCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <Box className={classes.miniCart}>
                        {showMiniCart && (
                            <ShowMiniCart onClose={handleCartClose} />
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Dialog
                disableEscapeKeyDown
                disableBackdropClick
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />
                            <Box textAlign='center' className={classes.box}>
                                <Button
                                    color='primary'
                                    onClick={() => setMode(MODE.LOGIN)}
                                >
                                    Already have an account? Click here!
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign='center' className={classes.box}>
                                <Button
                                    color='primary'
                                    onClick={() => setMode(MODE.REGISTER)}
                                >
                                    Don't have an account? Register here!
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <CloseIcon onClick={handleClose} className={classes.closeBtn} />
            </Dialog>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default Header;

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import StorefrontIcon from '@material-ui/icons/Storefront';
import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../../features/Auth/Register';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
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
}));

const Header = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <StorefrontIcon fontSize='large' className={classes.logo} />

                    <Typography variant='h6' className={classes.title}>
                        <Link to='/'>HaFa</Link>
                    </Typography>
                    <Button color='inherit' onClick={handleClickOpen}>
                        Register
                    </Button>
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
                    <Register closeDialog={handleClose} />
                </DialogContent>
                <CloseIcon onClick={handleClose} className={classes.closeBtn} />
            </Dialog>
        </div>
    );
};

export default Header;

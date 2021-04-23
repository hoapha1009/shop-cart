import {
    Box,
    Button,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

interface Props {
    onClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: '300px',
            minHeight: '100px',
            backgroundColor: 'white',
            color: 'black',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            padding: theme.spacing(1),
            position: 'relative',
            borderRadius: '5px',
            boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            zIndex: 1,

            '&::before': {
                content: '""',
                position: 'absolute',
                top: theme.spacing(-2),
                right: '6px',
                borderStyle: 'solid',
                borderWidth: '8px 10px',
                borderColor: 'transparent transparent white transparent',
            },
        },
        message: {
            textAlign: 'center',
            paddingBottom: theme.spacing(2),
        },
        action: {
            display: 'inline-block',
            padding: 0,
            margin: '0 auto',
        },
        closeBtn: {
            zIndex: 1,
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
            fontSize: '20px',
            cursor: 'pointer',
            opacity: '0.5',
        },
    })
);

const ShowMiniCart = (props: Props) => {
    const classes = useStyles();
    const { onClose } = props;

    const handleClose = () => {
        if (!onClose) return;
        onClose();
    };

    return (
        <div>
            <Box className={classes.root}>
                <Box className={classes.message}>
                    Thêm vào giỏ hàng thành công!
                </Box>
                <Box className={classes.action}>
                    <Button color='secondary' size='small' variant='contained'>
                        Xem giỏ hàng và thanh toán
                    </Button>
                </Box>
                <CloseIcon onClick={handleClose} className={classes.closeBtn} />
            </Box>
        </div>
    );
};

export default ShowMiniCart;

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 4),
    },
    card: {
        padding: theme.spacing(0, 2),
    },
    title: {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        paddingBottom: theme.spacing(3),
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    avatar: {
        backgroundColor: theme.palette.info.light,
    },
    left: {
        width: '500px',
    },
    right: {
        flex: '1 1 0',
        paddingLeft: theme.spacing(2),
    },
}));

const ProductReviews = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState<number | null>(2);
    return (
        <Paper elevation={0} className={classes.root}>
            <Box>
                <Typography component='h4' className={classes.title}>
                    Các bình luận
                </Typography>
            </Box>
            <Box>
                <Grid container>
                    <Grid item className={classes.left}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label='recipe'
                                        className={classes.avatar}
                                    >
                                        R
                                    </Avatar>
                                }
                                title='Shrimp and Chorizo Paella'
                                subheader='September 14, 2016'
                            />
                            <CardContent>
                                <Rating
                                    name='read-only'
                                    value={3.5}
                                    precision={0.5}
                                    readOnly
                                />

                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    component='p'
                                >
                                    Sản phẩm tốt!
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label='recipe'
                                        className={classes.avatar}
                                    >
                                        R
                                    </Avatar>
                                }
                                title='John Cenaaa'
                                subheader='October 26, 2016'
                            />
                            <CardContent>
                                <Rating
                                    name='read-only'
                                    value={4.5}
                                    precision={0.5}
                                    readOnly
                                />
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    component='p'
                                >
                                    Ờ mây zing! Gút chóp sốp!
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label='recipe'
                                        className={classes.avatar}
                                    >
                                        R
                                    </Avatar>
                                }
                                title='Mr.Sang'
                                subheader='April 4, 2016'
                            />
                            <CardContent>
                                <Rating
                                    name='read-only'
                                    value={5}
                                    precision={0.5}
                                    readOnly
                                />
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    component='p'
                                >
                                    Trời ơi! Tuyệt vời ông mặt trời!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Typography component='h4' variant='h5'>
                            Thêm đánh giá
                        </Typography>
                        <Box>
                            <form
                                className={classes.root}
                                noValidate
                                autoComplete='off'
                            >
                                <TextField
                                    id='outlined-basic'
                                    label='Name*'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                />
                                <TextField
                                    id='outlined-basic'
                                    label='Email*'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    style={{ marginTop: '15px' }}
                                />
                                <Box>
                                    <Typography variant='h6'>
                                        Đánh giá:
                                    </Typography>
                                    <Rating
                                        name='hover-feedback'
                                        value={value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                                <TextField
                                    id='outlined-multiline-static'
                                    label='Bình luận'
                                    multiline
                                    rows={4}
                                    defaultValue=''
                                    fullWidth
                                    variant='outlined'
                                    style={{ marginTop: '15px' }}
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    style={{ marginTop: '15px' }}
                                >
                                    Xác nhận
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default ProductReviews;

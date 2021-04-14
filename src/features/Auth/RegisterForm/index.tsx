import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LockOpenOutlined } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import PasswordField from '../../../components/form-controls/PasswordField';

type Inputs = {
    fullName: string;
    email: string;
    password: string;
    retypePassword: string;
};

type P = {
    onSubmit: (values: Inputs) => void;
};

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        padding: theme.spacing(3),
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        margin: theme.spacing(2, 0, 2),
        textAlign: 'center',
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    progress: {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}));

export default function RegisterForm(props: P) {
    const { onSubmit } = props;
    const classes = useStyles();
    // const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Enter full name!')
            .test(
                'should has at least 2 words',
                'Please enter at least 2 words!',
                (value) => {
                    return value!.split(' ').length >= 2;
                }
            ),
        email: yup
            .string()
            .required('Enter email!')
            .email('Please enter a valid email!'),
        password: yup.string().required('Please enter password!'),
        // .matches(
        //     regex,
        //     'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character!'
        // ),
        retypePassword: yup
            .string()
            .required('Please confirm your password!')
            .oneOf([yup.ref('password')], 'Retype password wrong!'),
    });
    const form = useForm<Inputs>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values: Inputs) => {
        if (!onSubmit) return;

        await onSubmit(values);
    };

    const { isSubmitting } = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatar}>
                <LockOpenOutlined />
            </Avatar>
            <Typography className={classes.title} component='h3' variant='h5'>
                Create an account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='fullName' label='Full Name:' form={form} />
                <InputField name='email' label='Email:' form={form} />
                <PasswordField name='password' label='Password:' form={form} />
                <PasswordField
                    name='retypePassword'
                    label='Retype Password:'
                    form={form}
                />

                <Button
                    disabled={isSubmitting}
                    type='submit'
                    className={classes.submit}
                    variant='contained'
                    fullWidth
                    color='primary'
                    size='large'
                >
                    Create an account
                </Button>
            </form>
        </div>
    );
}

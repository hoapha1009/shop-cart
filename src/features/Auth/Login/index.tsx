import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import LoginForm from '../LoginForm';
import { login } from '../userSlice';

type Inputs = {
    identifier: string;
    password: string;
};

type P = {
    closeDialog: () => void;
};

const Login: React.FC<P> = ({ closeDialog }) => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (values: Inputs) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            // close Modal
            if (closeDialog) {
                closeDialog();
            }
            // show Success noti
            enqueueSnackbar('Login successfully!!!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };
    return (
        <div>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;

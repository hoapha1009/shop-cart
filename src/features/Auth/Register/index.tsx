import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import RegisterForm from '../RegisterForm';
import { register } from '../userSlice';

type Inputs = {
    fullName: string;
    email: string;
    password: string;
    retypePassword: string;
    username?: string;
};

type P = {
    closeDialog: () => void;
};

const Register: React.FC<P> = ({ closeDialog }) => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (values: Inputs) => {
        try {
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            // close Modal
            if (closeDialog) {
                closeDialog();
            }

            // show Success noti
            enqueueSnackbar('Register successfully!!!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={onSubmit} />
        </div>
    );
};

export default Register;

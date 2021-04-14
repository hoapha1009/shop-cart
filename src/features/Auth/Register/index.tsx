import { unwrapResult } from '@reduxjs/toolkit';
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

const Register = () => {
    const dispatch = useAppDispatch();

    const onSubmit = async (values: Inputs) => {
        try {
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('New user', user);
        } catch (error) {
            console.log('Failed to register', error);
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={onSubmit} />
        </div>
    );
};

export default Register;

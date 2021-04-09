import React from "react";
import RegisterForm from "../RegisterForm";

type Inputs = {
    fullName: string;
    email: string;
    password: string;
    retypePassword: string;
};

const onSubmit = (values: Inputs) => {
    console.log("Values", values);
};

const Register = () => {
    return (
        <div>
            <RegisterForm onSubmit={onSubmit} />
        </div>
    );
};

export default Register;

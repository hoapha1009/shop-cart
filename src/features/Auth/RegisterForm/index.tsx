import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { LockOpenOutlined } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/form-controls/InputField";

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
        position: "relative",
        padding: theme.spacing(2),
    },

    avatar: {
        margin: "0 auto",
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        margin: theme.spacing(2, 0, 2),
        textAlign: "center",
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    progress: {
        position: "absolute",
        top: theme.spacing(1),
        left: 0,
        right: 0,
    },
}));

export default function RegisterForm(props: P) {
    const { onSubmit } = props;
    const classes = useStyles();
    const schema = yup.object().shape({
        fullName: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        retypePassword: yup.string().required(),
    });
    const form = useForm<Inputs>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            retypePassword: "",
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values: Inputs) => {
        if (!onSubmit) return;

        onSubmit(values);
    };

    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <LockOpenOutlined />
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create an account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name:" form={form} />
                <InputField name="email" label="Email:" form={form} />
                <InputField name="password" label="Password:" form={form} />
                <InputField
                    name="retypePassword"
                    label="Retype Password:"
                    form={form}
                />

                <Button
                    // disabled={isSubmitting}
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                >
                    Create an account
                </Button>
            </form>
        </div>
    );
}

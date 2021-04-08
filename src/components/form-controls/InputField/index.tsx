import { TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

type P = {
    name: string;
    form: any;
    label: string;
    disabled: boolean;
};

const InputField: React.FC<P> = (props) => {
    const { name, form, label, disabled } = props;
    const { errors } = form;
    const hasError = !!errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            render={() => (
                <TextField
                    fullWidth
                    label={label}
                    disabled={disabled}
                    error={hasError}
                    helperText={errors[name]?.message}
                />
            )}
        />
    );
};

export default InputField;

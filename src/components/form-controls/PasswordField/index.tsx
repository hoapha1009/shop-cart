import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';
import { Controller } from 'react-hook-form';

type P = {
    name: string;
    form: any;
    label: string;
    disabled?: boolean;
};

const PasswordField: React.FC<P> = (props) => {
    const { name, form, label, disabled } = props;
    const { errors } = form.formState;
    const hasError = !!errors[name];

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <>
            <Controller
                name={name}
                control={form.control}
                render={({ field }) => {
                    return (
                        <FormControl
                            {...field}
                            error={hasError}
                            fullWidth
                            margin='normal'
                            variant='outlined'
                        >
                            <InputLabel htmlFor={name}>{label}</InputLabel>
                            <OutlinedInput
                                label={label}
                                id={name}
                                type={showPassword ? 'text' : 'password'}
                                disabled={disabled}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            edge='end'
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    );
                }}
            />
            <FormHelperText error={hasError}>
                {errors[name]?.message}
            </FormHelperText>
        </>
    );
};

export default PasswordField;

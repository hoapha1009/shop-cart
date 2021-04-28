import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    makeStyles,
    OutlinedInput,
    Typography,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import React from 'react';
import { Controller } from 'react-hook-form';

type P = {
    name: string;
    form: any;
    label?: string;
    disabled?: boolean;
    onChange?: (values: number) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    box: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        maxWidth: '200px',
    },
}));

const QuantityField: React.FC<P> = (props) => {
    const classes = useStyles();
    const { name, form, label, disabled, onChange } = props;
    const { errors } = form.formState;
    const hasError = !!errors[name];

    const handleChange = (newValue: number) => {
        form.setValue(name, newValue);
        if (onChange) onChange(newValue);
    };

    return (
        <FormControl
            error={hasError}
            fullWidth
            margin='normal'
            variant='outlined'
            size='small'
        >
            <Typography>{label}</Typography>
            <Controller
                name={name}
                control={form.control}
                render={({ field }: any) => {
                    return (
                        <Box className={classes.box}>
                            <IconButton
                                onClick={() => {
                                    handleChange(field.value - 1);
                                }}
                            >
                                <RemoveCircleOutline />
                            </IconButton>
                            <OutlinedInput
                                id={name}
                                type='number'
                                disabled={disabled}
                                value={field.value}
                                onChange={(e) => {
                                    handleChange(
                                        Number.parseInt(e.target.value)
                                    );
                                }}
                                onBlur={field.onBlur}
                            />
                            <IconButton
                                onClick={() => {
                                    handleChange(field.value + 1);
                                }}
                            >
                                <AddCircleOutline />
                            </IconButton>
                        </Box>
                    );
                }}
            />

            <FormHelperText error={hasError}>
                {errors[name]?.message}
            </FormHelperText>
        </FormControl>
    );
};

export default QuantityField;

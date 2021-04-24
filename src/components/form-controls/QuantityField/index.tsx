import {
    Box,
    FormHelperText,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import React from 'react';
import { Controller } from 'react-hook-form';
import { IInputAddToCartForm } from '../../../features/Product/components/AddToCartForm';

type P = {
    name: string;
    form: any;
    label?: string;
    disabled?: boolean;
    onSubmit?: (values: IInputAddToCartForm) => void;
};

const useStyles = makeStyles((theme) => ({
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
    const { name, form, label, disabled, onSubmit } = props;
    const { errors } = form.formState;
    const { setValue } = form;
    const hasError = !!errors[name];

    const handleQuantitySubmit = (values: IInputAddToCartForm) => {
        if (!onSubmit) return;
        onSubmit(values);
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
                                    setValue(
                                        name,
                                        Number.parseInt(field.value)
                                            ? Number.parseInt(field.value) - 1
                                            : 1
                                    );
                                    handleQuantitySubmit(field.value);
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
                                    field.onChange(e);
                                    handleQuantitySubmit(field.value);
                                }}
                                onBlur={field.onBlur}
                            />
                            <IconButton
                                onClick={() => {
                                    setValue(
                                        name,
                                        Number.parseInt(field.value)
                                            ? Number.parseInt(field.value) + 1
                                            : 1
                                    );
                                    handleQuantitySubmit(field.value);
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

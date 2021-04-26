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
    const { setValue, getValues } = form;
    const defaultValue = getValues(name);
    console.log('defaultValue', defaultValue);
    const hasError = !!errors[name];

    const handleQuantitySubmit = (value: any) => {
        if (!onSubmit) return;
        onSubmit(value);
    };

    const handleQuantityChange = (
        e:
            | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>,
        value: any,
        type?: string
    ) => {
        e.preventDefault();
        let newValue;

        switch (type) {
            case 'desc': {
                newValue = Number.parseInt(value)
                    ? Number.parseInt(value) - 1
                    : 1;
                break;
            }
            case 'asc': {
                newValue = Number.parseInt(value)
                    ? Number.parseInt(value) + 1
                    : 1;
                break;
            }
            default:
                newValue = Number.parseInt(getValues(name))
                    ? Number.parseInt(getValues(name))
                    : Number.parseInt(value);
        }

        return newValue;
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
                                onClick={(e) => {
                                    const value = handleQuantityChange(
                                        e,
                                        field.value,
                                        'desc'
                                    );
                                    setValue(name, value);
                                    handleQuantitySubmit(value);
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
                                    const value = handleQuantityChange(
                                        e,
                                        field.value
                                    );
                                    setValue(name, value);
                                    handleQuantitySubmit(value);
                                }}
                                onBlur={field.onBlur}
                            />
                            <IconButton
                                onClick={(e) => {
                                    const value = handleQuantityChange(
                                        e,
                                        field.value,
                                        'asc'
                                    );
                                    setValue(name, value);
                                    handleQuantitySubmit(value);
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

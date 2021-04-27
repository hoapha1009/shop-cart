import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    makeStyles,
    OutlinedInput,
    Snackbar,
    Typography,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
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

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

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
    const { name, form, label, disabled, onSubmit } = props;
    const { errors } = form.formState;
    const { setValue, getValues } = form;
    const hasError = !!errors[name];
    const [open, setOpen] = React.useState(false);

    const handleQuantitySubmit = (value: any) => {
        if (!onSubmit) return;
        onSubmit(value);
    };

    const handleQuantityChange = (value: any, type?: string) => {
        let newValue = value;
        const maxValue = 99;

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
        if (newValue > maxValue) {
            setOpen(true);
            return maxValue;
        }

        return newValue;
    };

    const handleClose = (event?: React.SyntheticEvent) => {
        setOpen(false);
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
                                    const value = handleQuantityChange(
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
                                onClick={() => {
                                    const value = handleQuantityChange(
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
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='info'>
                    Số lượng tối đa có thể mua của sản phẩm này là 99!
                </Alert>
            </Snackbar>
        </FormControl>
    );
};

export default QuantityField;

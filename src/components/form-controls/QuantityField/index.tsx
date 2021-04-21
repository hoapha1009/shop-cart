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

type P = {
    name: string;
    form: any;
    label: string;
    disabled?: boolean;
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
    const { name, form, label, disabled } = props;
    const { errors } = form.formState;
    const { setValue } = form;
    const hasError = !!errors[name];

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
                                onClick={() =>
                                    setValue(
                                        name,
                                        Number.parseInt(field.value)
                                            ? Number.parseInt(field.value) - 1
                                            : 1
                                    )
                                }
                            >
                                <RemoveCircleOutline />
                            </IconButton>
                            <OutlinedInput
                                id={name}
                                type='number'
                                disabled={disabled}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                            <IconButton
                                onClick={() =>
                                    setValue(
                                        name,
                                        Number.parseInt(field.value)
                                            ? Number.parseInt(field.value) + 1
                                            : 1
                                    )
                                }
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

import {
    Box,
    Button,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';

export interface IFilterByPrice {
    salePrice_gte: number;
    salePrice_lte: number;
}

export type P = {
    onChange?: (values: IFilterByPrice) => void;
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(2),
    },
    range: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        '& > span': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    },
}));

const FilterByPrice: React.FC<P> = ({ onChange }) => {
    const classes = useStyles();
    const [values, setValues] = React.useState<IFilterByPrice>({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!onChange) return;
        onChange(values);

        setValues({
            salePrice_gte: 0,
            salePrice_lte: 0,
        });
    };

    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>CHỌN KHOẢNG GIÁ</Typography>

            <Box className={classes.range}>
                <TextField
                    name='salePrice_gte'
                    value={values.salePrice_gte}
                    onChange={handleChange}
                />
                <span>-</span>
                <TextField
                    name='salePrice_lte'
                    value={values.salePrice_lte}
                    onChange={handleChange}
                />
            </Box>

            <Button
                variant='outlined'
                color='primary'
                onClick={handleSubmit}
                size='small'
            >
                Áp dụng
            </Button>
        </Box>
    );
};

export default FilterByPrice;

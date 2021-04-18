import { Box, Button, TextField, Typography } from '@material-ui/core';
import React from 'react';

export interface IFilterByPrice {
    salePrice_gte: number;
    salePrice_lte: number;
}

export type P = {
    onChange?: (values: IFilterByPrice) => void;
};

const FilterByPrice: React.FC<P> = ({ onChange }) => {
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
        <Box>
            <Typography variant='subtitle2'>GIÁ</Typography>

            <Box>
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

            <Button variant='outlined' color='primary' onClick={handleSubmit}>
                Áp dụng
            </Button>
        </Box>
    );
};

export default FilterByPrice;

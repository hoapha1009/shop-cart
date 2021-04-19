import {
    Box,
    Checkbox,
    FormControlLabel,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React from 'react';

export interface IFilterByService {
    [k: string]: Boolean;
}

export type P = {
    onChange?: (values: IFilterByService) => void;
    filters: any;
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(2),
    },
    list: {
        '& > li': {
            marginTop: theme.spacing(1),
        },
    },
}));

const FilterByService: React.FC<P> = ({ onChange, filters }) => {
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return;
        const { name, checked } = e.currentTarget;
        onChange({ [name]: checked });
    };

    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>DỊCH VỤ</Typography>

            <ul className={classes.list}>
                {[
                    { value: 'isPromotion', label: 'Có khuyến mãi' },
                    { value: 'isFreeShip', label: 'Vận chuyển miễn phí' },
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color='primary'
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default FilterByService;

import { Box, Chip, makeStyles } from '@material-ui/core';
import React from 'react';

export interface IFilterViewer {}

interface P {
    filters: any;
    onChange?: (filters: any) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        margin: theme.spacing(2, 0),

        '& > li': {
            padding: theme.spacing(1),
        },
    },
}));

const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters: any) => 'Giao hàng miễn phí',
        isActive: (filters: any) => filters.isFreeShip,
        isVisible: true,
        isRemovable: false,
        onRemove: (filters: any) => {},
        onToggle: (filters: any) => {
            const newFilters: any = { ...filters };

            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: (filters: any) => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters: any) => [filters.isPromotion] as const,
        isRemovable: true,
        onRemove: (filters: any) => {
            const newFilters: any = { ...filters };

            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters: any) =>
            `Giá từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters: any) =>
            Object.keys(filters).includes('salePrice_gte') &&
            Object.keys(filters).includes('salePrice_lte') &&
            Number(filters.salePrice_gte) > 0 &&
            Number(filters.salePrice_lte) > 0,
        isRemovable: true,
        onRemove: (filters: any) => {
            const newFilters: any = { ...filters };

            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
        },
        onToggle: () => {},
    },
    // {
    //     id: 1,
    //     getLabel: (filters) => 'Danh mục',
    //     isActive: (filters) => true,
    //     isVisible: (filters) => true,
    //     isRemovable: true,
    //     onRemove: (filters) => {},
    //     onToggle: (filters) => {},
    // },
];
const FilterViewer: React.FC<P> = ({ filters = {}, onChange }) => {
    const classes = useStyles();
    console.log('filters', filters);

    const handleFiltersChange = (filters: any, x: any) => {
        if (!onChange) return;
        const newFilters = x.onToggle(filters);
        onChange(newFilters);
    };

    const handleFiltersRemove = (filters: any, x: any) => {
        if (!onChange) return;
        const newFilters = x.onRemove(filters);

        onChange(newFilters);
    };

    const handleClick = (filters: any, x: any) => {
        return x.isRemovable ? null : handleFiltersChange(filters, x);
    };

    const handleDelete = (filters: any, x: any) => {
        return x.isRemovable ? handleFiltersRemove(filters, x) : null;
    };

    return (
        <Box className={classes.root} component='ul'>
            {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={() => handleClick(filters, x)}
                        onDelete={() => handleDelete(filters, x)}
                    />
                </li>
            ))}
        </Box>
    );
};

export default FilterViewer;

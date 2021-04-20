import { Box, Chip, makeStyles } from '@material-ui/core';
import React from 'react';

export interface IFilterViewer {}

interface P {
    filters: any;
    onChange?: (filters: any) => void;
    categoryPicked: any;
}

interface IFilterItem {
    id: number;
    getLabel(filters: any, categoryPicked: any): any;
    isActive(filters: any): Boolean;
    isVisible(filters: any): Boolean;
    isRemovable: Boolean;
    onRemove(filters: any): any;
    onToggle(filters: any): any;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),

        '& > li': {
            padding: theme.spacing(1),
        },
    },
}));

const FILTER_LIST: IFilterItem[] = [
    {
        id: 1,
        getLabel: (filters) => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: (filters) => {},
        onToggle: (filters) => {
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
        getLabel: (filters) => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters: any = { ...filters };

            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) =>
            `Giá từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('salePrice_gte') &&
            Object.keys(filters).includes('salePrice_lte') &&
            Number(filters.salePrice_gte) >= 0 &&
            Number(filters.salePrice_lte) > 0,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters: any = { ...filters };

            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 4,
        getLabel: (filters, categoryPicked) => {
            const newFilters = { ...filters };
            if (!categoryPicked || !newFilters['category.id']) {
                return '';
            }
            return categoryPicked.name;
        },
        isActive: () => true,
        isVisible: (filters) => filters['category.id'],
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };

            delete newFilters['category.id'];
            return newFilters;
        },
        onToggle: () => {},
    },
];
const FilterViewer: React.FC<P> = ({
    filters = {},
    onChange,
    categoryPicked,
}) => {
    const classes = useStyles();

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

    const visibleFilters = React.useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    }, [filters]);

    return (
        <Box className={classes.root} component='ul'>
            {visibleFilters.map((x) => {
                if (x.isRemovable) {
                    return (
                        <li key={x.id}>
                            <Chip
                                label={x.getLabel(filters, categoryPicked)}
                                color={
                                    x.isActive(filters) ? 'primary' : 'default'
                                }
                                clickable={!x.isRemovable}
                                onClick={() => handleClick(filters, x)}
                                onDelete={() => handleDelete(filters, x)}
                            />
                        </li>
                    );
                } else {
                    return (
                        <li key={x.id}>
                            <Chip
                                label={x.getLabel(filters, categoryPicked)}
                                color={
                                    x.isActive(filters) ? 'primary' : 'default'
                                }
                                clickable={!x.isRemovable}
                                onClick={() => handleClick(filters, x)}
                            />
                        </li>
                    );
                }
            })}
        </Box>
    );
};

export default FilterViewer;

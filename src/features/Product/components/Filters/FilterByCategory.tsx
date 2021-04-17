import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import categoryApi from '../../../../api/categoryApi';

interface P {
    onChange?: (newCategoryId: number) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    menu: {
        '& > li': {
            marginTop: theme.spacing(1),
            transition: 'all .25s linear',
            padding: '2px',

            '&:hover': {
                color: theme.palette.primary.light,
                backgroundColor: 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
            },
        },
    },
}));

const FilterByCategory: React.FC<P> = ({ onChange }) => {
    const classes = useStyles();

    const [categoryList, setCategoryList] = React.useState([
        {
            id: 1,
            name: '',
        },
    ]);

    React.useEffect(() => {
        (async () => {
            try {
                const list: any = await categoryApi.getAll();

                setCategoryList(
                    list.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                    }))
                );
            } catch (error) {
                console.log('Failed to fetch category list!', error);
            }
        })();
    }, []);

    const handleCategoryClick = (categoryId: number) => {
        if (onChange) {
            onChange(categoryId);
        }
    };

    return (
        <Box className={classes.root}>
            <Typography>DANH MỤC SẢN PHẨM</Typography>
            <ul className={classes.menu}>
                {categoryList.map((cate) => (
                    <li
                        key={cate.id}
                        onClick={() => handleCategoryClick(cate.id)}
                    >
                        <Typography variant='body2'>{cate.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default FilterByCategory;

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '../../../components/form-controls/QuantityField';

export interface IInputAddToCartForm {
    quantity?: number;
}

interface Props {
    onSubmit?: (values: IInputAddToCartForm) => void;
}

const AddToCartForm = (props: Props) => {
    const { onSubmit } = props;
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Nhập số lượng muốn mua!')
            .min(1, 'Số lượng ít nhất là 1!')
            .typeError('Vui lòng nhập đúng số lượng!'),
    });
    const form = useForm<IInputAddToCartForm>({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values: IInputAddToCartForm) => {
        if (!onSubmit) return;

        await onSubmit(values);
    };
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name='quantity' label='Số lượng:' form={form} />

            <Button
                // disabled={isSubmitting}
                type='submit'
                variant='contained'
                color='primary'
                style={{ width: '250px' }}
                size='large'
            >
                Buy
            </Button>
        </form>
    );
};

export default AddToCartForm;

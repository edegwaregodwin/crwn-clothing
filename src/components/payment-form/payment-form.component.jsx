import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import CustomButton from '../custom-button/custom-button.component';

import './payment-form.styles.scss';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {

        }
    };


    return (
        <div className='payment-form-container'>
            <form className='payment-form' onSubmit={handleSubmit}>
                <h3>Credit Card Payment: </h3>
                <CardElement />
                <CustomButton inverted disabled={!stripe}>Pay now</CustomButton>
            </form>
        </div>
    )
};

export default PaymentForm;
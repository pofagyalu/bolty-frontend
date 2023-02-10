import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../functions/stripe';

import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import Laptop from '../../images/laptop.png';

import styles from './StripeCheckout.module.css';
import Checkout from '../../pages/Checkout';
import { createOrder, emptyUserCart } from '../../functions/user';
import { cartActions } from '../../store/cart';

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const user = useSelector((state) => state.user.currentUser);
  const coupon = useSelector((state) => state.cart.couponApplied);

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log('create payment intent', res.data);
      setClientSecret(res.data.clientSecret);
      //additional response receieved on succesful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
          email: user.email,
        },
      },
    });
    if (payload.error) {
      setError(`A fizetés sikertelen ${payload.error.message}`);
      setProcessing(false);
      setSucceeded(false);
    } else {
      // here you get result after succesfull payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== 'undefined') localStorage.removeItem('cart');

          // empty cart from redux
          dispatch(cartActions.addToCart([]));
          dispatch(cartActions.couponApplied(false));

          // empty cart from database
          emptyUserCart(user.token);
        }
      });

      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = (e) => {
    // listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ''); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {' '}
          {coupon && totalAfterDiscount !== undefined ? (
            <p className='alert alert-success'>Kupon sikeresen felhasználva</p>
          ) : (
            <p className='alert alert-danger'>No kupon alkalmazva</p>
          )}
        </div>
      )}
      <div className='text-center pb-5'>
        <Card
          cover={
            <img
              src={Laptop}
              style={{
                height: '200px',
                objectFit: 'cover',
              }}
              alt={'product'}
            />
          }
          actions={[
            <>
              <DollarOutlined classID='text-info' />
              <br /> Összesen kedvezményekkel: ${cartTotal}
            </>,
            <>
              <Checkout classID='text-info' />
              <br /> Összesen fizetendő: ${payable}
            </>,
          ]}
        />
      </div>
      <form
        id='payment-form'
        className={styles['stripe-form']}
        onSubmit={handleSubmit}
      >
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className={styles['stripe-button']}
          disabled={processing || disabled || succeeded}
        >
          <span id='button-text'>
            {processing ? (
              <div className={styles.spinner} id='spinner'></div>
            ) : (
              'Fizetés'
            )}
          </span>
        </button>
        <br />
        {error && (
          <div className={styles['#card-error']} role='alert'>
            {error}
          </div>
        )}
        <p
          className={`${styles['result-message']} ${
            !succeeded && styles.hidden
          }`}
        >
          Fizetés sikeres.{' '}
          <Link to='/user/history'>
            Tekintsd meg a rendelési előzmények között.
          </Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;

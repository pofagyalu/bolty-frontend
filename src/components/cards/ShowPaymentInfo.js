import React from 'react';

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <p>
        {' '}
        <span>Rendelési azonosító: {order.paymentIntent.id}</span>
        {' / '}
        <span>Összeg: {(order.paymentIntent.amount /= 100)} Ft</span>
        {' / '}
        <span>Valuta: {order.paymentIntent.currency.toUpperCase()}</span>
        {' / '}
        <span>Mód: {order.paymentIntent.payment_method_types[0]}</span>
        {' / '}
        <span>
          Dátum: {new Date(order.paymentIntent.created).toLocaleString()}
        </span>{' '}
        <br />
        {showStatus && (
          <span className='badge bg-primary'>Státusz: {order.orderStatus}</span>
        )}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;

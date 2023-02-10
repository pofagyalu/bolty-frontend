import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

const showOrderInTable = (order) => (
  <table className='table table-bordered'>
    <thead className='thead-light'>
      <tr>
        <th scope='col'>Név</th>
        <th scope='col'>Ár</th>
        <th scope='col'>Gyártó</th>
        <th scope='col'>Szín</th>
        <th scope='col'>Darab</th>
        <th scope='col'>Szállítás</th>
      </tr>
    </thead>
    <tbody>
      {order.products.map((prod, index) => (
        <tr key={index}>
          <td>
            <strong>{prod.product.title}</strong>
          </td>
          <td>{prod.product.price}</td>
          <td>{prod.product.brand}</td>
          <td>{prod.color}</td>
          <td>{prod.count}</td>
          <td>
            {prod.product.shipping === 'Yes' ? (
              <CheckCircleOutlined style={{ color: 'green' }} />
            ) : (
              <CloseCircleOutlined style={{ color: 'red' }} />
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Név</th>
          <th scope='col'>Ár</th>
          <th scope='col'>Gyártó</th>
          <th scope='col'>Szín</th>
          <th scope='col'>Darab</th>
          <th scope='col'>Szállítás</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((prod, index) => (
          <tr key={index}>
            <td>
              <strong>{prod.product.title}</strong>
            </td>
            <td>{prod.product.price}</td>
            <td>{prod.product.brand}</td>
            <td>{prod.color}</td>
            <td>{prod.count}</td>
            <td>
              {prod.product.shipping === 'Yes' ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
              ) : (
                <CloseCircleOutlined style={{ color: 'red' }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className='row pb-5'>
          <div className='btn btn-block bg-light'>
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className='row'>
              <div className='col-md-4'>Delivery status</div>
              <div className='col-md-8'>
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className='form-control'
                  defaultValue={order.orderStatus}
                  name='status'
                >
                  <option value='Not processed'>Nincs feldolgozva</option>
                  <option value='Cash on delivery'>Fizetés átvételkor</option>
                  <option value='Processing'>Folyamatban</option>
                  <option value='Dispatched'>Szállítás alatt</option>
                  <option value='Canceled'>Törölve</option>
                  <option value='Completed'>Teljesítve</option>
                </select>
              </div>
            </div>
          </div>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;

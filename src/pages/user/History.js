import { useState, useEffect } from 'react';
import { getUserOrders } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';

import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const History = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

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

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName={`szamla.pdf`}
      className='btn btn-sm btn-block btn-outline-primary'
    >
      PDF számla letöltése
    </PDFDownloadLink>
  );

  const showOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className='m-5 p-3 card'>
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className='row'>
          <div className='col'>{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className='col-md-10 text-center'>
      <h4>Vásárlási előzmények</h4>
      {orders.length ? 'Vásárlásaim' : 'Nem volt rendelés'}
      {showOrders()}
    </div>
  );
};

export default History;

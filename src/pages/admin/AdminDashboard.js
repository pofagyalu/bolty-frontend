import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getOrders, changeStatus } from '../../functions/admin';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      setOrders(res.data);
      console.log(JSON.stringify(orders, null, 4));
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Status updated');
      loadOrders();
    });
  };

  return (
    <>
      <div className='col'>
        <h4>Rendszergazda vezérlőpult</h4>
        <Orders orders={orders} handleStatusChange={handleStatusChange} />
      </div>
    </>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import hu from 'date-fns/locale/hu';

const CreateCouponPage = () => {
  const [name, setName] = useState();
  const [expiry, setExpiry] = useState();
  const [discount, setDiscount] = useState();
  const [loading, setLoading] = useState();
  const [coupons, setCoupons] = useState([]);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token).then((res) => {
      setLoading(false);
      loadAllCoupons();
      setName('');
      setDiscount('');
      setExpiry('');
      toast
        .success(`${res.data.name} is created`)
        .catch((err) => console.log('create coupon error', err));
    });
  };

  const handleRemove = (couponId) => {
    if (window.confirm('Biztos törölni akarod?')) {
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`"${res.data.name}" kupon törölve`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='col-md-10'>
      {!loading ? <h4>Kupon</h4> : <h4 className='text-danger'>Betöltés...</h4>}
      <hr />
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='text-muted'>Név</label>
          <input
            type='text'
            className='form-control'
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Kedvezmény %</label>
          <input
            type='text'
            className='form-control'
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            required
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Lejárat</label>
          <DatePicker
            className='form-control'
            selected={new Date()}
            value={expiry}
            required
            onChange={(date) => setExpiry(date)}
          />
        </div>
        <button className='btn btn-outline-primary'>Mentés</button>
      </form>
      <br />
      <h4>{coupons.length} kupon</h4>
      <table className='table table-bordered'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>Név</th>
            <th scope='col'>Lejárat</th>
            <th scope='col'>Kedvezmény %</th>
            <th scope='col'>Törlés</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon.name}</td>
              <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
              <td>{coupon.discount}</td>
              <td>
                <DeleteOutlinedIcon
                  onClick={() => handleRemove(coupon._id)}
                  className='text-danger'
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateCouponPage;

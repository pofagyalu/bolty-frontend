import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ProductCartInCheckout from '../components/cards/ProductCartInCheckout';
import { userCart } from '../functions/user';
import { codActions } from '../store/cod';

const Cart = () => {
  const cart = useSelector((state) => state.cart.products);

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((acc, prod) => acc + prod.price * prod.count, 0);
  };

  const saveOrderToDb = () => {
    // console.log('cart', JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        // console.log('Cart POST res', res);
        if (res.data.ok) navigate('/checkout');
      })
      .catch((err) => console.log('cart save err', err));
  };

  const saveCashOrderToDb = () => {
    dispatch(codActions.cashOnDelivery(true));

    // console.log('cart', JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        // console.log('Cart POST res', res);
        if (res.data.ok) navigate('/checkout');
      })
      .catch((err) => console.log('cart save err', err));
  };

  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Fotó</th>
          <th scope='col'>Név</th>
          <th scope='col'>Ár</th>
          <th scope='col'>Gyártó</th>
          <th scope='col'>Szín</th>
          <th scope='col'>Darab</th>
          <th scope='col'>Szállítás</th>
          <th scope='col'>Törlés</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((prod) => (
          <ProductCartInCheckout key={prod._id} product={prod} />
        ))}
      </tbody>
    </table>
  );
  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <h4>Kosár / {cart.length} termék</h4>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          {!cart.length ? (
            <p>
              Nincs termék a kosárban.{' '}
              <Link to='/shop'>Vásárlás folytatása</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-4'>
          <h4>Rendelés összefoglaló</h4>
          <hr />
          <p>Termékek</p>
          {cart.map((prod, index) => (
            <div key={index}>
              <p>
                {prod.title} x {prod.count} = {prod.price * prod.count} Ft
              </p>
            </div>
          ))}
          <hr />
          Összesen: <strong>{getTotal()} Ft</strong>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                disabled={!cart.length}
                className='btn btn-sm btn-primary mt-2 mb-3'
              >
                {' '}
                Tovább a fizetéshez
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                disabled={!cart.length}
                className='btn btn-sm btn-warning mt-2 '
              >
                {' '}
                Fizetés kézbesítéskor
              </button>
            </>
          ) : (
            <button className='btn btn-sm btn-primary mt-2'>
              {' '}
              <Link to='/login' state={{ from: '/cart' }}>
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
  applyCoupon,
} from '../functions/user';
import { cartActions } from '../store/cart';
import { codActions } from '../store/cod';
import { toast } from 'react-toastify';
import { createCashOrderForUser } from '../functions/user';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState();
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const { cod } = useSelector((state) => state.cod);
  const couponTrueOrFalse = useSelector((state) => state.cart.couponApplied);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log('user, cart', JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    // remove from redux
    dispatch(cartActions.addToCart([]));

    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon('');
      toast.success('A kosár üres. Vásárlás folytatása');
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) setAddressSaved(true);
      toast.success('Address saved');
    });
  };

  const applyDiscountCoupon = () => {
    console.log('send coupon to backend', coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log('RES On COUPON APPLIED', res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch(cartActions.couponApplied(true));
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
        dispatch(cartActions.couponApplied(false));
      }
    });
  };

  const showAddress = () => (
    <>
      <textarea
        name='address'
        type='textarea'
        rows='3'
        cols='50'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className='btn btn-rpimary mt-2' onClick={saveAddressToDb}>
        Mentés
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={' '}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError('');
        }}
        value={coupon}
        type='text'
        className='form-control'
      />
      <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
        Alkamaz
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, cod, couponTrueOrFalse).then((res) => {
      console.log('USER CASH ORDER CREATED', res);
      // empty cart from redux, localStorage, reset coupon, reset cod, redirect
      if (res.data.ok) {
        if (typeof window !== 'undefined') localStorage.removeItem('cart');

        dispatch(cartActions.addToCart([]));

        dispatch(cartActions.couponApplied(false));

        dispatch(codActions.cashOnDelivery(false));

        emptyUserCart(user.token);

        // eltelik egy kis idő ezért amikor redirect-et indítjuk várunk egy kicsit

        setTimeout(() => {
          navigate('/user/history');
        }, 1000);
      }
    });
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Szállítási cím</h4>
        <br />
        {showAddress()}
        <hr />
        <h4>Van kuponod?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className='bg-danger p-2'>{discountError}</p>}
      </div>

      <div className='col-md-6'>
        <h4>Megrendelés összesítő</h4>
        <hr />

        <p>Termékek {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Összesen: {total} Ft</p>

        {totalAfterDiscount > 0 && (
          <p className='bg-success p-2'>
            Kupon alkalmazása után fizetendő: {totalAfterDiscount} Ft
          </p>
        )}

        <div className='row'>
          <div className='col-md-6'>
            {cod ? (
              <button
                className='btn btn-primary'
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Place order
              </button>
            ) : (
              <button
                className='btn btn-primary'
                disabled={!addressSaved || !products.length}
                onClick={() => navigate('/payment')}
              >
                Place order
              </button>
            )}
          </div>
          <div className='col-md-6'>
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className='btn btn-primary'
            >
              Kosár törlése
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

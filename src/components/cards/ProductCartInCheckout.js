import laptop from '../../images/laptop.png';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import { toast } from 'react-toastify';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import ModalImage from 'react-modal-image';

const ProductCartInCheckout = ({ product }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((prod, index) => {
        if (prod._id === product._id) {
          cart[index].color = e.target.value;
        }
      });

      // console.log('updated cart color', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(cartActions.addToCart(cart));
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > product.quantity) {
      toast.error(`Max rendelhető mennyiség: ${product.quantity}`);
      count = product.quantity;
      return;
    }

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((prod, index) => {
        if (prod._id === product._id) {
          cart[index].count = count;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(cartActions.addToCart(cart));
    }
  };

  const handleRemove = () => {
    // remove from localstorage and redux
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((prod, index) => {
        if (prod._id === product._id) {
          cart.splice(index, 1);
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(cartActions.addToCart(cart));
    }
  };

  return (
    <tr>
      <td>
        <div style={{ width: '100px', height: 'auto' }}>
          {product.images.length ? (
            <ModalImage
              small={product.images[0].url}
              large={product.images[0].url}
              hideDownload={true}
              hideZoom={true}
            />
          ) : (
            <ModalImage
              small={laptop}
              large={laptop}
              hideDownload={true}
              hideZoom={true}
            />
          )}
        </div>
      </td>
      <td>{product.title}</td>
      <td>{product.price} Ft</td>
      <td>{product.brand}</td>
      <td>
        <select
          onChange={handleColorChange}
          name='color'
          className='form-control'
        >
          {product.color ? (
            <option value={product.color}>{product.color}</option>
          ) : (
            <option>Válassz</option>
          )}
          {colors
            .filter((c) => c !== product.color)
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          )
        </select>
      </td>
      <td>
        <input
          type='number'
          name='count'
          className='form-control'
          value={product.count}
          onChange={handleQuantityChange}
        />
      </td>
      <td className='text-center'>
        {product.shipping === 'Yes' ? (
          <CheckCircleOutlinedIcon className='text-success' />
        ) : (
          <CancelOutlinedIcon className='text-danger' />
        )}
      </td>
      <td className='text-center'>
        <DeleteOutlinedIcon
          style={{ cursor: 'pointer' }}
          className='text-danger'
          onClick={handleRemove}
        />
      </td>
    </tr>
  );
};

export default ProductCartInCheckout;

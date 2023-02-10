import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';
import { drawerActions } from '../../store/drawer';
import {
  EyeOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Card, Tooltip } from 'antd';
import { useState } from 'react';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug, price, quantity } = product;
  const [tooltip, setTooltip] = useState('Kattints a kosárba tevéshez');

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // show tooltip

    // create cart array
    let cart = [];

    if (typeof window !== 'undefined') {
      // if cart is in localstorage GET it, else create it
      if (localStorage.getItem('cart')) {
        // a JSON adatot átalakítjuk js objektummá
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates using lodash library
      let unique = _.uniqWith(cart, _.isEqual);

      // save to local storage but verify that there are no duplicates
      localStorage.setItem('cart', JSON.stringify(unique));
      setTooltip('Hozzáadva');

      dispatch(cartActions.addToCart(unique));
      dispatch(drawerActions.setVisible(true));
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center pt-1 pb-3'>Még nincs értékelés</div>
      )}
      <Card
        hoverable
        style={{ width: 300, objectFit: 'cover' }}
        cover={
          <img
            alt='example'
            src={images && images.length ? images[0].url : laptop}
            className='p-2'
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-primary' />
            <br /> Részletek
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={quantity < 1}>
              <ShoppingCartOutlined className='text-success' /> <br />
              {quantity < 1 ? 'Elfogyott' : 'Kosárba'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - ${price} Ft`}
          description={`${description && description.substring(0, 30)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;

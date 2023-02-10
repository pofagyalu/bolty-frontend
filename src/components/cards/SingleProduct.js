import Laptop from '../../images/laptop.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';
import { showAverage } from '../../functions/rating';
import RatingModal from '../modals/RatingModal';
import { Card, Tabs, Tooltip } from 'antd';
import {
  CartOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import _ from 'lodash';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';

const { TabPane } = Tabs;

// this is children compo of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState('Kattints a kosárba tevéshez');
  const { title, images, description, _id } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
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
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      // console.log('Added to wishlist', res.data);
      toast.success('Kívánságlistához adva');
      navigate('/user/wishlist');
    });
  };

  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img key={image.public_id} src={image.url} alt='product' />
              ))}
          </Carousel>
        ) : (
          <Card
            // hoverable
            cover={<img alt='example' src={Laptop} className='p-2' />}
          ></Card>
        )}

        <Tabs
          defaultActiveKey='1'
          type='card'
          size={3}
          items={[
            {
              label: 'Leírás',
              key: 1,
              children: `${description}`,
            },
            {
              label: 'Részletek',
              key: 2,
              children:
                'További információkért hívjon bennünket az XXXXX számon',
            },
            {
              label: 'Értékelések',
              key: 3,
              children: 'Bazi nagy görög lagzi',
            },
          ]}
        />
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className='text-center pt-1 pb-3'>Még nincs értékelés</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className='text-success' /> <br /> Kosárba
              </a>
            </Tooltip>,

            <a onClick={handleAddToWishlist}>
              <HeartOutlined className='text-info' /> <br /> Kedvencekhez
            </a>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='red'
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
  //
};

export default SingleProduct;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';
import { getProduct, productStar, getRelated } from '../functions/product';

const Product = () => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  const { slug } = useParams();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (element) => element.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // ha van már értékelés akkor state-be tesszük
    }
  }, []);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);

    productStar(name, newRating, user.token).then((res) => {
      // console.log('Rating clicked', res.data);
      loadSingleProduct(); // ha akarod a frissített rating-et látni azonnal
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className='row p-5'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Kapcsolódó termékek</h4>
          <hr />
        </div>
      </div>
      <div className='row mb-3'>
        {related.length ? (
          related.map((related) => (
            <div key={related._id} className='col-md-4'>
              <ProductCard product={related} />
            </div>
          ))
        ) : (
          <div className='text-center col'>Nincs kapcsolódó termék</div>
        )}
      </div>
    </div>
  );
};

export default Product;

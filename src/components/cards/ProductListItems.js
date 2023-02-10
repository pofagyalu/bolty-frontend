import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
  const { price, category, shipping, subs, color, brand, sold, quantity } =
    product;
  return (
    <ul className='list-group'>
      <li className='list-group-item d-flex justify-content-between align-items-center'>
        Ár
        <span className='label label-default label-pill pull-xs-right'>
          {price} Ft
        </span>
      </li>

      {category && (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Kategória
          <Link
            to={`/category/${category.slug}`}
            className='label label-default label-pill pull-xs-right'
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Alkategóriák
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className='label label-default label-pill pull-xs-right'
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className='list-group-item d-flex justify-content-between align-items-center'>
        Szállítás
        <span className='label label-default label-pill pull-xs-right'>
          {shipping}
        </span>
      </li>

      <li className='list-group-item d-flex justify-content-between align-items-center'>
        Szín
        <span className='label label-default label-pill pull-xs-right'>
          {color}
        </span>
      </li>

      <li className='list-group-item d-flex justify-content-between align-items-center'>
        Gyártó
        <span className='label label-default label-pill pull-xs-right'>
          {brand}
        </span>
      </li>

      <li className='list-group-item d-flex justify-content-between align-items-center'>
        Raktáron
        <span className='label label-default label-pill pull-xs-right'>
          {quantity} db
        </span>
      </li>

      <li className='list-group-item d-flex justify-content-between align-items-center'>
        Eladva
        <span className='label label-default label-pill pull-xs-right'>
          {sold} db
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;

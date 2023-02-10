import { getStatusClassNames } from 'antd/lib/_util/statusUtils';
import { Link } from 'react-router-dom';

const AdminNavigation = () => {
  return (
    <nav className='navbar d-flex flex-column flex-shrink-0 p-3'>
      <ul className='nav nav-pills flex-column mb-auto'>
        <li className='nav-item'>
          <Link to='/admin/dashboard' className='nav-link'>
            Vezérlőpult
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/product' className='nav-link'>
            Új termék
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/products' className='nav-link'>
            Termékek
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/category' className='nav-link'>
            Kategóriák
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/sub' className='nav-link'>
            Alkategóriák
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/admin/coupon' className='nav-link'>
            Kupon
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/user/password' className='nav-link'>
            Jelszó
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;

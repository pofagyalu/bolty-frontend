import { Link } from 'react-router-dom';

// import classes from './UserNavigation.module.css';

const UserNavigation = () => {
  return (
    <nav>
      <ul className='nav nav-pills flex-column mb-auto'>
        <li className='nav-item'>
          <Link to='/user/history' className='nav-link'>
            Előzmények
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/user/password' className='nav-link'>
            Jelszó
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/user/wishlist' className='nav-link'>
            Kívánságlista
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavigation;

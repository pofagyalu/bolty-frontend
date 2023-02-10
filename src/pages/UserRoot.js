import { Outlet } from 'react-router-dom';
import UserNavigation from '../components/nav/UserNavigation';

// import classes from './UserRoot.module.css';

const UserRootLayout = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='sidebar col-md-3'>
          <UserNavigation />
        </div>
        <div className='content col-md-9'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserRootLayout;

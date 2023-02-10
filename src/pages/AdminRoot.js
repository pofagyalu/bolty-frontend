import { Outlet } from 'react-router-dom';
import AdminNavigation from '../components/nav/AdminNavigation';

// import classes from './UserRoot.module.css';

const AdminRootLayout = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='sidebar col-md-3'>
          <AdminNavigation />
        </div>
        <div className='content col-md-9'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRootLayout;

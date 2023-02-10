import { useSelector } from 'react-redux';
import { Route, Link } from 'react-router-dom';

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => state.user);

  return user && user.token ? (
    <Route {...rest} render={() => children}></Route>
  ) : (
    <h1 className='text-danger'>Loading...</h1>
  );
};

export default UserRoute;

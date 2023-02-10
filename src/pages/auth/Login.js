import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { toast } from 'react-toastify';

import { createOrUpdateUser } from '../../functions/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    let intended = location.state;

    if (intended) return;

    if (user && user.token) {
      navigate('/');
    }
  }, [user]);

  const roleBasedRedirect = (res) => {
    // check if intended, a wishlist-tel összefüggő beállítás
    let intended = location.state;

    if (intended) {
      navigate(intended.from);
    } else {
      if (res.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/history');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.table(email, password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch(
            userActions.login({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            })
          );
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch(
            userActions.login({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            })
          );
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control mb-3'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email cím'
        autoFocus
      />

      <input
        type='password'
        className='form-control mb-3'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='jelszó'
      />

      <Button
        onClick={handleSubmit}
        type='primary'
        block
        className='mb-3'
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
        Bejelentkezés email/jelszó használatával
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {!isLoading ? (
            <h4>Bejelentkezés</h4>
          ) : (
            <h4 className='text-danger'>Betöltés</h4>
          )}

          {loginForm()}

          <Button
            onClick={googleLogin}
            type='primary'
            danger
            block
            className='mb-3'
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
          >
            Bejelentkezés Google azonosítással
          </Button>

          <Link to='/forgot/password' className='float-right text-danger'>
            Elfelejtettem a jelszavam
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

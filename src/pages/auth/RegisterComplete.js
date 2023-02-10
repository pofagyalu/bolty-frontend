import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailLink, updatePassword } from 'firebase/auth';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';

import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const email = window.localStorage.getItem('emailForRegistration');
    if (email) {
      setEmail(email);
    }
  }, []);

  // props.history
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!email || !password) {
      toast.error('Email és jelszó nem lehet üres!');
      return;
    }

    if (password.length < 6) {
      toast.error('A jelszó hossza min. 6 karakter');
      return;
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove from localstorage
        window.localStorage.removeItem('emailForRegistration');

        // get user id token
        let user = auth.currentUser;
        await updatePassword(user, password);

        const idTokenResult = await user.getIdTokenResult();

        //redux store, majd később
        console.log('user', user, 'idTokenresult', idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) =>
            dispatch(
              userActions.login({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            )
          )
          .catch((err) => console.log(err));

        //redirect
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type='email' className='form-control' value={email} disabled />
      <input
        type='password'
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Jelszó'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Regisztráció véglegesítés
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Regisztráció befejezése</h4>

          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;

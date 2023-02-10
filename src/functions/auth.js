import axios from 'axios';
import { redirect } from 'react-router-dom';

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export function checkAuthLoader() {
  // const token = getAuthToken();
  // if (!token) {
  //   return redirect('/login');
  // }
}

export function checkAdminLoader() {
  // const token = getAuthToken();
  // if (!token) {
  //   return redirect('/login');
  // }
}

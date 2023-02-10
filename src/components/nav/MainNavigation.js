import React, { useState } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import Search from '../forms/Search';
import { Menu, Badge } from 'antd';

import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import 'antd/dist/antd.min.css';

import cart from '../../store/cart';
const { Item, SubMenu } = Menu;

const MainNavigation = () => {
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.cart.products);

  const logout = () => {
    signOut(auth);
    dispatch(userActions.logout());
    navigate('/');
  };

  const handleClick = ({ key }) => {
    setCurrent(key);
  };

  return (
    <header>
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
        <Item key='home' icon={<GridViewOutlinedIcon />}>
          <NavLink to='/' end>
            Főoldal
          </NavLink>
        </Item>

        <Item key='shop' icon={<StorefrontOutlinedIcon />}>
          <NavLink to='/shop' end>
            Bolt
          </NavLink>
        </Item>

        <Item key='cart' icon={<ShoppingCartOutlinedIcon />}>
          <NavLink to='/cart' end>
            <Badge
              count={products.length}
              offset={[55, -10]}
              color='text-danger'
            ></Badge>
            Kosár
          </NavLink>
        </Item>

        <Item key='search' className='float-end'>
          <Search />
        </Item>

        {!user && (
          <Item
            key='register'
            icon={<PersonAddOutlinedIcon />}
            className='float-end'
          >
            <NavLink to='/register'>Regisztráció</NavLink>
          </Item>
        )}

        {!user && (
          <Item key='login' icon={<PersonOutlinedIcon />} className='float-end'>
            <NavLink to='/login'>Bejelentkezés</NavLink>
          </Item>
        )}

        {user && (
          <SubMenu
            key='profile'
            icon={<SettingsOutlinedIcon />}
            title={user.email && user.email.split('@')[0]}
            className='float-end'
          >
            {user && user.role === 'subscriber' && (
              <Item key='user'>
                <Link to='/user/history'>Dashboard</Link>
              </Item>
            )}
            {user && user.role === 'admin' && (
              <Item key='admin'>
                <Link to='/admin/dashboard'>Dashboard</Link>
              </Item>
            )}
            <Item
              key='logout'
              icon={<LogoutOutlinedIcon />}
              onClick={logout}
              danger
            >
              Kijelentkezés
            </Item>
          </SubMenu>
        )}
      </Menu>
    </header>
  );
};

export default MainNavigation;

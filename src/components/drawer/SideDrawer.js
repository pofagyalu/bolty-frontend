import React from 'react';
import { useState } from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';
import { drawerActions } from '../../store/drawer';

const SideDrawer = () => {
  const dispatch = useDispatch();

  const drawer = useSelector((state) => state.drawer.isVisible);
  const products = useSelector((state) => state.cart.products);

  const onClose = () => {
    dispatch(drawerActions.setVisible(false));
  };

  const imageStyle = {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
  };

  return (
    <Drawer
      className='text-center'
      title={`Kosár / ${products.length} termék`}
      open={drawer}
      onClose={onClose}
    >
      {products.map((prod) => (
        <div key={prod._id} className='row'>
          <div className='col'>
            <>
              {prod.images[0] ? (
                <img
                  src={prod.images[0].url}
                  alt={prod.title}
                  style={imageStyle}
                />
              ) : (
                <img src={laptop} alt={prod.title} style={imageStyle} />
              )}
              <p className='text-center bg-secondary text-light'>
                {prod.title} x {prod.count}
              </p>
            </>
          </div>
        </div>
      ))}

      <Button onClick={onClose} className='text-center btn btn-primary '>
        Kosár tartalma
      </Button>
    </Drawer>
  );
};

export default SideDrawer;

import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/commerce.png'


import useStyles from './NavBarstyles';

const Navbar = ({totalItems}) => {

    const classes = useStyles();
    const location = useLocation();

    

// ==============================
  return (

    <>

        <AppBar position='fixed' className={classes.appBar} color="inherit">

            <Toolbar>
                <Typography component={Link} to="/" varaint='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt="commerce.js" height="25px" className={classes.image}/>
                    Siggmaa
                </Typography>

                <div className={classes.grow}/>

                {location.pathname === '/' && (
                <div className={classes.button}>
                    <IconButton component={Link} to="/cart" aria-label='show cart items' color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>

                </div>)}

            </Toolbar>

        </AppBar>

    </>

  )
}

export default Navbar
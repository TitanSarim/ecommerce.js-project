import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'
import {Navbar, Products, Cart, Checkout} from './components'


const App = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder]  = useState({});
    const [errorMessage, setErrorMessage] = useState('');


// fetch products
    const fetchProducts = async () =>{

        const { data } = await commerce.products.list();

        setProducts(data);
    }

  //  add products to cart
  const fetchCart = async () => {

    setCart(await commerce.cart.retrieve());

  };
//  adding things
    const handleAddToCart = async (productId, quantity) =>{

      const {cart}= await commerce.cart.add(productId, quantity);

      setCart(cart);

    }

// updating things

    const handleUpdateCartQty = async (productId, quantity) => {

      const {cart} = await commerce.cart.update(productId, {quantity});

      setCart(cart)

    } 

// removing things
    const handleRemoveFromCart = async (productId) => {

      const {cart} = await commerce.cart.remove(productId)
      setCart(cart)
    }

// empty cart
    const handleEmptyCart = async() =>{
      const{cart} = await commerce.cart.empty();
      setCart(cart);
    }
// refresh cart

    const refreshCart = async() =>{
      const newCart = await commerce.cart.refresh();
      setCart(newCart)
    }

// capture data

    const handleCaptureCheckout = async (CheckoutTokenId, newOrder) =>{

      try {

        const incommingOrder = await commerce.capture(CheckoutTokenId, newOrder);

        setOrder(incommingOrder);
        refreshCart();
        
      } catch (error) {
          setErrorMessage(error.data.error.message);
      }

    } 

    useEffect(() =>{
        
        fetchProducts();
        fetchCart();

    }, [])


// =================================
  return (
    <Router>
      <div>
          <Navbar totalItems={cart.total_items} />

          <Routes>

            <Route exact path='/'
                  element = {<Products products={products} onAddtoCart={handleAddToCart}/>}
            />
            

            <Route exact path='/cart'
                 element = { 
                 
                 <Cart cart={cart}
                 handleUpdateCartQty = {handleUpdateCartQty}
                 handleRemoveFromCart = {handleRemoveFromCart}
                 handleEmptyCart = {handleEmptyCart}
                 />} 
            />

            <Route exact path='/checkout' element={<Checkout 
                                                           cart={cart}
                                                           order={order}
                                                           onCaptureCheckOut={handleCaptureCheckout}
                                                           error={errorMessage}
                                                           />}/>
          
            
          </Routes>
      </div>
    </Router>
  )
}

export default App
import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core'

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import useStyles from './Styles';

const steps = ['Shipping address', 'Payment details'];

//===========================================================================
//===========================================================================
//==========================================================================

const Checkout = ({cart, order, onCaptureCheckOut, error}) => {

  // style 
  const classes = useStyles();



  // Steps of payments
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const history = useNavigate ();
  

  // token=================================================================================

  useEffect(()=>{

    const generateToken = async() =>{
      try{
          const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
          setCheckoutToken(token);

      }catch(error){
          history.pushState('/')
      }
    }

    generateToken();

  }, [cart]); 

  // ==========================

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // ===================================
  const next = (data) =>{
    setShippingData(data);
  }


  // ==================================
  const Confirmation = () =>(

    <div>
      Confirmation
    </div>

  )


  // logic in check our forms
  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep}/>
    : <PaymentForm shippingData={shippingData} nextStep={nextStep} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckOut={onCaptureCheckOut}/>

  
//============================================================================== 

  return (
    

    <>
    <CssBaseline/>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">CheckOut</Typography>
            <Stepper activeStep={0} className={classes.stepper}>

              {steps.map((step) =>(
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}

            </Stepper>

                {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }

          </Paper>
        </main>

        
    </>


  )
}

export default Checkout
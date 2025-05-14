import React, { useState } from 'react';
import axios from 'axios';
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51RKFAJBSzAuYlWdbDtQkTbYqu3mwqxLhOE94KpxmLDMIX01Fnjg5TKcjxt6ERLzgiw64DgEAbiPzWnwLdMeZV8Q500G6MLt1zF');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart(); 

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
  
    if (!cartItems || cartItems.length === 0) {
      setMessage("Your cart is empty.");
      setProcessing(false);
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:3000/process-payment', {
        paymentMethod,
        cartItems
      });
  
      if (paymentMethod === 'cod') {
        setMessage(res.data.message);
      } else {
        const { clientSecret } = res.data;
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
  
        if (result.error) {
          setMessage(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
          setMessage('Payment successful! Order placed.');
        }
      }
  
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong.');
    }
  
    setProcessing(false);
  };

  return (
    <div className="container mt-4">
      <h3>Choose Payment Method</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handlePayment}>
        <div className="form-check">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            className="form-check-input"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Cash on Delivery</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            className="form-check-input"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Credit/Debit Card</label>
        </div>

        {paymentMethod === 'card' && (
          <div className="my-3">
            <CardElement />
          </div>
        )}

        <button className="btn btn-primary" type="submit" disabled={processing}>
          {processing ? 'Processing...' : 'Confirm Payment'}
        </button>
      </form>
    </div>
  );
};

// Wrap with Stripe Elements
const ProcessPayment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default ProcessPayment;
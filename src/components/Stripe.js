import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51ICFMDCJh48L0M91LcpLLqnG895c9gQydCsdE1auAYJTqNhbskPhk4ULxKoDeuniL5BEADGKBAKbkpEPxRZyx1A600wtU2xF1J");

const ProductDisplay = ({ handleClick }) => (
  <section>
    <button type="button" id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App({cart}) {
  const [message, setMessage] = useState("");

  console.log("cart passed into stripe:", cart);
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({totalCart: cart}),
      headers: { 'Content-type': 'application/json' }
    
    });

    console.log(response)
    const session = await response.json();
    console.log(session)

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
     throw result.error.message
    }
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RNGMP4hNggOi4I3bWEYWqxGDeB6xTzjLkRNxJi8Z6BBSDgIgmeyj4UXVO6CSloHlNDmENew5hU6V9kG6sn8ys5K00lWZvcrzc"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);

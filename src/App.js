import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./7-Views/Home";
import Payment from "./7-Views/Payment";
import PaymentResponse from "./7-Views/PaymentResponse";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/pay-response" element={<PaymentResponse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

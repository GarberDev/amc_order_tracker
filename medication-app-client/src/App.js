import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrderList from "./components/OrderList";
// Uncomment and import the DoctorsApproval component once it's ready to be used
// import DoctorsApproval from "./components/DoctorsApproval";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/orderlist" element={<OrderList />} />
          {/* Once DoctorsApproval is ready, uncomment and use it like below */}
          {/* <Route path="/doctorsapproval" element={<DoctorsApproval />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

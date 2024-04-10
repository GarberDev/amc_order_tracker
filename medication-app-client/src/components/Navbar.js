import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@material-ui/core";

const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Navigate based on tab value
    switch (newValue) {
      case 0:
        navigate("/orderlist");
        break;
      case 1:
        navigate("/doctorsapproval");
        break;
      default:
        break;
    }
  };

  return (
    <nav style={{ display: "flex", justifyContent: "center" }}>
      <Tabs value={value} onChange={handleChange} aria-label="Navigation Tabs">
        <Tab label="Order List" />
        <Tab label="Doctor's Approval" />
      </Tabs>
    </nav>
  );
};

export default Navbar;

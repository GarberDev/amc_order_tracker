import React, { useState } from "react";
import { createMedication } from "../api/MedicationListApi";
import { Button } from "@material-ui/core";
import { Toaster, toast } from "react-hot-toast";

const CreateMedicationForm = ({ onNewMedication }) => {
  const [medicationName, setMedicationName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [personEntered, setPersonEntered] = useState("");
  const [backordered, setBackordered] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Assuming you have state variables for each form field:
    const newMedData = {
      medication_name: medicationName,
      person_entered: personEntered,
      backordered: backordered,
      quantity: quantity,
    };
    onNewMedication(newMedData);
    window.location.reload();
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        width: "80",
        padding: "5px",
      }}
    >
      <Toaster />
      <div style={{ flex: 2 }}>
        <label htmlFor="medicationName">Medication Name:</label>
        <input
          id="medicationName"
          type="text"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
          required
          style={{ width: "100%", marginLeft: "10px" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          style={{ width: "100%", marginLeft: "10px" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="personEntered">Person Entered:</label>
        <input
          id="personEntered"
          type="text"
          value={personEntered}
          onChange={(e) => setPersonEntered(e.target.value)}
          required
          style={{ width: "100%", marginLeft: "10px" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="backordered" style={{ marginRight: "10px" }}>
          Backordered:
        </label>

        <input
          id="backordered"
          type="checkbox"
          checked={backordered}
          onChange={(e) => setBackordered(e.target.checked)}
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        Add Medication
      </Button>
    </form>
  );
};

export default CreateMedicationForm;

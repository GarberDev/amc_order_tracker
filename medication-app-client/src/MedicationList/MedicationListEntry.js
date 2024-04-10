import React from "react";
import { deleteMedication } from "../api/MedicationListApi";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { toDateTime } from "../base/helpers";
const MedicationListEntry = ({ medication, onStatusChange, onDelete }) => {
  const updateStatus = (newStatus) => {
    const updatedMedication = { ...medication, medication_status: newStatus };
    onStatusChange(updatedMedication);
  };

  const handleDelete = async () => {
    try {
      await deleteMedication(medication.id);
      onDelete(medication.id);
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  return (
    <TableRow>
      <TableCell>{medication?.medication_name}</TableCell>
      <TableCell>{medication?.quantity}</TableCell>
      <TableCell>{medication?.person_entered}</TableCell>
      <TableCell>
        {medication?.date_entered ? toDateTime(medication.date_entered) : "N/A"}
      </TableCell>
      <TableCell>{medication?.backordered ? "Yes" : "No"}</TableCell>
      <TableCell>
        {medication.medication_status !== "to_be_ordered" && (
          <Button size="small" onClick={() => updateStatus("to_be_ordered")}>
            To Be Ordered
          </Button>
        )}
        {medication.medication_status !== "on_order" && (
          <Button size="small" onClick={() => updateStatus("on_order")}>
            On Order
          </Button>
        )}
        {medication.medication_status !== "received" && (
          <Button size="small" onClick={() => updateStatus("received")}>
            Received
          </Button>
        )}
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MedicationListEntry;

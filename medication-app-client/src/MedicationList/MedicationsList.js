import React, { useState, useEffect } from "react"; // Import useState and useEffect
import MedicationListEntry from "./MedicationListEntry";
import { fetchMedications } from "../api/MedicationListApi"; // Adjust the path as necessary
import { toast } from "react-hot-toast";

const MedicationLists = ({ onStatusChange }) => {
  const [medications, setMedications] = useState([]); // Define state inside the component
  const [loading, setLoading] = useState(true); // Define loading state if needed

  const handleStatusChange = (updatedMedication) => {
    // Update the medication list with the updated medication status
    setMedications(
      medications.map((med) => {
        if (med.id === updatedMedication.id) {
          return updatedMedication;
        }
        return med;
      })
    );
    toast.success("Medication status updated successfully!");
  };

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const meds = await fetchMedications();
        setMedications(meds);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch medications:", error);
        setLoading(false); // Ensure loading is set to false even if there's an error
      }
    };
    loadMedications();
  }, []);

  const handleDelete = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
    toast.success("Medication deleted successfully!");
  };

  const filterByStatus = (status) =>
    medications.filter((med) => med.medication_status === status);

  if (loading) return <div>Loading...</div>; // Handle loading state

  return (
    <div style={{}}>
      <h2>To Be Ordered</h2>
      {filterByStatus("to_be_ordered").map((medication) => (
        <MedicationListEntry
          key={medication.id}
          medication={medication}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}

      <h2>On Order</h2>
      {filterByStatus("on_order").map((medication) => (
        <MedicationListEntry
          key={medication.id}
          medication={medication}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}

      <h2>Received</h2>
      {filterByStatus("received").map((medication) => (
        <MedicationListEntry
          key={medication.id}
          medication={medication}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MedicationLists;

import React, { useState, useEffect } from "react";
import CreateMedicationForm from "../MedicationList/CreateMedicationsForm";
import MedicationLists from "../MedicationList/MedicationsList";
import { fetchMedications, createMedication } from "../api/MedicationListApi"; // Ensure correct import
import { toast } from "react-hot-toast";
// Import MUI components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";

const OrderList = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshMedications();
  }, []);

  const refreshMedications = async () => {
    setLoading(true);
    try {
      const meds = await fetchMedications();
      setMedications(meds);
    } catch (error) {
      console.error("Failed to fetch medications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMedication = async (newMedData) => {
    try {
      const addedMedication = await createMedication(newMedData); // This should return the newly added medication object
      toast.success("Medication added successfully!");
      setMedications((currentMeds) => [addedMedication, ...currentMeds]);
    } catch (error) {
      console.error("Error adding medication:", error);
      toast.error("Failed to add medication.");
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 5, mb: 2 }}>
        <CardContent>
          {/* Show a loading spinner when data is being fetched */}
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              <CreateMedicationForm onNewMedication={handleNewMedication} />
              <MedicationLists medications={medications} loading={loading} />
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderList;

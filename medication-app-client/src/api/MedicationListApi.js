import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export const fetchMedications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/medications`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch medications:", error);
    throw error;
  }
};
export const createMedication = async (medicationData) => {
  if (!medicationData.medication_name || medicationData.quantity == null) {
    console.error("Incomplete medication data:", medicationData);
    throw new Error("Incomplete medication data");
  }
  try {
    const response = await axios.post(
      `${API_BASE_URL}/medications`,
      medicationData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create medication:", error);
    throw error;
  }
};

export const updateMedicationStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/medications/${id}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update medication status:", error);
    throw error;
  }
};

export const deleteMedication = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/medications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete medication:", error);
    throw error;
  }
};

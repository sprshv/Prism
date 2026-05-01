// API functions for user management

const API_BASE_URL = "http://localhost:8000";

export const updateUserRole = async (email, role, token) => {
  try {
    console.log(`Updating ${email} role to ${role}...`);
    
    const response = await fetch(`${API_BASE_URL}/users/role/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ email, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Failed to update role: ${response.status}`);
    }

    const data = await response.json();
    console.log("Role updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

import { API_URL } from './config';

// Get all applications (admin/executive/president only)
export const getApplications = async (token) => {
  console.log('getApplications called with token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
  if (!token) {
    throw new Error('No authentication token provided');
  }
  
  const response = await fetch(`${API_URL}/applications/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('Applications fetch response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Applications fetch error response:', errorText);
    throw new Error(`Failed to fetch applications: ${response.status} ${errorText}`);
  }
  return response.json();
};

// Get single application details
export const getApplicationDetail = async (applicationId, token) => {
  const response = await fetch(`${API_URL}/applications/${applicationId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch application details');
  return response.json();
};

// Track application (public - no auth needed)
export const trackApplication = async (token) => {
  const response = await fetch(`${API_URL}/applications/track/${token}`);
  if (!response.ok) throw new Error('Application not found');
  return response.json();
};

// Accept application (creates user account and sends email)
export const acceptApplication = async (applicationId, token) => {
  console.log('acceptApplication called with ID:', applicationId, 'Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
  
  const response = await fetch(`${API_URL}/applications/${applicationId}/accept`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('Accept response status:', response.status);
  const responseText = await response.text();
  console.log('Accept response body:', responseText);
  
  if (!response.ok) {
    throw new Error(`Failed to accept application: ${response.status} ${responseText}`);
  }
  
  try {
    return JSON.parse(responseText);
  } catch (e) {
    return { message: 'Application accepted' };
  }
};

// Reject application (sends rejection email)
export const rejectApplication = async (applicationId, token) => {
  console.log('rejectApplication called with ID:', applicationId, 'Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
  
  const response = await fetch(`${API_URL}/applications/${applicationId}/reject`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('Reject response status:', response.status);
  const responseText = await response.text();
  console.log('Reject response body:', responseText);
  
  if (!response.ok) {
    throw new Error(`Failed to reject application: ${response.status} ${responseText}`);
  }
  
  try {
    return JSON.parse(responseText);
  } catch (e) {
    return { message: 'Application rejected' };
  }
};

// Delete an application
export const deleteApplication = async (applicationId, token) => {
  console.log('deleteApplication called with ID:', applicationId, 'Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
  
  const response = await fetch(`${API_URL}/applications/${applicationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('Delete response status:', response.status);
  const responseText = await response.text();
  console.log('Delete response body:', responseText);
  
  if (!response.ok) {
    throw new Error(`Failed to delete application: ${response.status} ${responseText}`);
  }
  
  try {
    return JSON.parse(responseText);
  } catch (e) {
    return { message: 'Application deleted' };
  }
};

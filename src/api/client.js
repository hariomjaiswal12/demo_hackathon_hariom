const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function apiClient(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem('deskdrop_token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const contentType = response.headers.get('content-type');
    
    let result = {};
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = { message: await response.text() };
    }

    if (!response.ok) {
      const error = new Error(result.message || 'API request failed');
      error.status = response.status;
      error.conflict = result.conflict || response.status === 409;
      error.errors = result.errors || [];
      throw error;
    }

    return result;
  } catch (error) {
    if (!error.status) {
      error.message = 'Unable to connect to DeskDrop API server. Please check backend connection.';
      error.isNetworkError = true;
    }
    throw error;
  }
}

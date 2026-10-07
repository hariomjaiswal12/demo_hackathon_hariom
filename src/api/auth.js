import { apiClient } from './client.js';

export async function registerUserApi(userData) {
  return apiClient('/auth/register', {
    method: 'POST',
    body: userData,
  });
}

export async function loginUserApi(credentials) {
  return apiClient('/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export async function fetchMeApi() {
  return apiClient('/auth/me', {
    method: 'GET',
  });
}

import { apiClient } from './client.js';

export async function fetchResources(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/resources?${query}` : '/resources';
  return apiClient(endpoint, { method: 'GET' });
}

export async function fetchResourceById(id) {
  return apiClient(`/resources/${id}`, { method: 'GET' });
}

export async function createResource(resourceData) {
  return apiClient('/resources', {
    method: 'POST',
    body: resourceData,
  });
}

export async function updateResource(id, updateData) {
  return apiClient(`/resources/${id}`, {
    method: 'PATCH',
    body: updateData,
  });
}

export async function deleteResource(id) {
  return apiClient(`/resources/${id}`, { method: 'DELETE' });
}

export async function fetchResourceAvailability(id, start, end) {
  const params = new URLSearchParams();
  if (start) params.append('start', start);
  if (end) params.append('end', end);
  const query = params.toString();
  return apiClient(`/resources/${id}/availability${query ? `?${query}` : ''}`, { method: 'GET' });
}

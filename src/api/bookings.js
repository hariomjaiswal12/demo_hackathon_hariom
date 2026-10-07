import { apiClient } from './client.js';

export async function fetchBookings(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/bookings?${query}` : '/bookings';
  return apiClient(endpoint, { method: 'GET' });
}

export async function fetchBookingById(id) {
  return apiClient(`/bookings/${id}`, { method: 'GET' });
}

export async function createBooking(bookingData) {
  return apiClient('/bookings', {
    method: 'POST',
    body: bookingData,
  });
}

export async function updateBooking(id, updateData) {
  return apiClient(`/bookings/${id}`, {
    method: 'PATCH',
    body: updateData,
  });
}

export async function cancelBooking(id) {
  return apiClient(`/bookings/${id}/cancel`, { method: 'POST' });
}

export async function checkInBookingApi(id) {
  return apiClient(`/bookings/${id}/check-in`, { method: 'POST' });
}

export async function endBookingApi(id) {
  return apiClient(`/bookings/${id}/end`, { method: 'POST' });
}

export async function cancelBookingApi(id) {
  return apiClient(`/bookings/${id}/cancel`, { method: 'POST' });
}

export async function extendBookingApi(id, endTime) {
  return apiClient(`/bookings/${id}/extend`, {
    method: 'POST',
    body: { endTime },
  });
}


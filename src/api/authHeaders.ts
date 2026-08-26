// src/api/authHeaders.ts

export function getAuthHeaders() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');

  return {
    Authorization: `Bearer ${accessToken}`,
    'X-Noroff-API-Key': apiKey || '',
  };
}

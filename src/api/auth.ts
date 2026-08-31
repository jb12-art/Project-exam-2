// src/api/auth.ts

const API_URL = 'https://v2.api.noroff.dev';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
}

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Registration failed');
  }

  return json.data;
}

export async function loginUser(data: LoginData): Promise<User> {
  const response = await fetch(`${API_URL}/auth/login?_holidaze=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Login failed');
  }

  return json.data;
}

export async function createApiKey(accessToken: string) {
  const response = await fetch(
    'https://v2.api.noroff.dev/auth/create-api-key',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || 'Failed to create API key');
  }

  return json.data;
}

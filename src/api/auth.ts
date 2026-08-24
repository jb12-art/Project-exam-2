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

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/auth/resgister`, {
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

export async function loginUser(data: LoginData) {
  const response = await fetch(`${API_URL}/auth/login`, {
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

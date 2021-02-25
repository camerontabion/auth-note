const baseUrl = '/api/auth';

const signup = async (userData) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

const login = async (userInfo) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  return res.json();
};

const logout = async () => {
  const res = await fetch(`${baseUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
};

const authenticate = async () => {
  const res = await fetch(baseUrl, { credentials: 'include' });

  return res.json();
};

export default {
  signup, login, logout, authenticate,
};

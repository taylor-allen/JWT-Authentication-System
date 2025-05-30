const signup = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return { data, status: response.status, ok: response.ok };
};

const login = async (email, password) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.access_token);
  }
  return { data, status: response.status, ok: response.ok };
};

const getToken = () => {
  return localStorage.getItem("token");
};

const logout = () => {
  localStorage.removeItem("token");
};

const protectedRoute = async () => {
  const token = getToken();
  if (!token) {
    return { message: "No token found", status: 401, ok: false };
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/protected`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return { data, status: response.status, ok: response.ok };
};

export { signup, login, getToken, logout, protectedRoute };

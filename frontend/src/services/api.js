/**
 * API service layer — swap BASE_URL and remove mock responses
 * when the Spring Boot backend is ready.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://172.20.10.5:8080/api';
async function request(method, path, body = null) {
  const token = localStorage.getItem('token');
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error('Unable to connect to the backend server. Please check your connection.');
  }

  if (!res.ok) {
    let errorMsg = '';
    try {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        errorMsg = json.message || json.error;
      } catch {
        errorMsg = text;
      }
    } catch {
      errorMsg = '';
    }

    if (res.status === 401 || res.status === 403 || !errorMsg || errorMsg.includes('status') || errorMsg.includes('Forbidden') || errorMsg.startsWith('<!')) {
      errorMsg = 'Invalid email or password. Please check your credentials and try again.';
    }

    throw new Error(errorMsg);
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

// Auth
export const authApi = {
  login: (email, password) => request('POST', '/auth/login', { email, password }),
  register: (fullName, email, password) => request('POST', '/auth/register', { fullName, email, password }),
};

// Transactions
export const transactionsApi = {
  getAll: (params) => request('GET', params && Object.keys(params).length ? `/transactions?${new URLSearchParams(params)}` : '/transactions'),
  create: (data) => request('POST', '/transactions', data),
  update: (id, data) => request('PUT', `/transactions/${id}`, data),
  delete: (id) => request('DELETE', `/transactions/${id}`),
};

// Dashboard
export const dashboardApi = {
  getSummary: () => request('GET', '/dashboard'),
  getMonthlyOverview: () => request('GET', '/dashboard/monthly'),
  getCategorySpending: () => request('GET', '/dashboard/categories'),
};

// Analytics
export const analyticsApi = {
  get: (range) => request('GET', `/analytics?range=${range}`),
};

// Budgets
export const budgetsApi = {
  getAll: () => request('GET', '/budgets'),
  create: (data) => request('POST', '/budgets', data),
  update: (id, data) => request('PUT', `/budgets/${id}`, data),
  delete: (id) => request('DELETE', `/budgets/${id}`),
};

// Goals
export const goalsApi = {
  getAll: () => request('GET', '/goals'),
  create: (data) => request('POST', '/goals', data),
  update: (id, data) => request('PUT', `/goals/${id}`, data),
  delete: (id) => request('DELETE', `/goals/${id}`),
};

// User / Profile
export const userApi = {
  getProfile: () => request('GET', '/users/me'),
  updateProfile: (data) => request('PUT', '/users/me', data),
};

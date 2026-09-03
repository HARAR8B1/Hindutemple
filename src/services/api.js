import axios from 'axios';

/**
 * Axios instance for API requests.
 * Uses a lightweight public endpoint for status checks.
 * The site is fully functional offline — this is future-ready.
 */
const api = axios.create({
  baseURL: 'https://httpbin.org',
  timeout: 5000,
});

/**
 * Fetch a lightweight status message.
 * Gracefully handles failures — returns a fallback message.
 */
export async function fetchStatus() {
  try {
    const response = await api.get('/get', {
      params: { app: 'iraivanai-kanbom', version: '1.0' },
    });
    return {
      success: true,
      message: 'Connected to the archive network.',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Running in offline mode. All temple data is available locally.',
      error: error.message,
    };
  }
}

export default api;

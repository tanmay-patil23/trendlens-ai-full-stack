import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8001';

// Create axios instances
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiClient = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const trendAPI = {
  getRealTimeTrends: (params = {}) => 
    apiClient.get('/api/trends/realtime', { params }),

  analyzeKeywords: (keywords, platform = 'all') => 
    apiClient.post('/api/trends/analyze', { keywords, platform }),

  getPredictions: (category = 'all', timeRange = '7d') => 
    apiClient.get('/api/trends/predictions', { params: { category, timeRange } }),

  getHistorical: (keyword, days = 30) => 
    apiClient.get(`/api/trends/historical/${keyword}`, { params: { days } }),
};

export const contentAPI = {
  generateContent: (topic, platform, tone = 'engaging', length = 'medium') =>
    aiClient.post('/api/generate/content', { topic, platform, tone, length }),

  predictVirality: (content, platform, hashtags = []) =>
    aiClient.post('/api/predict/virality', { content, platform, hashtags }),

  generateMeme: (prompt, style = 'popular') =>
    apiClient.post('/api/content/meme', { prompt, style }),
};

export const analyticsAPI = {
  getPerformance: (timeRange = '7d') =>
    apiClient.get('/api/analytics/performance', { params: { timeRange } }),

  getEngagement: (contentId) =>
    apiClient.get(`/api/analytics/engagement/${contentId}`),

  getPlatformStats: () =>
    apiClient.get('/api/analytics/platforms'),
};

export default { apiClient, aiClient, trendAPI, contentAPI, analyticsAPI };

import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api',
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user.token) {
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }
  return config;
});

export default axiosInstance;
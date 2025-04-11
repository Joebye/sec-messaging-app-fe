import axios from 'axios';

const baseSecureApiURL = process.env.REACT_APP_BASE_API_URL;
const api = axios.create({ baseURL: baseSecureApiURL});

export const registerUser = async (username: string, password: string) => {
  const res = await api.post('/auth/signup', { username, password });
  return res.data;
};

export const loginUser = async (username: string, password: string) => {
  const res = await api.post('/auth/login', { username, password });
  return res.data;
};

export const sendMessage = async (token: string, encryptedMessage: string, aesKeyIv: string) => {
  await api.post('/messages/send', { encryptedMessage, aesKeyIv }, {
    headers: { Authorization: token }
  });
};

export const pollMessages = async (token: string) => {
  const res = await api.get('/messages/poll', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
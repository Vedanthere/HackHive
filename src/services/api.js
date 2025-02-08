import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-azure-api-endpoint.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTranscript = async (audioFile) => {
  try {
    const response = await api.post('/transcribe', { audioFile });
    return response.data;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};

export default api;
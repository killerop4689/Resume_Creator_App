import API from './api';

export async function generateResume(requestData) {
  try {
    const response = await API.post('/resume/generate', requestData);
    return response.data;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw error;
  }
}

export async function getResumeHistory() {
  try {
    const response = await API.get('/resume/history');
    return response.data;
  } catch (error) {
    console.error("Error fetching resume history:", error);
    throw error;
  }
}

export async function getResumeById(id) {
  try {
    const response = await API.get(`/resume/history/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching resume #${id}:`, error);
    throw error;
  }
}

  
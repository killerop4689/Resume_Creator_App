const BASE_URL = "http://localhost:8080/resume";

export async function generateResume(requestData) {
  try {
    const response = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating resume:", error);
    throw error; 
  }
}

export async function getResumeHistory() {
  try {
    const response = await fetch(`${BASE_URL}/history`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching resume history:", error);
    throw error;
  }
}

export async function getResumeById(id) {
  const response = await fetch(`${BASE_URL}/history/${id}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}


  
const BASE_URL = 'http://localhost:3000/jobs'

async function request(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`)
  }
  return response.json()
}

const jsonOptions = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})

export const getJobs = () => request(BASE_URL)
export const getJob = id => request(`${BASE_URL}/${id}`)
export const createJob = job => request(BASE_URL, jsonOptions('POST', job))
export const updateJob = (id, job) => request(`${BASE_URL}/${id}`, jsonOptions('PATCH', job))
export const deleteJob = id => request(`${BASE_URL}/${id}`, { method: 'DELETE' })

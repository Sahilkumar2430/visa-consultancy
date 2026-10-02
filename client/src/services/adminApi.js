import api from './api.js';

/* ---------- Auth ---------- */
export const adminLogin = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data.data);

export const adminLogout = () =>
  api.post('/auth/logout').then((r) => r.data);

export const adminMe = () =>
  api.get('/auth/me').then((r) => r.data.data);

/* ---------- Leads ---------- */
export const adminGetLeads = (params = {}) =>
  api.get('/leads', { params }).then((r) => r.data);

export const adminGetLead = (id) =>
  api.get(`/leads/${id}`).then((r) => r.data.data);

export const adminUpdateLead = (id, patch) =>
  api.put(`/leads/${id}`, patch).then((r) => r.data.data);

export const adminAddLeadNote = (id, text) =>
  api.post(`/leads/${id}/notes`, { text }).then((r) => r.data.data);

export const adminReplyToLead = (id, subject, message) =>
  api.post(`/leads/${id}/reply`, { subject, message }).then((r) => r.data);

export const adminDeleteLead = (id) =>
  api.delete(`/leads/${id}`).then((r) => r.data);

export const adminGetLeadStats = () =>
  api.get('/leads/stats').then((r) => r.data.data);

/* ---------- Generic CRUD factory ---------- */
export const makeCrud = (base) => ({
  list: (params) => api.get(base, { params }).then((r) => r.data.data),
  get: (id) => api.get(`${base}/${id}`).then((r) => r.data.data),
  create: (payload) => api.post(base, payload).then((r) => r.data.data),
  update: (id, payload) => api.put(`${base}/${id}`, payload).then((r) => r.data.data),
  remove: (id) => api.delete(`${base}/${id}`).then((r) => r.data),
});

export const adminCountriesApi = makeCrud('/countries');
export const adminServicesApi = makeCrud('/services');
export const adminFaqsApi = makeCrud('/faqs');
export const adminTestimonialsApi = makeCrud('/testimonials');
export const adminTeamApi = makeCrud('/team');
export const adminStatisticsApi = makeCrud('/statistics');

/* ---------- Contact info (singleton) ---------- */
export const adminGetContactInfo = () =>
  api.get('/contact-info').then((r) => r.data.data);

export const adminUpdateContactInfo = (payload) =>
  api.put('/contact-info', payload).then((r) => r.data.data);
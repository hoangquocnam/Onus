import axios from 'axios';
import { getTokenFromStorage } from '../utils/auth';
import { settings } from './settings';

const methods = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
  patch: patchMethod,
};

const SERVER_URL = settings.SERVER_URL;

function getMethod(url, config = {}) {
  return axios.get(`${SERVER_URL}/${url}`, {
    ...config,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
  });
}

function postMethod(url, data, config = {}) {
  return axios.post(`${SERVER_URL}/${url}`, data, {
    ...config,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
  });
}

function putMethod(url, data, config = {}) {
  return axios.put(`${SERVER_URL}/${url}`, data, {
    ...config,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
  });
}

function deleteMethod(url, config = {}) {
  return axios.delete(`${SERVER_URL}/${url}`, {
    ...config,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
  });
}

function patchMethod(url, config = {}) {
  return axios.patch(`${SERVER_URL}/${url}`, {
    ...config,
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`,
    },
  });
}

export { methods };

import axios from 'axios';
import { settings } from './settings';

const methods = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
};

const SERVER_URL = settings.SERVER_URL;

function getMethod(url, config = {}) {
  return axios.get(`${SERVER_URL}/${url}`, config);
}

function postMethod(url, data, config = {}) {
  return axios.post(`${SERVER_URL}/${url}`, data, config);
}

function putMethod(url, data, config = {}) {
  return axios.put(`${SERVER_URL}/${url}`, data, config);
}

function deleteMethod(url, config = {}) {
  return axios.delete(`${SERVER_URL}/${url}`, config);
}

export { methods };

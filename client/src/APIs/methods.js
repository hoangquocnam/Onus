import axios from 'axios';
import { SERVER_URL } from '../constants';

const methods = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
};

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

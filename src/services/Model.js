import axios from "axios";
import { API } from "./API";

const FETCH_GENERAL_DATA = async () => {
  const response = await axios.get(`${API.BASE_URL}`);
  return response.data;
};

const FETCH_BY_CASES = async () => {
  const response = await axios.get(API.BY_CASES);
  return response.data;
};

const FETCH_BY_CASES_CSV = async () => {
  const response = await axios.get(API.BY_CASES_CSV);
  return response;
};

const FETCH_BY_PROVINCE = async () => {
  const response = await axios.get(API.BY_PROVINCE);
  return response.data;
};

const FETCH_BY_PROVINCE_CSV = async () => {
  const response = await axios.get(API.BY_PROVINCE_CSV);
  return response;
};

const FETCH_BY_DAY = async () => {
  const response = await axios.get(API.BY_DAY);
  return response;
};

const FETCH_BY_DAY_CSV = async () => {
  const response = await axios.get(API.BY_DAY_CSV);
  return response;
};

export {
  FETCH_GENERAL_DATA,
  FETCH_BY_CASES,
  FETCH_BY_CASES_CSV,
  FETCH_BY_PROVINCE,
  FETCH_BY_PROVINCE_CSV,
  FETCH_BY_DAY,
  FETCH_BY_DAY_CSV
};

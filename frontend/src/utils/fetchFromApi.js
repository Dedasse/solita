import axios from 'axios';

export const BASE_URL = 'http://localhost:5000'

export const fetchFromApi = async (url) => {
  const {data} = await axios.get(`${BASE_URL}/${url}`)

  return data;
};
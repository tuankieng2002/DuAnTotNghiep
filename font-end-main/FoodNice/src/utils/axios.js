import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from './constants';

const axiosInstance = axios.create({
  // baseURL:'https://layfuu.herokuapp.com/'
  baseURL: 'https://doantotnghiepfoodnice.herokuapp.com/',
});
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(constants.TOKEN_KEY);
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };;
    return config;
  },
  err => Promise.reject(err),
);
axiosInstance.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err),
);

export default axiosInstance;

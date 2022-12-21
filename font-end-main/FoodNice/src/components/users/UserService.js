//cho de goi len db
// import axiosInstance from '../../utils/axios';
// import constants from '../../utils/constants';
import axios from 'axios';
import {baseURL} from '../../utils/baseURL';

//co che bat dong bo cua js
//login
export const login = async (email, password) => {
  try {
    const data = {
      email,
      password,
    };

    console.log(data);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(`${baseURL}/user/login`, data, config);
    // console.log('ftyry ' + response.data.user);
    return response.data;
  } catch (error) {
    console.log('eror: ' + error);
  }
};

//register user
export const register = async (email, password, name) => {
  const data = {
    email,
    password,
    name,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${baseURL}/user/register`, data, config);
  return response;
};

//logout user
export const logout = async () => {
  const user = await axios.get(`${baseURL}/user/logout`);
  return user;
};

//load user
export const loadUserMe = async (id) => {
  const user = await axios.get(`${baseURL}/user/profile/${id}`);
  return user;
};

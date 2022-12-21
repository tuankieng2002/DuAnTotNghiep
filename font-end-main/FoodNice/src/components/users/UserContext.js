import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {constants} from '../../utils/constants';
import {loadUserMe, login, logout, register} from './UserService';

export const UserContext = createContext();

export const UserContextProvider = props => {
  const {children} = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem(constants.TOKEN_KEY);
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    }
  };
  checkLogin();

  const onLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      console.log(result);
      // console.log(result.data.token);
      if (result && result.access_token) {
        //khi login vao thi luu vao storage
        await AsyncStorage.setItem(constants.TOKEN_KEY, result.access_token);
        setIsLoggedIn(true);
        return true;
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('onLogin error', error);
    }
    return false;
  };

  const onRegister = async (email, password, name) => {
    try {
      const result = await register(email, password, name);
      return result.data.status;
    } catch (error) {
      console.log('onRegister error', error);
    }
  };

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem(constants.TOKEN_KEY);
      setIsLoggedIn(false);
    } catch (error) {
      console.log('onLogout error', error);
    }

    // try {
    //   const result = await logout();
    //   if (result.status === 200) {
    //     await AsyncStorage.removeItem(constants.TOKEN_KEY);
    //     setIsLoggedIn(false);
    //   }
    // } catch (error) {
    //   console.log('onLogout error', error);
    // }
  };

  //load user
  const loadUser = async () => {
    try {
      const result = await loadUserMe();
      // console.log(result.data.user);
      return result.data.user;
    } catch (error) {
      console.log('loadUser error', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        onLogin,
        onRegister,
        isLoggedIn,
        onLogout,
        loadUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

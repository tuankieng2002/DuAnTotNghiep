import axios from 'axios';

class UserServices {
  authLogin = async (form) => {
    return await axios({
      method: 'POST',
      url: 'http://192.168.31.68:3000/api/user/login',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        "email": form.email,
        "password": form.password,
        "grant_type": "password"
      }
    })
  };

  authRegister = async (form) => {
    return await axios({
      method: 'POST',
      url: 'https://doantotnghiepfood.herokuapp.com/api/user/register',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        "name": form.name,
        "phone": form.phone,
        "email": form.email,
        "password": form.password,
        "grant_type": "password"
      }
    })
  };
}

export default new UserServices();

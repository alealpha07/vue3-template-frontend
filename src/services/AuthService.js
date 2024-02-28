import axios from 'axios';

class AuthService {

  static logout() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${process.env.VUE_APP_BASE_URL}/logout`, {}, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static login(username, password) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${process.env.VUE_APP_BASE_URL}/login`, { username: username, password: password }, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static register(username, password, confirmPassword) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${process.env.VUE_APP_BASE_URL}/register`, { username: username, password: password, confirmPassword: confirmPassword }, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getUser() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/user`, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AuthService;

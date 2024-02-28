import axios from 'axios';

class UserService {

  static getUsers() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/user`, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static editUser(id, image) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/user`, {id: id, image:image}, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static editPassword(id, password, confirmPassword) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.patch(`${process.env.VUE_APP_BASE_URL}/api/user`, {id: id, password:password, confirmPassword:confirmPassword}, { withCredentials: true, });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default UserService;

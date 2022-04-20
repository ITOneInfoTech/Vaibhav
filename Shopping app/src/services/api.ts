import axios from "axios";

const api = axios.create();

//api.defaults.headers["content-type"] = "application/json";

api.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (err) => {
    // eslint-disable-next-line no-console
    console.log(err);

    throw err;
  }
);

export default api;

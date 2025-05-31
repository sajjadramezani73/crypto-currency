// import { IaxiosConfig } from "./model";
import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export function setupAxios() {
  axios.defaults.baseURL = API_URL;

  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Set CORS and content headers
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Credentials"] = true;
      config.headers["Access-Control-Allow-Methods"] =
        "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH";
      config.headers["Content-Type"] = "application/json";
      config.headers["Acccept-Encoding"] = "gzip, deflate, br";
      config.headers["Access-Control-Max_Age"] = 36000;
      config.headers["Access-Control-Allow-Headers"] =
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, access-control-allow-origin, x-app-key, x-role, x-client-version, x-client-id, sentry-trace, client-id, device-id, menu-access, role-permission, user-agent, user";
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}

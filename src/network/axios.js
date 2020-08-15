import originAxios from "axios";

export function axios(config) {
  const instance = originAxios.create({
    baseURL: "http://152.136.185.210:8000/api/z8",
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}

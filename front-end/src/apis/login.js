import service from "../utils/service";

const loginApi = {};

loginApi.verify = data => {
  return service({
    method: "get",
    url: `/api/verify?token=${data.token}`
    // url: "/mock/init"
  });
};

loginApi.refreshToken = token => {
  return service({
    method: "get",
    url: `https://api.ifthat.com/login/refresh?refresh_token=${token}`
    // url: "/mock/init"
  });
};

export default loginApi;

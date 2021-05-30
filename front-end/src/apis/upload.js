import service from "../utils/service";

const fileApi = {};

fileApi.upload = data => {
  return service({
    method: "get",
    url: "/api/init",
    // url: "/mock/init",
    data
  });
};

export default fileApi;

import service from "../utils/service";

const passApi = {};

passApi.getStr = id => {
  return service({
    method: "get",
    url: `/api/getStr?id=${id}`
    // url: "/mock/init"
  });
};

passApi.save = (id, data) => {
  return service({
    method: "post",
    url: `/api/saveStr`,
    data: {
      id,
      data
    }
    // url: "/mock/init"
  });
};

export default passApi;
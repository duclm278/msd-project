import httpRequest from "./httpRequest";

const PREFIX = "table";

const tableApi = {
  createTable: (data) => {
    const url = `${PREFIX}/create`;
    return httpRequest.post(url, data);
  },
};

export default tableApi;

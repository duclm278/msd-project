import httpRequest from "./httpRequest";

const PREFIX = "customer";

const cutomerApi = {
    create(data) {
        const url = `${PREFIX}/create`;
        return httpRequest.post(url, data);
    },
    searchByName(name) {
        const url = `${PREFIX}/search`;
        return httpRequest.get(url, { params: { name } });
    },
    getCustomerById(id) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.get(url);
    },
    deleteCustomerById(id) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.delete(url);
    },
    updateCustomerById(id) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.patch(url);
    },
};

export default cutomerApi;

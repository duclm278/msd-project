import httpRequest from "./httpRequest";

const PREFIX = "order";

const orderApi = {
    create(data) {
        const url = `${PREFIX}/create`;
        return httpRequest.post(url, data);
    },
    delete(id) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.delete(url);
    },
    update(id, data) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.patch(url, data);
    },
    updateCost(id, data) {
        const url = `${PREFIX}/cost/${id}`;
        return httpRequest.patch(url, data);
    },
};

export default orderApi;

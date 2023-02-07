import httpRequest from "./httpRequest";

const PREFIX = "event";

const eventApi = {
    create(data) {
        const url = `${PREFIX}/create`;
        return httpRequest.post(url, data);
    },
    getEventById(id) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.get(url);
    },
    getListOfEvent() {
        const url = `${PREFIX}`;
        return httpRequest.get(url);
    },
    delete(id) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.delete(url);
    },
    update(id, data) {
        const url = `${PREFIX}/${id}`;
        return httpRequest.patch(url, data);
    },
};

export default eventApi;

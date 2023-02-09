const Event = require("../models/Event");
const statusType = require("../constants/statusType");
const {
    uploadFileCloudinary,
    destroyFileCloudinary,
} = require("../utils/cloudinary");

exports.createEvent = async (body, image) => {
    const data = { ...body };

    const folder = `Events/${body.name.trim().split(" ").join("-")}`;

    const imageUploadResponse = await uploadFileCloudinary(
        image.buffer,
        folder
    );

    data.poster = imageUploadResponse.secure_url;
    data.posterId = imageUploadResponse.public_id;

    const event = await Event.create(data);

    return {
        type: statusType.success,
        message: "Create event successfully!",
        statusCode: 200,
        event,
    };
};

exports.getEventList = async () => {
    const events = await Event.getEventList();

    if (events.length < 1)
        return {
            type: statusType.error,
            message: "No event found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Event found!",
        statusCode: 200,
        events,
    };
};

exports.getEventById = async (id) => {
    const event = await Event.getEventById(id);

    if (!event)
        return {
            type: statusType.error,
            message: "No event found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Event found!",
        statusCode: 200,
        event: event,
    };
};

exports.updateEvent = async (id, body, image) => {
    const event = await Event.getEventById(id);

    if (!event)
        return {
            type: statusType.error,
            message: "No event found!",
            statusCode: 404,
        };

    const data = { ...body };

    if (image) {
        await destroyFileCloudinary(event.poster_id);
        const folder = `Events/${
            body.name
                ? body.name.trim().split(" ").join("-")
                : event.event_name.trim().split(" ").join("-")
        }`;
        const uploadImageResponse = await uploadFileCloudinary(
            image.buffer,
            folder
        );

        data.poster = uploadImageResponse.secure_url;
        data.posterId = uploadImageResponse.public_id;
    } else {
        data.poster = event.poster;
        data.posterId = event.poster_id;
    }

    const newEvent = await Event.update(id, data);

    return {
        type: statusType.success,
        message: "Update event successfully!",
        statusCode: 200,
        event: newEvent,
    };
};

exports.deleteEvent = async (id) => {
    const event = await Event.getEventById(id);

    if (!event)
        return {
            type: statusType.error,
            message: "No event found!",
            statusCode: 404,
        };

    await destroyFileCloudinary(event.poster_id);

    await Event.delete(id);

    return {
        type: statusType.success,
        message: "Delete event successfully!",
        statusCode: 200,
    };
};


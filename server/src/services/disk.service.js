const statusType = require("../constants/statusType");
const Disk = require("../models/Disk");
const {
    uploadFileCloudinary,
    destroyFileCloudinary,
} = require("../utils/cloudinary");

exports.createDisk = async (data, image) => {
    if (!image)
        return {
            type: statusType.error,
            message: "Image required!",
            statusCode: 400,
        };

    const folder = `Disks/${data.name.trim().split(" ").join("-")}`;

    const imageUploadResponse = await uploadFileCloudinary(
        image.buffer,
        folder
    );

    const disk = await Disk.create(
        data,
        imageUploadResponse.secure_url,
        imageUploadResponse.public_id
    );

    return {
        type: statusType.success,
        message: "Create disk successfully!",
        statusCode: 200,
        disk,
    };
};

exports.getListOfDisks = async () => {
    const disks = await Disk.get();

    if (disks.length < 1)
        return {
            type: statusType.error,
            message: "No disk found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Get list of disk!",
        statusCode: 200,
        disks,
    };
};

exports.getDiskDetail = async (id) => {
    const disk = await Disk.getById(id);

    if (!disk)
        return {
            type: statusType.error,
            message: "No disk found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Disk found!",
        statusCode: 200,
        disk,
    };
};

exports.searchDisk = async (name) => {
    const disks = await Disk.searchByName(name);

    if (disks.length < 1)
        return {
            type: statusType.error,
            message: "No disk found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Disk found!",
        statusCode: 200,
        disks,
    };
};

exports.deleteDisk = async (id) => {
    const disk = await Disk.getById(id);

    if (!disk)
        return {
            type: statusType.error,
            message: "No disk found!",
            statusCode: 404,
        };

    await destroyFileCloudinary(disk.image_id);

    await Disk.delete(id);

    return {
        type: statusType.success,
        message: "Delete disk successfully!",
        statusCode: 200,
    };
};

exports.updateDisk = async (id, body, image) => {
    const disk = await Disk.getById(id);

    if (!disk)
        return {
            type: statusType.error,
            message: "No disk found!",
            statusCode: 404,
        };

    const data = { ...body };

    if (image) {
        await destroyFileCloudinary(disk.image_id);
        const folder = `Disks/${
            body.name
                ? body.name.trim().split(" ").join("-")
                : disk.disk_name.trim().split(" ").join("-")
        }`;
        const uploadImageResponse = await uploadFileCloudinary(
            image.buffer,
            folder
        );

        data.image = uploadImageResponse.secure_url;
        data.imageId = uploadImageResponse.public_id;
    }

    const newDisk = await Disk.update(id, data);

    return {
        type: statusType.success,
        message: "Update disk successfully!",
        statusCode: 200,
        disk: newDisk,
    };
};

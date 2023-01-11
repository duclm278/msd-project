const statusType = require("../constants/statusType");
const Disk = require("../models/Disk");
const { uploadFileCloudinary } = require("../utils/cloudinary");

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

    await Disk.create(data, imageUploadResponse.secure_url);

    return {
        type: statusType.success,
        message: "Create disk successfully!",
        statusCode: 200,
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
        disks
    };
};

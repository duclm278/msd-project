const Combo = require("../models/Combo");
const statusType = require("../constants/statusType");
const Disk = require("../models/Disk");
const {
    uploadFileCloudinary,
    destroyFileCloudinary,
} = require("../utils/cloudinary");

exports.createCombo = async (data, image) => {
    // data.disks = JSON.parse(data.disks);

    if (!image)
        return {
            type: statusType.error,
            message: "Image required!",
            statusCode: 400,
        };

    const folder = `Combos/${data.name.trim().split(" ").join("-")}`;

    const imageUploadResponse = await uploadFileCloudinary(
        image.buffer,
        folder
    );
    const combo = await Combo.create(
        data.name,
        data.description,
        data.price,
        imageUploadResponse.secure_url,
        imageUploadResponse.public_id
    );

    if (!combo)
        return {
            type: statusType.error,
            message: "Create combo failed!",
            statusCode: 400,
        };

    for (let disk of data.disks) {
        const diskDoc = await Disk.getById(disk.id);

        if (!diskDoc)
            return {
                type: statusType.error,
                message: `Disk with id ${disk.id} not found!`,
                statusCode: 404,
            };
    }
    for (let disk of data.disks) {
        await Combo.insertDiskIntoCombo(combo.combo_id, disk.id, disk.quantity);
    }

    return {
        type: statusType.success,
        message: "Create combo successfully!",
        statusCode: 200,
        combo: {
            ...(await Combo.getComboById(combo.combo_id)),
            disks: await Combo.getDiskInComboById(combo.combo_id),
        },
    };
};

exports.deleteCombo = async (comboId) => {
    const combo = await Combo.getComboById(comboId);

    if (!combo)
        return {
            type: statusType.error,
            message: "No combo found!",
            statusCode: 404,
        };

    await destroyFileCloudinary(combo.image_id);
    await Combo.delete(comboId);

    return {
        type: statusType.success,
        message: "Combo deleted!",
        statusCode: 200,
    };
};

exports.searchByName = async (name) => {
    const combos = await Combo.searchByName(name);

    if (combos.length < 1)
        return {
            type: statusType.error,
            message: "No combo found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Found!",
        statusCode: 200,
        combos,
    };
};

exports.getComboList = async () => {
    const combos = await Combo.getComboList();

    if (combos.length < 1)
        return {
            type: statusType.error,
            message: "No combo found!",
            statusCode: 404,
        };

    return {
        type: statusType.success,
        message: "Combos found!",
        statusCode: 200,
        combos,
    };
};

exports.getComboDetail = async (id) => {
    const combo = await Combo.getComboById(id);

    if (!combo)
        return {
            type: statusType.error,
            message: "No combo found!",
            statusCode: 404,
        };

    const disks = await Combo.getDiskInComboById(id);

    return {
        type: statusType.success,
        message: "Combo found!",
        statusCode: 200,
        combo: { ...combo, disks },
    };
};

exports.updateCombo = async (id, data, image) => {
    const combo = await Combo.getComboById(id);

    if (!combo)
        return {
            type: statusType.error,
            message: "No combo found!",
            statusCode: 404,
        };

    if (image) {
        await destroyFileCloudinary(combo.image_id);

        const folder = `Combos/${
            data.name
                ? data.name.trim().split(" ").join("-")
                : combo.combo_name.trim().split(" ").join("-")
        }`;

        const imageUploadResponse = await uploadFileCloudinary(
            image.buffer,
            folder
        );

        data.image = imageUploadResponse.secure_url;
        data.imageId = imageUploadResponse.public_id;
    }

    if (data.disks) {
        await Combo.removeDiskInCombo(id);
        for (let disk of data.disks) {
            await Combo.insertDiskIntoCombo(id, disk.id, disk.quantity);
        }
    }

    await Combo.update(id, data);

    return {
        type: statusType.success,
        message: "Combo updated!",
        statusCode: 200,
        combo: {
            ...(await Combo.getComboById(id)),
            disks: await Combo.getDiskInComboById(id),
        },
    };
};

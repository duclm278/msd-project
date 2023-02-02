const Combo = require("../models/Combo");
const statusType = require("../constants/statusType");
const Disk = require("../models/Disk");

exports.createCombo = async (data) => {
    const combo = await Combo.create(data.name, data.description);

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
            name: (await Combo.getComboById(combo.combo_id)).combo_name,
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

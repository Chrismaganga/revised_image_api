"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.processImage = void 0;
const imageProcessor_1 = require("../utils/imageProcessor");
const processImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send('Image uploaded successfully');
};
exports.processImage = processImage;
const resizeImage = async (req, res) => {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        return res.status(400).send('Missing filename, width, or height parameters');
    }
    try {
        const outputPath = await (0, imageProcessor_1.resizeImageFile)(filename, parseInt(width, 10), parseInt(height, 10));
        res.sendFile(outputPath);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.resizeImage = resizeImage;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = exports.processImage = void 0;
const imageProcessor_1 = require("../utils/imageProcessor");
const path_1 = __importDefault(require("path"));
// Process image upload
const processImage = (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded');
        return;
    }
    // Extract the file extension and filename
    const fileExtension = path_1.default.extname(req.file.originalname).toLowerCase();
    const filename = req.file.filename + fileExtension; // Combine filename with extension
    // Save or process the image file as needed
    // You can also store the file with the complete name if you're saving it
    res.send(`Image uploaded successfully as ${filename}`);
};
exports.processImage = processImage;
// Resize and serve the image
const resizeImage = async (req, res) => {
    const { filename, width, height } = req.query;
    // Validate parameters
    if (!filename || !width || !height) {
        res.status(400).send('Missing filename, width, or height parameters');
        return;
    }
    const widthNumber = parseInt(width, 10);
    const heightNumber = parseInt(height, 10);
    // Ensure width and height are valid numbers
    if (isNaN(widthNumber) ||
        isNaN(heightNumber) ||
        widthNumber <= 0 ||
        heightNumber <= 0) {
        res.status(400).send('Width and height must be positive numbers');
        return;
    }
    try {
        // Resize the image and get the output path
        const outputPath = await (0, imageProcessor_1.resizeImageFile)(filename, widthNumber, heightNumber);
        console.log('Image resized at:', outputPath);
        // Send the resized image as the response
        res.sendFile(outputPath);
    }
    catch (error) {
        // Log and return error message
        console.error('Error processing image:', error);
        res.status(500).send(error.message || 'Internal server error');
    }
};
exports.resizeImage = resizeImage;

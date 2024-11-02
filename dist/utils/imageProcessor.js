"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageFile = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
const inputDir = path_1.default.resolve(__dirname, '../../assets/images');
const outputDir = path_1.default.resolve(__dirname, '../../assets/images/resized');
const resizeImageFile = async (filename, width, height) => {
    const inputPath = path_1.default.join(inputDir, filename);
    const outputPath = path_1.default.join(outputDir, `${filename}-${width}x${height}.png`);
    // Ensure the resized directory exists
    await promises_1.default.mkdir(outputDir, { recursive: true });
    await (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFormat('png')
        .toFile(outputPath);
    return outputPath;
};
exports.resizeImageFile = resizeImageFile;

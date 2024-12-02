"use strict";
// import path from 'path';
// import sharp from 'sharp';
// import fs from 'fs/promises';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImageFile = void 0;
// const inputDir = path.resolve(__dirname, '../../assets/images');
// const outputDir = path.resolve(__dirname, '../../assets/images/resized');
// export const resizeImageFile = async (filename: string, width: number, height: number): Promise<string> => {
//   const inputPath = path.join(inputDir, filename);
//   const outputPath = path.join(outputDir, `${filename}-${width}x${height}.png`);
//   console.log('Image resized at:', outputPath);
//   // Ensure the resized directory exists
//   await fs.mkdir(outputDir, { recursive: true });
//   await sharp(inputPath)
//     .resize(width, height)
//     .toFormat('png')
//     .toFile(outputPath);
//   return outputPath;
// };
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
const inputDir = path_1.default.resolve(__dirname, '../../assets/images');
const outputDir = path_1.default.resolve(__dirname, '../../assets/images/resized');
const resizeImageFile = async (filename, width, height) => {
    const inputPath = path_1.default.join(inputDir, filename);
    // Extract the original file extension
    const extname = path_1.default.extname(filename).toLowerCase();
    // Set the output path using the original extension
    const outputPath = path_1.default.join(outputDir, `${path_1.default.basename(filename, extname)}-${width}x${height}${extname}`);
    console.log('Image resized at:', outputPath);
    // Ensure the resized directory exists
    await promises_1.default.mkdir(outputDir, { recursive: true });
    // Use type assertion to specify the format
    const format = extname === '.jpg' ? 'jpeg' : extname.slice(1);
    await (0, sharp_1.default)(inputPath)
        .resize(width, height)
        .toFormat(format) // Pass the format with type assertion
        .toFile(outputPath);
    return outputPath;
};
exports.resizeImageFile = resizeImageFile;

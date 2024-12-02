"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs")); // Import the 'fs' module
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const path_1 = __importDefault(require("path"));
const imageProcessor_1 = require("../utils/imageProcessor");
const request = (0, supertest_1.default)(index_1.default);
describe('Image API Endpoints', () => {
    it('should upload an image', async () => {
        const response = await request
            .post('/api/images/upload')
            .attach('image', path_1.default.resolve(__dirname, '../../assets/test.png'));
        expect(response.status).toBe(200);
        expect(response.text).toBe('Image uploaded successfully');
    });
    // ... previous code remains the same
    it('should resize an image', async () => {
        const filename = 'test.png';
        const width = 200;
        const height = 200;
        // Ensure the image exists before attempting to resize it
        const fileExists = await fs_1.default.promises
            .access(path_1.default.resolve(__dirname, '../../assets/images', filename))
            .then(() => true)
            .catch(() => false);
        expect(fileExists).toBe(true);
        const resizedPath = await (0, imageProcessor_1.resizeImageFile)(filename, width, height);
        expect(resizedPath).toContain(`test-${width}x${height}.png`);
    });
    // ... the rest of the component
    it('should return an error for missing parameters', async () => {
        const response = await request.get('/api/images?filename=test.png'); // This should match your route
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing filename, width, or height parameters'); // Adjust based on your API's response
    });
    it('should return an error for invalid dimensions', async () => {
        const response = await request.get('/api/images?filename=test.png&width=abc&height=100');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Width and height must be positive numbers'); // Adjust based on your API's response
    });
    it('should return an error for a non-existent image', async () => {
        const response = await request.get('/api/images?filename=nonexistent.png&width=200&height=200');
        expect(response.status).toBe(404); // Assuming you handle 404 errors
        expect(response.text).toBe('Image not found'); // Adjust based on your API's response
    });
});

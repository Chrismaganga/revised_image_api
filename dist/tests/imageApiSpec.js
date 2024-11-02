"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    it('should resize an image', async () => {
        const filename = 'test.png';
        const width = 200;
        const height = 200;
        const resizedPath = await (0, imageProcessor_1.resizeImageFile)(filename, width, height);
        expect(resizedPath).toContain(`test-${width}x${height}.png`);
    });
    it('should return an error for missing parameters', async () => {
        const response = await request.get('/api/images?filename=test.png');
        expect(response.status).toBe(400);
    });
});

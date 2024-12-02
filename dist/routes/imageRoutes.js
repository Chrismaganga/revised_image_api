"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// Route to handle image upload and processing
router.post('/upload', upload_1.uploadSingle, imageController_1.processImage);
// Route to handle image resizing
router.get('/resize', imageController_1.resizeImage);
exports.default = router;

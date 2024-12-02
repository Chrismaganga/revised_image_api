"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiple = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, path_1.default.resolve(__dirname, '../../assets/images'));
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    },
});
exports.uploadSingle = (0, multer_1.default)({ storage }).single('image');
exports.uploadMultiple = (0, multer_1.default)({ storage }).array('images', 10);
const router = express_1.default.Router();
router.use('/images', express_1.default.static(path_1.default.resolve(__dirname, '../../assets/images')));
exports.default = router;

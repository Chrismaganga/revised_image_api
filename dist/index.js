"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// Serve static files from the assets directory
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../assets/images')));
app.use('/api/images', imageRoutes_1.default);
console.log();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;

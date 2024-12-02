"use strict";
/**
 * @fileoverview Main entry point for the image API server.
 * Sets up the Express server, middleware, routes, and file upload handling.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const PORT = 3000;
/**
 * Middleware setup
 * - Enables CORS
 * - Serves static files from the 'assets/images' and 'public' directories
 */
app.use((0, cors_1.default)());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../assets/images')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Set up multer for file uploads
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
/**
 * Serves an HTML file for the root route
 * @route GET /
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 */
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
    console.log(JSON.stringify(req.headers));
});
// Upload multiple files
app.post('/images', upload.array('photos', 8), async (req, res) => {
    try {
        const photos = req.files;

        // check if photos are available
        if (!photos) {
            res.status(400).send({
                status: false,
                data: 'No photo is selected.'
            });
        } else {
            let data = [];

            // iterate over all photos
            photos.map(p =>
                data.push({
                    name: p.originalname,
                    mimetype: p.mimetype,
                    size: p.size
                })
            );

            // log data to console
            console.log(data);

            // send response
            res.send({
                status: true,
                message: 'Photos are uploaded.',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read all images
app.get('/upload', (req, res) => {
    // This is a placeholder for reading images from a database or storage
    console.log('Read all images');
    res.send('Read all images');
});

// Update an image
app.put('/images/:id', (req, res) => {
    // This is a placeholder for updating an image in a database or storage
    console.log(`Update image with id: ${req.params.id}`);
    res.send(`Update image with id: ${req.params.id}`);
});

// Delete an image
app.delete('/images/:id', (req, res) => {
    // This is a placeholder for deleting an image from a database or storage
    console.log(`Delete image with id: ${req.params.id}`);
    res.send(`Delete image with id: ${req.params.id}`);
});

/**
 * Starts the server and listens on the specified port
 * @param {number} PORT - The port number to listen on
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;

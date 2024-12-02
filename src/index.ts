/**
 * @fileoverview Main entry point for the image API server.
 * Sets up the Express server, middleware, routes, and file upload handling.
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import imageRoutes from './routes/imageRoutes';

const app = express();
const PORT = 3000;

/**
 * Middleware setup
 * - Enables CORS
 * - Serves static files from the 'assets/images' and 'public' directories
 */
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '../assets/images')));
app.use(express.static(path.join(__dirname, '../public')));

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Serves an HTML file for the root route
 * @route GET /
 * @param {express.Request} req - The request object
 * @param {express.Response} res - The response object
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
  console.log(JSON.stringify(req.baseUrl, null, 2));
});

// API routes
app.use('/images', imageRoutes);

// Endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res): void => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  // Log the uploaded file data
  console.log(JSON.stringify(req.file, null, 2));

  // Respond with the file data in JSON format
  res.json({
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

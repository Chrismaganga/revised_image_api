import express from 'express';
import { processImage, resizeImage } from '../controllers/imageController';
import { uploadSingle } from '../middleware/upload';

const router = express.Router();

// Route to handle image upload and processing
router.post('/upload', uploadSingle, processImage);

// Route to handle image resizing
router.get('/resize', resizeImage);

export default router;

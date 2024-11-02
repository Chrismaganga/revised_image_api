import express from 'express';
import { processImage, resizeImage } from '../controllers/imageController';
import { uploadSingle } from '../middleware/upload';

const router = express.Router();


router.post('/upload', uploadSingle, processImage);
router.get('/', resizeImage);

export default router;

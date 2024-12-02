import multer from 'multer';
import path from 'path';
import express from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve(__dirname, '../../assets/images'));
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadSingle = multer({ storage }).single('image');
export const uploadMultiple = multer({ storage }).array('images', 10);

const router = express.Router();

router.use('/images', express.static(path.resolve(__dirname, '../../assets/images')));

export default router;
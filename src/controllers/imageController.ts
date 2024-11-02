// import { Request, Response } from 'express';
// import { resizeImageFile } from '../utils/imageProcessor';

// // Extend Request to include file property for Multer
// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }

// // Process image upload
// export const processImage = (req: MulterRequest, res: Response): void => {
//   if (!req.file) {
//     res.status(400).send('No file uploaded');
//     return;
//   }
//   res.send('Image uploaded successfully');
// };

// // Resize and serve the image
// export const resizeImage = async (req: Request, res: Response): Promise<void> => {
//   const { filename, width, height } = req.query;

//   // Validate parameters
//   if (!filename || !width || !height) {
//     res.status(400).send('Missing filename, width, or height parameters');
//     return;
//   }

//   const widthNumber = parseInt(width as string, 10);
//   const heightNumber = parseInt(height as string, 10);

//   // Ensure width and height are valid numbers
//   if (isNaN(widthNumber) || isNaN(heightNumber) || widthNumber <= 0 || heightNumber <= 0) {
//     res.status(400).send('Width and height must be positive numbers');
//     return;
//   }

//   try {
//     // Resize the image and get the output path
//     const outputPath = await resizeImageFile(
//       filename as string,
//       widthNumber,
//       heightNumber
//     );

//     console.log('Image resized at:', outputPath);

//     // Send the resized image as the response
//     res.sendFile(outputPath);
//   } catch (error: any) {
//     // Log and return error message
//     console.error('Error processing image:', error);
//     res.status(500).send(error.message || 'Internal server error');
//   }
// };
import { Request, Response } from 'express';
import { resizeImageFile } from '../utils/imageProcessor';
import path from 'path';

// Extend Request to include file property for Multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Process image upload
export const processImage = (req: MulterRequest, res: Response): void => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }

  // Extract the file extension and filename
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  const filename = req.file.filename + fileExtension; // Combine filename with extension

  // Save or process the image file as needed
  // You can also store the file with the complete name if you're saving it

  res.send(`Image uploaded successfully as ${filename}`);
};

// Resize and serve the image
export const resizeImage = async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query;

  // Validate parameters
  if (!filename || !width || !height) {
    res.status(400).send('Missing filename, width, or height parameters');
    return;
  }

  const widthNumber = parseInt(width as string, 10);
  const heightNumber = parseInt(height as string, 10);

  // Ensure width and height are valid numbers
  if (isNaN(widthNumber) || isNaN(heightNumber) || widthNumber <= 0 || heightNumber <= 0) {
    res.status(400).send('Width and height must be positive numbers');
    return;
  }

  try {
    // Resize the image and get the output path
    const outputPath = await resizeImageFile(
      filename as string,
      widthNumber,
      heightNumber
    );

    console.log('Image resized at:', outputPath);

    // Send the resized image as the response
    res.sendFile(outputPath);
  } catch (error: any) {
    // Log and return error message
    console.error('Error processing image:', error);
    res.status(500).send(error.message || 'Internal server error');
  }
};

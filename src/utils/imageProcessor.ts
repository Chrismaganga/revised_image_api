// import path from 'path';
// import sharp from 'sharp';
// import fs from 'fs/promises';

// const inputDir = path.resolve(__dirname, '../../assets/images');
// const outputDir = path.resolve(__dirname, '../../assets/images/resized');

// export const resizeImageFile = async (filename: string, width: number, height: number): Promise<string> => {
//   const inputPath = path.join(inputDir, filename);
//   const outputPath = path.join(outputDir, `${filename}-${width}x${height}.png`);
//   console.log('Image resized at:', outputPath);

//   // Ensure the resized directory exists
//   await fs.mkdir(outputDir, { recursive: true });

//   await sharp(inputPath)
//     .resize(width, height)
//     .toFormat('png')
//     .toFile(outputPath);

//   return outputPath;
// };
import path from 'path';
import sharp from 'sharp';
import fs from 'fs/promises';

const inputDir = path.resolve(__dirname, '../../assets/images');
const outputDir = path.resolve(__dirname, '../../assets/images/resized');

export const resizeImageFile = async (filename: string, width: number, height: number): Promise<string> => {
  const inputPath = path.join(inputDir, filename);
  
  // Extract the original file extension
  const extname = path.extname(filename).toLowerCase();
  
  // Set the output path using the original extension
  const outputPath = path.join(outputDir, `${path.basename(filename, extname)}-${width}x${height}${extname}`);
  console.log('Image resized at:', outputPath);

  // Ensure the resized directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Use type assertion to specify the format
  const format = extname === '.jpg' ? 'jpeg' : extname.slice(1) as keyof sharp.FormatEnum;

  await sharp(inputPath)
    .resize(width, height)
    .toFormat(format) // Pass the format with type assertion
    .toFile(outputPath);

  return outputPath;
};

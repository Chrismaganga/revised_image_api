import fs from 'fs'; // Import the 'fs' module

import supertest from 'supertest';
import app from '../index';
import path from 'path';
import { resizeImageFile } from '../utils/imageProcessor';

const request = supertest(app);

describe('Image API Endpoints', () => {
  it('should upload an image', async () => {
    const response = await request
      .post('/api/images/upload')
      .attach('image', path.resolve(__dirname, '../../assets/test.png'));
    expect(response.status).toBe(200);
    expect(response.text).toBe('Image uploaded successfully');
  });

  // ... previous code remains the same
  it('should resize an image', async () => {
    const filename = 'test.png';
    const width = 200;
    const height = 200;

    // Ensure the image exists before attempting to resize it
    const fileExists = await fs.promises
      .access(path.resolve(__dirname, '../../assets/images', filename))
      .then(() => true)
      .catch(() => false);
    expect(fileExists).toBe(true);

    const resizedPath = await resizeImageFile(filename, width, height);
    expect(resizedPath).toContain(`test-${width}x${height}.png`);
  });

  // ... the rest of the component

  it('should return an error for missing parameters', async () => {
    const response = await request.get('/api/images?filename=test.png'); // This should match your route
    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing filename, width, or height parameters'); // Adjust based on your API's response
  });

  it('should return an error for invalid dimensions', async () => {
    const response = await request.get(
      '/api/images?filename=test.png&width=abc&height=100'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Width and height must be positive numbers'); // Adjust based on your API's response
  });

  it('should return an error for a non-existent image', async () => {
    const response = await request.get(
      '/api/images?filename=nonexistent.png&width=200&height=200'
    );
    expect(response.status).toBe(404); // Assuming you handle 404 errors
    expect(response.text).toBe('Image not found'); // Adjust based on your API's response
  });
});

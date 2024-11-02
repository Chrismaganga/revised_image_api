import express from 'express';
import path from 'path';
import cors from 'cors';  // Import CORS
import imageRoutes from './routes/imageRoutes';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the assets directory
app.use('/images', express.static(path.join(__dirname, '../assets/images')));

// API routes
app.use('/api/images', imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

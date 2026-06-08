import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    baseUrl,
    mongoDb: 'octofit_db',
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB with Mongoose');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
};

void startServer();

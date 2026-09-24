const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/feedants_competition';
  
  try {
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB database.');
  } catch (err) {
    if (process.env.VERCEL) {
      console.warn('⚠️ Serverless environment without external MONGODB_URI. Operating with fallback response handlers.');
      return;
    }
    console.warn('⚠️ Could not connect to external MongoDB server. Starting embedded in-memory MongoDB server for local development...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      isConnected = true;
      console.log(`✅ In-Memory MongoDB running successfully at ${memUri}`);
    } catch (memErr) {
      console.error('❌ Failed to initialize MongoDB connection:', memErr.message);
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  } catch (error) {
    console.error('Error disconnecting MongoDB:', error);
  }
};

module.exports = { connectDB, disconnectDB };

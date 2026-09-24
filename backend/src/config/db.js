const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/feedants_competition';
  
  try {
    console.log(`Attempting connection to MongoDB at: ${uri}`);
    // Set 2.5s connection timeout so we fall back quickly if local MongoDB isn't running
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('✅ Connected to local/remote MongoDB database.');
  } catch (err) {
    console.warn('⚠️ Could not connect to external MongoDB server. Starting embedded in-memory MongoDB server for seamless zero-config evaluation...');
    try {
      mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      console.log(`✅ In-Memory MongoDB running successfully at ${memUri}`);
    } catch (memErr) {
      console.error('❌ Failed to initialize MongoDB connection:', memErr.message);
      process.exit(1);
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

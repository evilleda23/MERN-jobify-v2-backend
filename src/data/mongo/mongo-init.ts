import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options): Promise<Boolean> {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log('Connecting to MongoDB...');
      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }
  static async disconnect(): Promise<Boolean> {
    try {
      await mongoose.disconnect();
      console.log('Disconnecting from MongoDB...');
      return true;
    } catch (error) {
      console.log('Mongo disconnection error');
      throw error;
    }
  }
}

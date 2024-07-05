import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "Numero",
  });
  console.log(`Database Connected successfully on ${connection.host} !!`);
};


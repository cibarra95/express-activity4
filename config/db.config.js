const mongoose = require("mongoose");

const startDatabase = async () => {
  try {
   
    const dbUri = process.env.MONGO_DB_URI
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    process.setMaxListeners(15);
    console.info("Successfully connected to MongoDB Atlas");
  } catch (error) {
    console.error("An error occurred while trying to connect to MongoDB Atlas", error);
    process.exit(1);
  }
};

// Disconnect on exit
process.on("SIGINT", async () => {
  try {
    await mongoose.disconnect();
    console.info("Successfully disconnected from MongoDB Atlas");
    process.exit(0);
    
  } catch (error) {
    console.error("An error occurred trying to disconnect MongoDB", error);
    process.exit(1);
  }
});

startDatabase();

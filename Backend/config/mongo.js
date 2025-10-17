import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    // जब MongoDB connected होगा
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully!");
    });

    // जब कोई error आएगा
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    // Connection establish करना
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Bloggers", // URL में "/Bloggers" लिखने की बजाय यहाँ देना बेहतर है
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (e) {
    console.error("⚠️ Something went wrong while connecting to MongoDB:", e);
    process.exit(1); // यदि कनेक्शन fail हो जाए तो process रोक देना
  }
};

export default mongoDB;

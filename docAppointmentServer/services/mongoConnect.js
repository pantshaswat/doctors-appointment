const mongoose = require("mongoose");

class Database {
    
  static async connect() {
    //Insert MONGODB_URI here
    
    const MONGODB_URI =
      "mongodb+srv://pantshaswat:XeSHTh9TOxANuREy@cluster0.6qz5grg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try {
     mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
     
    });
      
     
      console.log("Database connected successfully");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Database;
const mongoose = require("mongoose");
const uri = `mongodb+srv://shoaibakhtar9430:Br6inIrBDSXCP32X@cluster0.qcqovwf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("You successfully connected to MongoDB!");
  } catch (e) {
    console.log("Connection to Mongo Failed");
    throw new Error("Mongo Connection");
  }
}
module.exports = run;

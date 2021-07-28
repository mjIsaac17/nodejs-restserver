const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Error when connection to the database");
  }
};

module.exports = {
  dbConnection,
};

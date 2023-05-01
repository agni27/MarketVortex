const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName:"Ecommerce"
    })
    .then((data) => {
      console.log(`Connection successful with ${data.connection.host}`);
    })
};

module.exports = connectDatabase;

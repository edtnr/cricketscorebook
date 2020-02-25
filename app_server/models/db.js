
const mongoose = require("mongoose");

//connect to database
const dbURI = "mongodb://localhost:27017/cricketscorebook";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to: "+dbURI);
});
mongoose.connection.on("error", function(err) {
    console.log("Mongoose connection error: "+err);
});
mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
});

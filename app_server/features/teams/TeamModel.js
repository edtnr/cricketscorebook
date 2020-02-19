const mongoose = require("mongoose");

//define the Team Schema
const TeamSchema = new mongoose.Schema({
    teamName: {
      type: String,
      maxlength: 255,
      required: true
    },
    home: {
      type: Boolean,
      required: true
    },
    batting: {
      type: Boolean,
      required: true
    }
  });
  
mongoose.model("Team", TeamSchema);

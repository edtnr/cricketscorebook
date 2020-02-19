const mongoose = require("mongoose");

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

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  runsscored: {
    type: Number,
    default: 0
  },
  team: {
    type: String,
    required: true
  },
  batting: {
    type: Boolean,
    default: false
  },
  ballsfaced: {
    type: Number,
    default: 0
  },
  wicketsgained: {
    type: Number,
    default: 0
  },
  ballsbowled: {
    type: Number,
    default: 0
  },
  out: {
    type: Boolean,
    default: false
  },
  playing: {
    type: Boolean,
    default: false
  }
});

const MatchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: String,
      required: true
    },
    awayTeam: {
      type: String,
      required: true
    },
    players: [PlayerSchema],
    oversPlayed: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

mongoose.model("match", MatchSchema);

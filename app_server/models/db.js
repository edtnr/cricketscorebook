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

require("../features/teams/TeamModel")
require("../models/PlayerModel")

require("../features/teams/TeamService");
const TeamModel  = mongoose.model("Team");
const PlayerModel  = mongoose.model("Player");
require("../models/MatchModel")
const MatchModel  = mongoose.model("Match");
/** 
var thisMatch = new MatchModel({
    homeTeam: "England",
    awayTeam: "wank",
    homePlayers: [{
        name: "Steve",
        home: true,
    },
    {
        name: "Phil",
        home: true,
    }],
    awayPlayers: [{
        name: "Ed",
        home: false,
    }]
}).save()
.catch(e => console.log(e));

new TeamModel({ 
    teamName: "Steve Cook",
    players: [{name: "Hello", home: true}],
    home: true,
    batting: true,

    
}).save();

var homePlayers = [];
PlayerModel.find({}, ["name", "runsscored", "home", "ballsfaced", "wicketsgained", "ballsbowled", "out", "playing"]).exec(function(err, players){
    homePlayers = players;
   
});

const findHomePlayers = () => {
    return PlayerModel.find({}, ["name", "runsscored", "home", "ballsfaced", "wicketsgained", "ballsbowled", "out", "playing"]).exec();
}

mainFunction = async () => {
    const object = await findHomePlayers();
    return object; // or anything else as per your wish
}



PlayerModel.find({"home": "true"})
    .lean()
    .exec(function(err, docs) {
        thisMatch.homePlayers.push(docs._id);
        thisMatch.save();
    });

console.log(mainFunction());
console.log("Players new object::" + homePlayers);
//console.log("Players:" + homePlayers);

TeamModel.find({}).exec(function(err, team){
    console.log("Complete " + team)
});
*/
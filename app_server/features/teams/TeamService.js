const mongoose = require("mongoose");
const TeamModel  = mongoose.model("Team");

function createTeam(options){
    new TeamModel({
        teamName: options.teamName,
        players: options.players,
        venue: options.venue,
        battingOrBowling: options.battingOrBowling,
    }).save()
    .then(team => team.id)
    .catch(() => new Error("Unable to create Team"));
};

/**
 * Retrieves all teams.
 * @returns an array of all team models.
 
const getTeams = function() {
  TeamModel.find({}, ["_id", "players", "homeoraway", "battingorbowling"]);
};

const getTeamByVenue = function(homeoraway) {
  TeamModel.findOne({homeoraway}).then(team => team);
};

const getTeamByTeamName = function(teamname) {
    TeamModel.findOne({teamname}).then(team => team);
};
*/
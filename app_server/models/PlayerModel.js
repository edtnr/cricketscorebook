const mongoose = require("mongoose");

//define player schema for Teams
const PlayerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    runsscored: {
        type: Number,
        default: 0
    },
    home: {
        type: Boolean,
        required: true
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
        default:false
    },
    batting: {
        type: Boolean,
        required: true
    }

});

mongoose.model('Player', PlayerSchema);
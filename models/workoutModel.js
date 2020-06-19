const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day:{
        type: Date,
        default: Date.now
        },
    completed:{
        type: Boolean,
        default:false
        },
    exercises:[{
        type:String,
        name:String,
        duration:Number,
        distance:Number,
        weight:Number,
        reps:Number,
        sets:Number

    }]

});


const Workout = mongoose.model("Exercise",WorkoutSchema);
module.exports = Workout;
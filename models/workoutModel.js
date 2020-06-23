const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day:{
        type: Date,
        
        },
       
    exercises:[
        {
            type: {
                type: String,
                trim: true,
              },
              name: {
                type: String,
                trim: true,
              },duration: {
                type: Number,
                trim: true,
              },
              distance: {
                type: Number,
                trim: true,
              },
              weight: {
                type: Number,
                trim: true,
              },
              reps: {
                type: Number,
                trim: true,
              },
              sets: {
                type: Number,
                trim: true,
              }

        }
    ],
    totalDuration:{
        type:Number,
        default: function (){
            let total = 0
            this.exercises.forEach(item=>{
                total = total + item.duration;
            })
            return total
        }
    }

});


const Workout = mongoose.model("Workout",WorkoutSchema);
module.exports = Workout;
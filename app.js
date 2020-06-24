//Required Node packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

//Set up PORT to environment variable or PORT 3000 locally
const PORT = process.env.PORT || 3000;

//Require the database models
const db = require("./models");

const app = express();
app.use(logger("dev"));

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Define the public facing code
app.use(express.static("public"));

//Make the database connection using Mongoose ODM
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

//******************************************************************** */
//HTML Routes specified here to stats page and the add exercise page.
//******************************************************************** */

app.get("/exercise",(req,res)=>{
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
app.get("/stats",(req,res)=>{
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

//******************************************************************** */
// API routes for connecting to the MongoDB workouts database
//******************************************************************** */

//POST API route for adding a new workout to the database.

app.post("/api/workouts",(req,res)=>{
  console.log("post route");
  db.Workout.create(
    {
      day: new Date()
    }).then(data =>{
      res.json(data);
    }).catch(err => {
      res.json(err);
    });

});

//Update route for updating exercises to the workout in progress.

app.put("/api/workouts/:id",(req,res)=>{
  console.log(req.params.id)
  console.log(req.body)
    db.Workout.updateOne(
      {
        _id: req.params.id
      },
      {
        $push:{ exercises:req.body }
      }      
    )
    .then(data =>{
      res.json(data);
  }).catch(err => {
      res.json(err);
  })
});


// GET API route to return all workout data 

//db.Workout.aggregate([{$project:{totalDuration:{$sum:"$exercises.duration"}}}])

app.get("/api/workouts",(req,res)=>{
  db.Workout.find({}).exec((error,data)=>{
    if (error) {
      res.send(error);
    } else {      
      console.log(data);
      res.json(data);
    }
  })


  
});


// GET API route to return all workout data which is then sorted in the stats page.

app.get("/api/workouts/range",(req,res)=>{
  db.Workout.find({},(err,data)=>{
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
  })
})

//Turn listening on for PORT

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

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
      //day: Date.now()
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

app.get("/api/workouts",(req,res)=>{
  db.Workout.find({},(error,data)=>{
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



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
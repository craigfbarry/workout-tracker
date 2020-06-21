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
//HTML Routes specified here to stats page and the add exercise page.

app.get("/exercise",(req,res)=>{
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});
app.get("/stats",(req,res)=>{
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});


//API routes

app.post("/api/workouts",({body},res)=>{
  console.log("post route");
  db.Workout.create(
    {
      day: Date.now(),
    }).then(data =>{
      res.json(data);
    }).catch(err => {
      res.json(err);
    });

});

/*
app.put("/api/workouts/:id",({body},res)=>{
  console.log(body)

  db.Exercise.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({},{ $push: { exercises: _id } }, { new: true }))  
    .then(data =>{
      res.json(data);
  }).catch(err => {
      res.json(err);
  })
});
*/

  app.get("/api/workouts/range",(req,res)=>{
      db.Workout.find({},(err,data)=>{
          if (err) {
            res.send(err);
          } else {
            res.json(data);
          }
      })
  })




app.get("/api/workouts",(req,res)=>{
  db.Workout.find({},(error,data)=>{
    if (error) {
      res.send(error);
    } else {
      console.log("come here for data");
      console.log(data);
      res.json(data);
    }
  })
});




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
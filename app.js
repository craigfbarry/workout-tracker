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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

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
  //db.Workout.collection.deleteMany({});

});


app.put("/api/workouts/:id",({body},res)=>{
  console.log(body)
  db.Workout.collection.insertOne(

    { 
      day: Date.now(),
      body:body
    }
  ).then(data =>{
    res.json(data);
  }).catch(err => {
    res.json(err);
  })
});


  app.get("/api/workouts/range",(req,res)=>{
      db.Workout.collection.find({},(err,data)=>{
          if (error) {
            res.send(error);
          } else {
            res.json(data);
          }
      })
  })






app.get("/api/workouts",(req,res)=>{
  db.Workout.collection.find({},(error,data)=>{
    if (error) {
      res.send(error);
    } else {
      console.log("come here for data");
      res.json(data);
    }
  })
});




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
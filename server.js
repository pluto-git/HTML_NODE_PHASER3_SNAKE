require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const app = express();




//const DB_URI   = "mongodb+srv://"+process.env.DB_LOGIN+":"+process.env.DB_PASS+"@cluster0.hwdm7.mongodb.net/"
const DB_URI = "mongodb://localhost:27017/";
const DB       = "RatingDB";

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// Establish DB connection
mongoose.connect(DB_URI + DB, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   connectTimeoutMS: 10000
});

const db = mongoose.connection;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/assets/input.html');
});
db.once('open', () => console.log(`Connected to ${DB} database`));

let RatingSchema = new mongoose.Schema(
  {
    _id: String,
    login: String,
    score: Number
  },
)


let Rating = db.model("Rating", RatingSchema);


app.get("/api/rating", (req,res)=>{

  Rating.find({ }, (err, players) =>{
    if(!err){
      res.json(players);
      console.log(players);
    }else{
      res.status(400).json({"error": err});
    }
  });
});



app.get("/api/rating/sorted", (req,res)=>{
    Rating.find({},null, { sort: {score: -1}}, (err, players) =>{
        if(!err){
          res.json(players);
          console.log(players);
        }else{
          res.status(400).json({"error": err});
        }
      });
});

app.post("/api/rating/add", (req,res)=>{
  const user = new Rating(req.body);


  Rating.count({_id: user._id}, function (err, count){
    if(!err){
      if(count>0){
      // then the user exists.
      var usersProjection = {
        __v: false,
        _id: false,
        login: false
      };
      //get the initialScore from the existing user
      Rating.find({_id:user._id}, usersProjection, function (err, initialScore) {
          if(!err){
            //console.log("initial score: "+typeof(initialScore[0].score));

            //get the score that was passed through req.body
            const scoreQuery = { score: user.score};

            //console.log("scoreQuery "+typeof(scoreQuery.score));
            const newScore = initialScore[0].score + scoreQuery.score;
            console.log(newScore);
            Rating.updateOne({"_id":user._id}, {"score": newScore}, function(err){
              if(err){
                console.log(err);
              }else{
                console.log("Successfully updated!");
              }
            });
          }else{
            res.status(400).json({"error": err});
          }
        });


      }else{
      //user doesnt exist so we save a new one
        user.save( (err,result)=>{
          if(!err){
            res.json(result);
          }else{
            res.status(400).json({"error": err});
          }
        });
      }
    }else{
      res.status(400).json({"error": err});
    }

  });


});

app.delete("/api/rating/delete", (req,res) =>{
  Rating.deleteOne({_id: req.body}, (err) =>{
    if (!err){
      console.log("Successfully");
    }else if(err){
      console.log("Error" + err);
    }
  });
});

const PORT = process.env.PORT || 3000 ;

app.listen

app.listen(PORT, () => {
  console.log('Server listening on http://localhost:3000');
});

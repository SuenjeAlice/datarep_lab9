//Data Representation & Querying - Lab 6 - G00363332 - Sünje Alice Winteler
const express = require('express')
const app = express()
const port = 4000

//include cors library
const cors = require('cors');
//include bodyParser
const bodyParser = require("body-parser");
//
const mongoose = require('mongoose');

//add use method for cors
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

    //add use method for bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.z6v7i.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, {useNewUrlParser: true});

const Schema = mongoose.Schema;

var movieSchema = new Schema({
  title:String,
  year:String,
  poster:String
});

var MovieModel = mongoose.model("movie", movieSchema);

//used get method
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//used get method
app.get('/api/movies', (req, res) => {
  //variable mymovies with JOSON data  
  // const mymovies = [
  //       {
  //           "Title":"Avengers: Infinity War",
  //           "Year":"2018",
  //           "imdbID":"tt4154756",
  //           "Type":"movie",
  //           "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
  //           },
  //           {
  //           "Title":"Captain America: Civil War",
  //           "Year":"2016",
  //           "imdbID":"tt3498820",
  //           "Type":"movie",
  //           "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
  //           },
  //           {
  //           "Title":"World War Z",
  //           "Year":"2013",
  //           "imdbID":"tt0816711",
  //           "Type":"movie",
  //           "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}
  //           ,{
  //           "Title":"War of the Worlds",
  //           "Year":"2005",
  //           "imdbID":"tt0407304",
  //           "Type":"movie",
  //           "Poster":"https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
  //           }
            
  //   ];


      //
      MovieModel.find((err, data)=> {
        res.json(data)
      })

    //sending back json data and status message
//     res.status(200).json({
//         message: "Everything is good",
//         movies:mymovies
//         })
})

//
app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data) => {
      res.json(data);
    })
})

//updated post method
//listening for post request
app.post('/api/movies', (req, res) => {
    //console log newMovie items
    console.log('Movie Recieved!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
      title: req.body.title,
      year:req.body.year,
      poster:req.body.poster
    })

    //response ->avoids replications
    res.send('Item Added');

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
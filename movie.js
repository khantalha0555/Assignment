const express = require("express");
const mongoose = require("mongoose");
const app = express();

const movie = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img : String ,
  summary : String,
});
const movies = mongoose.model("movies", movie);
app.use(express.json());

app.get("/movies", async (req, res, next) => {
  const allmovies = await movies.find();
  res.send({ data: allmovies });
});
app.get("/movies/:id", async (req, res, next) => {
  const movies = await movies.findById(req.params.id);
  res.send({ data: movies });
});
app.post("/movies", async (req, res, next) => {
  const newMovies = new movies({ name: req.body.name, img: req.body.img, summary:req.body.summary });
  await newMovies.save();
  res.send({ data: newMovies });
});

mongoose
  .connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => console.log("movie list"));
  });
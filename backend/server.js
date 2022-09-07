require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

const app = express();

//middleware to run before each req
app.use(express.json()); // if reqeuest has body attach json to req object

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//routes
app.get("/", (req, res) => {
  res.json({ msg: "hello person of the interweb" });
});
app.use('/api/workouts', workoutRoutes);

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //only listen once we've connected to the db
    app.listen(process.env.PORT, () => {
      console.log(`Listening at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error))


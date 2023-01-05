// Dependencies
require('dotenv').config();
const mongoose = require("mongoose");
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// Database Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to Mongoose"))
    .on("close", () => console.log("You are disconnected from Mongoose"))
    .on("error", (error) => console.log(error))


// Peoples Model
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
});

const People = mongoose.model("People", PeopleSchema);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/people", async (req, res) => {
    try {
        res.json(await People.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post("/people", async (req, res) => {
    try {
        res.json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
});

app.put("/people/:id", async (req, res) => {
    try {
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch(error){
        res.status(400).json(error);
    }
});

app.delete("/people/:id", async (req, res) => {
    try {
        res.json(await People.findByIdAndRemove(req.params.id))
    } catch(error){
        res.status(400).json(error);
    }
})

app.get("/people/:id", async (req, res) => {
    try {
        res.json(await People.findById(req.params.id));
    } catch(error){
        res.status(400).json(error);
    }
})

// Listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
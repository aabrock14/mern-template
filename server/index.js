require('dotenv').config(); //npm install dotenv --save so we can use env variables for passwords
const express = require('express')
const cors = require('cors');
const mongoose =  require('mongoose')
const app = express()

const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD
const FilmModel = require("./models/Films")
app.use(express.json()) //This parses JSON coming from the frontend
app.use(cors()); //Allows communication front end to back end

mongoose.connect(`mongodb+srv://mernuser:${MONGOOSE_PASSWORD}@cluster0.cxgnnso.mongodb.net/moviesked?retryWrites=true&w=majority`, 
{
    useNewURLParser: true,
}
)

//Here is where we will retrieve items and display them for the frontend
app.get('/read', async (req,res) => {
    //FilmModel.find({ $where: {title: "Predator"}},)   //only return certain value/values
    FilmModel.find({}, (err, result) => {
       if (err) {
        res.send(err)
       } 
       res.send(result) //if no error, send result
    })
})

//Here is where we will add things to the database, reading from the frontend
app.post('/insert', async (req,res) => {
    const film = new FilmModel({
        id: req.body.id,
        title: req.body.title
    })
    try  {
        await film.save()
        res.send("inserted data")
    } catch(err) {
        console.log(err)
    }
})

//Here is where we will update things already in the database
app.put('/update', async (req,res) => {
    const newFilmName = req.body.title
    const id = req.body.id
    //console.log("here ->", req.body.id)
    try {
        await FilmModel.updateOne({ "_id": id}, {
            "title": newFilmName
        })
    } catch (err) {
        console.log(err)
    }
})

//Here is where we will delete items 
app.delete('/delete/:id', async (req,res) => {
    const id = req.params.id
    await FilmModel.findByIdAndRemove(id).exec();
    res.send("deleted")
})

//And now we listen....
app.listen(3001, () => {
    console.log("Server listening on port 3001...")
})
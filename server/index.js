import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv" //npm install dotenv --save so we can use env variables for passwords
import FilmsDAO from "./dao/filmsDAO.js" //import the Database Access Object
dotenv.config(); 

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

//console.log(process.env.TIFF_DB_URI)

MongoClient.connect(
    process.env.TIFF_DB_URI,
    {
        maxPoolSize: 50,
        writeConcern: {wtimeout:3000},
        useNewURLParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})//at this point we should be connected to the database
.then(async client => {
    await FilmsDAO.injectDB(client) //initial reference to films object in database
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})
import express from "express"
import cors from "cors"
import films from "./api/films.route.js"

const app = express()

app.use(cors()) //enable cors
app.use(express.json()) //our server can accept json in the body of message

app.use("/api/v1/films", films) //
app.use("*", (req,res) => res.status(404).json({error: "not found"})) //wildcard, any other route not defined

export default app
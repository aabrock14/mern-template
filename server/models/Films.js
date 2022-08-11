const mongoose =  require('mongoose')

const FilmSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
})

const Films = mongoose.model("films", FilmSchema)
module.exports = Films
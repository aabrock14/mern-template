import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let films

export default class FilmsDAO {
  static async injectDB(conn) { //how we initially connect to the DB, and call on startup
    if (films) {
      return
    }
    try {
      films = await conn.db(process.env.TIFF_DB_NS).collection("tiff2022")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in filmsDAO: ${e}`,
      )
    }
  }

  static async getFilms({  //what we call when we want to get all items in DB
    filters = null,
    page = 0,
    filmsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } }
      } else if ("webProgrammes" in filters) {
        query = { "webProgrammes": { $eq: filters["webProgrammes"] } }
      } 
    }
    //MongoDB queries are POWERFUL

    let cursor
    
    try {
      cursor = await films
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { filmsList: [], totalNumFilms: 0 }
    }

    const displayCursor = cursor.limit(filmsPerPage).skip(filmsPerPage * page)

    try {
      const filmsList = await displayCursor.toArray()
      const totalNumFilms = await films.countDocuments(query)

      return { filmsList, totalNumFilms }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { filmsList: [], totalNumFilms: 0 }
    }
  }
}



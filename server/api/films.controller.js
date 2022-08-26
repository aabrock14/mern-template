import FilmsDAO from "../dao/filmsDAO.js"

export default class FilmsController {
  static async apiGetFilms(req, res, next) {
    const filmsPerPage = req.query.filmsPerPage ? parseInt(req.query.filmsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.webProgrammes) {
      filters.webProgrammes = req.query.webProgrammes
    } else if (req.query.title) {
      filters.title = req.query.title
    }

    const { filmsList, totalNumFilms } = await FilmsDAO.getFilms({
      filters,
      page,
      filmsPerPage,
    }) //this sends the parameters to the object in the DAO file

    //and this is the response we get
    let response = {
      films: filmsList,
      page: page,
      filters: filters,
      entries_per_page: filmsPerPage,
      total_results: totalNumFilms,
    }
    res.json(response) //send the json back to whoever called this
  }
}
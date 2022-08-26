import express from "express"
import FilmsCtrl from "./films.controller.js"

const router = express.Router()

router.route("/").get(FilmsCtrl.apiGetFilms)

export default router
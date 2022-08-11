import React, { useState, useEffect } from "react"
import Axios from "axios"
import './App.css'

function App() {

  const [id, setID] = useState("")
  const [title, setTitle] = useState("")
  const [newtitle, setNewTitle] = useState("")
  const [filmList, setFilmList] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
    .then((response) => {
      setFilmList(response.data)
    })
}, [filmList])

  const addToList = () => {
    //console.log(id + title)
    Axios.post("http://localhost:3001/insert", {"id": id, "title": title})
  }

  const updateItem = (param) => {
    Axios.put("http://localhost:3001/update", {"id": param, "title": newtitle})
  }

  const deleteItem = (param) => {
    Axios.delete(`http://localhost:3001/delete/${param}`)
  }

  return (
    <div className="App">
      <h1>MERN Template</h1>
        <div className="main">
          <label>ID #</label>
          <input 
            type="number"
            onChange={(e) => {setID("T00000" + e.target.value)}} />
          <label>Text</label>
          <input
            type="text"
            onChange={(e) => {setTitle(e.target.value)}} />
          <button onClick={addToList}>Add to List</button>
        </div>
        <div className="display">
          <hr />
          {filmList.map((movie, key) => {
              return (
                <div className="item" key={key}>
                  <div>{movie.id} - {movie.title}</div>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => {setNewTitle(e.target.value)}} />
                    <button type="submit" onClick={() => updateItem(movie._id)}>
                      Update
                    </button>
                  </div>
                  <div><button onClick={() => deleteItem(movie._id)}>
                    Delete
                  </button></div>
                </div>
              )
          })}
        </div>
    </div>
  );
}

export default App;

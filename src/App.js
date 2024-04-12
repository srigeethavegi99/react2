import React, { useState, useEffect } from "react";
import './App.css';
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import app from "./firebase";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [state, setState] = useState({title: '', director: '', year: ''})
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = e => setState({...state, [e.target.name]: e.target.value})
  
  const db = getDatabase(app)
  const databaseRef = ref(db, 'movies')

  useEffect(() => {
    onValue(databaseRef, snapshot=>{
      if(snapshot.exists()){
        const data = snapshot.val()
        const keys = Object.keys(data)
        const object_arr = []
        keys.forEach(key=>object_arr.push({...data[key], id: key}))
        setMovies(object_arr)
      }else{
        setMovies([])
      }
    })
  }, []);

 


  const clearForm = () => {
    setState({director: '', title: '', year: ''})
  };

  const onEdit = obj => {
    setIsEditing(true)
    setState({...obj})
  }

  const onDelete = async(id) => {
    const dbref = ref(db, `movies/${id}`)
    set(dbref, null)
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    const {id, title, director, year} = state
    if(!(title && director && year)) return

    if(id){
      const dbref = ref(db, `movies/${id}`)
      set(dbref, {id, title, director, year})
      .then(()=>{
        setLoading(false)
        setIsEditing(false)
        setErrorMessage('')
        clearForm()
      })
      .catch((err)=>{
        setErrorMessage('Error occurred')
        setLoading(false)
      })
    }else{
      push(databaseRef, {title, director, year})
      .then(()=>{
        setLoading(false)
        setErrorMessage('')
        clearForm()
      })
      .catch((err)=>{
        setErrorMessage('Error occurred')
        setLoading(false)
      })
    }
  }

  return (
      <div>
        <h1>My Favorite Movies</h1>

        <div>
          {
            movies.map((item, index)=>(
              <React.Fragment key={index}>
                <p2>{item.title}</p2>
                <p>Directed by: {item.director}</p>
                <p>Released in: {item.year}</p>
                <button onClick={()=>onDelete(item.id)} style={{marginRight: 5}}>Delete</button>
                <button onClick={()=>onEdit(item)}>Edit</button>
                <br />
              </React.Fragment>
            ))
          }
        </div>

        <h2>{isEditing ? "Edit Movie" : "Add a New Movie"}</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title:</label>
          <input
              type="text" name="title" value={state.title}
              onChange={onChange}
          />
          <label htmlFor="director">Director:</label>
          <input
              type="text" name="director" value={state.director}
              onChange={onChange}
          />
          <label htmlFor="year">Year:</label>
          <input
              type="number" name="year" value={state.year}
              onChange={onChange}
          />
          <button type="submit">
            {loading ? "Loading..." : isEditing ? "Update Movie" : "Add Movie"}
            {/* {isEditing ? "Update Movie" : "Add Movie"} */}
          </button>
        </form>
      </div>
  );
};

export default App;

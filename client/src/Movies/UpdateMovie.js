import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = props =>{
  console.log(props);
  const [movie, setMovie] = useState();

  const getMovie = id =>{
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response))
  };

  useEffect(() =>{
    getMovie(props.match.params.id);
  },[props.match.params.id]);

  const changeHandler = e =>{ 
  setMovie({...movie, 
    [e.target.name]: e.target.value
  })};

  const handleSubmit = e =>{
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res =>{
        console.log('put res', res);
        props.history.push('/');
      })
      .catch(err => console.log(err.response))
  };

  if (!movie) {
    return <div>Loading...</div>;
  };

  return(
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        onChange={changeHandler}
        value={movie.title}
        placeholder="Title"
      />
      <input
        type="text"
        name="director"
        onChange={changeHandler}
        value={movie.director}
        placeholder="Director"
      />
      <input
        type="text"
        name="metascore"
        onChange={changeHandler}
        value={movie.metascore}
        placeholder="Metascore"
      />
      <input
        type="text"
        name="stars"
        onChange={changeHandler}
        value={movie.stars}
        placeholder="Stars"
      />
      <button>Update</button>
    </form>
  )
}

export default UpdateMovie;
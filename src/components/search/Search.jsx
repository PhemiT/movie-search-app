import React, {useState} from 'react'
import Card from '../card/Card'
import './search.css'

const Search = () => {

  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    e.preventDefault()

    const url = `https://api.themoviedb.org/3/search/movie?api_key=1203a55503bf625190b621df7625223d&language=en-US
    &query=${query}&page=1&include_adult=false`

    try {

        const res = await fetch(url)
        const data = await res.json()
        setMovies(data.results)

    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <div>
        <form className='form' onSubmit={searchMovies}>
            <label htmlFor="query" className='label'>Movie Name</label>
            <input type="text" className="input" name='query' 
            placeholder='i.e The Avengers' value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className='button' type='submit'>Search</button>
        </form>

        <div className="card-list">
          {movies.filter(movie => movie.poster_path).map(movie => (
            <Card movie={movie} key={movie.id}/>
          ))}
        </div>
    </div>
  )
}

export default Search
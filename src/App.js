import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import MoviesList from './MoviesList';
import SearchBar from './SearchBar'
import { searchMovies } from './client';

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [nominies, setNominies] = useState([])
  const [query, setQuery] = useState('')

  // like initState in flutter
  useEffect(() => {
    onSearchMovies('avengers')
  }, [])

  // second parameter acts as a stream, if nothing then it is similar to initState
  useEffect(() => {
    if (nominies.length === 5) {
      alert('selected 5 nominies!!!!')
    }
  }, [nominies])

  const onSearchMovies = (query) => {
    setLoading(true)
    searchMovies(query)
      .then(movies => {
        setMovies(movies)
        setLoading(false)
      })
      .catch(() => alert('couldnt get movies'))
  }

  const nominateMovie = movie => {
    const _nominies = [...nominies, movie]
    setNominies(_nominies)
  }

  const isPresentInNominationList = movie => {
    return nominies.includes(movie)
  }

  const removeNominatedMovie = (index) => {
    const _nominies = [...nominies];
    _nominies.splice(index, 1);
    setNominies(_nominies)
  }

  const handleSearch = value => {
    setQuery(value)
    debounce(onSearchMovies(value),5000)
  }

  return (
    <div>
      <Row style={{fontSize: 25}}> The Shoppies</Row>
      <Row><SearchBar value={query} onChange={handleSearch} /></Row>
      {loading ? <Row>Loading...</Row> : null}
      {nominies.length === 5  ? <Row>You have nominated 5 movies. Awesome!</Row> : null}
      {query.length > 0 && movies.length === 0 ? 
      <Row> No result found</Row> : <Row>
      <MoviesList movies={movies} nominateMovie={nominateMovie} canNominate={nominies.length < 5} isPresentInNominationList={isPresentInNominationList} />
      { nominies.length > 0 ?
        <NominationList>
          <div style={{margin: 10, fontSize: 20, fontWeight: "bold"}}> Nominations</div>
        {nominies.map((item) => {
          return <NominationItem>
            <div style={{ marginRight: 8 }}>{item.Title} ({item.Year})</div>
            <button onClick={() => removeNominatedMovie(nominies.indexOf(item))}>Remove</button>
          </NominationItem>
        })}
      </NominationList> : null}
    </Row> }
    </div>
  )
}


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const NominationList = styled.div`
  margin: 10px;
  padding: 8px;
  background: #F2F1F9;
  border-radius: 4px;

`

const NominationItem = styled.div`
  color: red;
  padding: 8px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  &:hover {
    background-color: white;
  }
`

export default App
// jsx
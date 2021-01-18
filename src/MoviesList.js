import React from 'react'
import styled from 'styled-components'
import './App.css'


const MoviesList = ({movies, nominateMovie, canNominate, isPresentInNominationList}) => {
    return(
        <MovieList>
          <div style={{margin: 10, fontSize: 20, fontWeight: "bold"}}> Movies list </div>
        {movies.map(movie => {
            return <MovieItem  canNominate={canNominate} onClickNominate={nominateMovie} movie={movie} isPresentInNominationList={isPresentInNominationList} />
        })}
    </MovieList>
    )
}

const MovieItem = ({
    movie,
    onClickNominate,
    canNominate,
    isPresentInNominationList
  }) => {
    return (
      <MovieItemContainer>
        <div style={{ marginRight: 8 }}>{movie.Title} ({movie.Year})</div>
        {canNominate ? 
        <button 
        disabled={isPresentInNominationList(movie)}
        onClick={() => onClickNominate(movie) }>Nominate</button> : null }
      </MovieItemContainer>
    )
  }

const MovieList = styled.div`
  margin: 10px;
  padding: 8px;
  background: #F2F1F9;
  border-radius: 4px;
`
const MovieItemContainer = styled.div`
  color: black;
  padding: 8px;
  display: flex;
  flex-direction: row;
  &:hover {
    background-color: white;
  }
`

export default MoviesList
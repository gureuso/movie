import React from 'react'
import Link from 'next/link'

class Movie extends React.Component {
  render() {
    const movie = this.props.movie
    return (
      <div className="card">
        <img className="card-img-top" src={movie.poster_url} alt="poster image" />
        <div className="card-body">
          <h4 className="card-title">
          <Link href={"/movie?id="+movie.id} as={"/movies/"+movie.id}><a style={{color: "#212529"}}>{movie.title}</a></Link>
          </h4>
          <p className="card-text">{movie.description}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">감독: {movie.director}</li>
            <li className="list-group-item">러닝타임: {movie.running_time}분</li>
            <li className="list-group-item">관람가: {movie.age_rating}세 이상 관람가</li>
          </ul>
          <br/>
          <Link href={{pathname: '/cinemas', query: {movie_id: movie.id}}}><a className="btn btn-primary">예매하기</a></Link>
        </div>
      </div>
    )
  }
}

export default Movie

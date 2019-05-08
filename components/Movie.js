import React from 'react';
import Link from 'next/link';

class MovieComponent extends React.Component {
  render() {
    const movie = this.props.movie
    return (
      <div class="card">
        <img class="card-img-top" src={movie.poster_url} alt="poster image" />
        <div class="card-body">
          <h4 class="card-title">
          <Link href={"/movies/"+movie.id}><a style={{color: "#212529"}}>{movie.title}</a></Link>
          </h4>
          <p class="card-text">{movie.description}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">감독: {movie.director}</li>
            <li class="list-group-item">러닝타임: {movie.running_time}분</li>
            <li class="list-group-item">관람가: {movie.age_rating}세 이상 관람가</li>
          </ul>
          <br/>
          <Link href={{pathname: '/cinemas', query: {movie_id: movie.id}}}><a class="btn btn-primary">예매하기</a></Link>
        </div>
      </div>
    )
  }
}

export default MovieComponent

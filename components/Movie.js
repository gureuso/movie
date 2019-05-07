import React from 'react';
import Link from 'next/link';

class MovieComponent extends React.Component {
  render() {
    return (
      <div class="card">
        <img class="card-img-top" src={this.props.poster_url} alt="poster image" />
        <div class="card-body">
          <h4 class="card-title">
            <Link href={"/movies/"+this.props.id}><a style={{color: "#212529"}}>{this.props.title}</a></Link>
          </h4>
          <p class="card-text">{this.props.description}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">감독: {this.props.director}</li>
            <li class="list-group-item">러닝타임: {this.props.running_time}분</li>
            <li class="list-group-item">관람가: {this.props.age_rating}세 이상 관람가</li>
          </ul>
          <br/>
          <Link href={"/cinemas?movie_id="+this.props.id}><a class="btn btn-primary">예매하기</a></Link>
        </div>
      </div>
    )
  }
}

export default MovieComponent

import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Error from './_error'

class Movie extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'https://apis.movie.gureuso.me/v1/movies/'+req.query.id;

    const res = await fetch(fetch_uri);
    const data = await res.json();

    return {
      status_code: data.code / 100,
      error_message: data.message,
      data: data.data
    };
  }

  create_movie() {
    const movie = this.props.data.movie;

    return (
      <div class="card" style={{width: 500}}>
        <img class="card-img-top" src={movie.poster_url} alt="Card image" />
        <div class="card-body">
          <h4 class="card-title">{movie.title}</h4>
          <p class="card-text">{movie.description}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">감독: {movie.director}</li>
            <li class="list-group-item">러닝타임: {movie.running_time}분</li>
            <li class="list-group-item">관람가: {movie.age_rating}세 이상 관람가</li>
          </ul>
          <br/>
          <Link href={"/cinemas?movie_id="+movie.id}><a class="btn btn-primary">예매하기</a></Link>
        </div>
      </div>
    );
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />;
    }

    return (
      <Layout title="Movie">
        {this.create_movie()}
      </Layout>
    );
  }
}

export default Movie

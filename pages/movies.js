import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Error from './_error'

class Movies extends React.Component {
  static async getInitialProps() {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/movies';
    const res = await fetch(fetch_uri);
    const data = await res.json();

    return {
      status_code: data.code / 100,
      error_message: data.message,
      data: data.data
    };
  }

  create_movies() {
    const movies = this.props.data.movies;

    let movie_list = []
    for(let movie of movies) {
      movie_list.push(
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
            <Link href={"/cinemas?movie_id="+movie.id}><a class="btn btn-primary">예매하기</a></Link>
          </div>
        </div>
      );
    }
    return movie_list;
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />;
    }
    
    return (
      <Layout title="Movies">
        <div class="card-group">
          {this.create_movies()}
        </div>
      </Layout>
    );
  }
}

export default Movies

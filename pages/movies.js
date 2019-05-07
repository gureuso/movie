import React from 'react';
import fetch from 'isomorphic-unfetch';

import Error from './_error';
import MovieComponent from '../components/Movie';

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
        <MovieComponent id={movie.id} title={movie.title} poster_url={movie.poster_url} description={movie.description} director={movie.director} 
        running_time={movie.running_time} age_rating={movie.age_rating} />
      );
    }
    return movie_list;
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />;
    }
    
    return (
      <div class="card-group">
        {this.create_movies()}
      </div>
    );
  }
}

export default Movies

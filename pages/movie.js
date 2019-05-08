import React from 'react';
import fetch from 'isomorphic-unfetch';

import Error from './_error';
import MovieComponent from '../components/Movie';

class Movie extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/movies/'+req.query.id;

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
      <MovieComponent movie={movie} />
    );
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />;
    }

    return (
      <div>
        <style global jsx>{`
          .card {
            width: 450px;
          }
        `}</style>
        {this.create_movie()}
      </div>
    );
  }
}

export default Movie

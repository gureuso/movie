import React from 'react'
import fetch from 'isomorphic-unfetch'

import Error from './_error'
import Movie from '../components/Movie'
import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'

class MoviePage extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/movies/'+req.query.id

    const res = await fetch(fetch_uri)
    const data = await res.json()

    return {
      status_code: data.code / 100,
      error_message: data.message,
      data: data.data
    };
  }

  create_movie() {
    const movie = this.props.data.movie

    return (
      <Movie movie={movie}/>
    );
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />
    }

    return (
      <div>
        <Header title="signin"/>
        <Nav/>
        <style global jsx>{`
          @media all and (min-width: 501px) {
            .card {
              width: 450px;
            }
          }
        `}</style>
        {this.create_movie()}
      </div>
    );
  }
}

export default MoviePage

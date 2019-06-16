import React from 'react'
import fetch from 'isomorphic-unfetch'

import Error from './_error'
import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'
import Movie from '../components/Movie'

class MoviesPage extends React.Component {
  static async getInitialProps() {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/movies'
    const res = await fetch(fetch_uri)
    const data = await res.json()

    return {
      status_code: data.code / 100,
      error_message: data.message,
      data: data.data
    };
  }

  create_movies() {
    const movies = this.props.data.movies

    let movie_list = []
    for(let movie of movies) {
      movie_list.push(
        <Movie key={movie.id} movie={movie}/>
      )
    }
    return movie_list
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />
    }
    
    return (
      <div>
        <Header title="movies"/>
        <Nav/>
        <div className="card-group">
          {this.create_movies()}
        </div>
      </div>
    );
  }
}

export default MoviesPage

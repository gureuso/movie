import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'
import Error from './_error'

class CinemasPage extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/cinemas?'
    if(req.query.movie_id) {
      fetch_uri += 'movie_id='+req.query.movie_id+'&'
    }

    const res = await fetch(fetch_uri)
    const data = await res.json()

    return {
      status_code: data.code / 100,
      error_message: data.message,
      data: data.data
    };
  }

  create_cinemas() {
    const cinemas = this.props.data.cinemas
    const movie_id = this.props.data.movie_id

    let cinema_list = []
    for(let cinema of cinemas) {
      cinema_list.push(
        <div className="card" key={cinema.id}>
          <img className="card-img-top" src={cinema.image_url} alt="cinema image" />
          <div className="card-body">
            <h4 className="card-title">{cinema.title}</h4>
            <p className="card-text">{cinema.address} {cinema.detail_address}</p>
            <Link href={{pathname: '/showtimes', query: {cinema_id: cinema.id, movie_id: movie_id}}}><a className="btn btn-primary">예매하기</a></Link>
          </div>
        </div>
      )
    }
    return cinema_list
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />
    }

    return (
      <div>
        <Header title="cinemas"/>
        <Nav/>
        <div className="card-columns">
          {this.create_cinemas()}
        </div>
      </div>
    )
  }
}

export default CinemasPage

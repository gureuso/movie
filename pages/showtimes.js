import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'

import Error from './_error'
import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'

class ShowtimesPage extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/showtimes?'
    if(req.query.date) {
      fetch_uri += 'date='+req.query.date+'&'
    }
    if(req.query.cinema_id) {
      fetch_uri += 'cinema_id='+req.query.cinema_id+'&'
    }
    if (req.query.movie_id) {
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

  create_week() {
    const week = this.props.data.week
    const selected = this.props.data.selected

    let week_list = []
    for(let w of week) {
      let active = ''
      if(w.date == selected.date) {
        active='active'
      }
      let url = "/showtimes?date=" + w.date
      if(selected.movie_id) {
        url += '&movie_id='+selected.movie_id
      }
      if(selected.cinema_id) {
        url += '&cinema_id='+selected.cinema_id
      }
      week_list.push(
        <li className="nav-item" key={w.date}>
          <Link href={url}><a className={"nav-link "+active}>{w.weekday}</a></Link>
        </li>
      )
    }
    return week_list
  }

  create_movies() {
    const movies = this.props.data.movies

    let movie_list = []
    for(let movie of movies) {
      let showtime_list = []
      for(let showtime of movie.showtimes) {
        if(showtime.start_time < moment().format('YYYYMMDDHHmm')) {
          showtime_list.push(
            <Link key={showtime.id} href={"/theaters?theater_id="+showtime.theater.id+"&showtime_id="+showtime.id} as={"/theaters/"+showtime.theater.id+"/showtimes/"+showtime.id}>
              <a className="list-group-item list-group-item-action disabled">
                {moment(showtime.start_time, 'YYYYMMDDHHmm').format('HH:mm')} ~ {moment(showtime.end_time, 'YYYYMMDDHHmm').format('HH:mm')}
                &nbsp;/&nbsp;
                {showtime.theater.title} 매진
              </a>
            </Link>
          )
        } else {
          showtime_list.push(
            <Link key={showtime.id} href={"/theaters?theater_id="+showtime.theater.id+"&showtime_id="+showtime.id} as={"/theaters/"+showtime.theater.id+"/showtimes/"+showtime.id}>
              <a className="list-group-item list-group-item-action">
                {moment(showtime.start_time, 'YYYYMMDDHHmm').format('HH:mm')} ~ {moment(showtime.end_time, 'YYYYMMDDHHmm').format('HH:mm')}
                &nbsp;/&nbsp;
                {showtime.theater.title} {showtime.theater.seat}석
              </a>
            </Link>
          )
        }
      }
      movie_list.push(
        <div className="list-group" key={movie.id}>
          <Link href={"/movie?id="+movie.id} as={"/movies/"+movie.id}><a className="list-group-item list-group-item-action">
            {movie.title} / {movie.director} / {movie.age_rating}세 이상 관람가
          </a></Link>
          {showtime_list}
        </div>
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
        <Header title="showtimes"/>
        <Nav/>
        <ul className="nav nav-tabs">
          {this.create_week()}
        </ul>
        {this.create_movies()}
      </div>
    );
  };
}

export default ShowtimesPage

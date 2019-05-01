import React from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout.js';

class Theaters extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/theaters/'+req.query.theater_id+'/showtimes/'+req.query.showtime_id;

    const res = await fetch(fetch_uri);
    const data = await res.json();

    return {
      data: data.data
    };
  }

  create_theaters() {
    const seats = this.props.data.seats;
    const theater_id = this.props.data.theater_id;
    const showtime_id = this.props.data.showtime_id;

    let seat_list = []
    for(let seat of seats) {
      if(seat.selected_seat) {
        seat_list.push(
          <span class="border border-danger theater-box" data-showtime-id={showtime_id} data-theater-id={theater_id}>{seat.seat_number}</span>
        )
      } else {
        seat_list.push(
          <span class="border border-primary theater-box" data-showtime-id={showtime_id} data-theater-id={theater_id}>{seat.seat_number}</span>
        )
      }
    }
    return (
      seat_list
    );
  }

  render() {
    return (
      <Layout title="Theaters">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-3 text-center">스크린</h1>
          </div>
        </div>
        {this.create_theaters()}
        <script src="/static/js/theaters.js"></script>
      </Layout>
    );
  }
}

export default Theaters

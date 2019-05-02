import React from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout.js';

class Theaters extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'https://apis.movie.gureuso.me/v1/theaters/'+req.query.theater_id+'/showtimes/'+req.query.showtime_id;

    const res = await fetch(fetch_uri);
    const data = await res.json();

    return {
      data: data.data
    };
  }

  create_theaters() {
    const seats = this.props.data.seats;

    let seat_list = [];
    let cnt = 0;
    for(let seat of seats) {
      if(seat.selected_seat) {
        seat_list.push(
          <span class="border border-danger theater-box">{seat.seat_number}</span>
        )
      } else {
        seat_list.push(
          <span class="border border-primary theater-box">{seat.seat_number}</span>
        )
      }

      cnt++;
      if(cnt % 10 == 0) {
        seat_list.push(<br/>)
      }
    }
    return (
      seat_list
    );
  }

  render() {
    return (
      <Layout title="Theaters">
        <input type="hidden" id="theater_id" value={this.props.data.theater_id} />
        <input type="hidden" id="showtime_id" value={this.props.data.showtime_id} />
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-3 text-center">스크린</h1>
          </div>
        </div>
        <div class="theater">
          {this.create_theaters()}
        </div>
        <script src="/static/js/theaters.js"></script>
      </Layout>
    );
  }
}

export default Theaters

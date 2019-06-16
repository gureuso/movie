import React from 'react'
import fetch from 'isomorphic-unfetch'

import Error from './_error'
import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'

class TheatersPage extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'http://apis.movie.gureuso.me/v1/theaters/'+req.query.theater_id+'/showtimes/'+req.query.showtime_id

    const res = await fetch(fetch_uri)
    const data = await res.json()

    return {
      status_code: data.code / 100,
      error_message: data.message,
      data: data.data
    }
  }
  
  componentDidMount() {
    $(".theater-box").click(function () {
      const seat_number = $(this).text();
      const seat = seat_number.split("-");
      const showtime_id = $("#showtime_id").val();
      const theater_id = $("#theater_id").val();
      if($(this).hasClass("border-primary")) {
        if (confirm(seat_number+"자리로 예매하시겠습니까?")) {
          const uri = "http://apis.movie.gureuso.me/v1/theater_tickets"
          const data = {showtime_id: showtime_id, theater_id: theater_id, x: seat[0], y: seat[1]};
          $.post(uri, data, function () {
          })
          .done(function() {
            alert("예약되었습니다.");
            location.reload();
          })
          .fail(function(data) {
            alert(data.status);
          });
        }
      } else {
        return alert("이미 예약한 자리입니다.");
      }
    })
  }

  create_theaters() {
    const seats = this.props.data.seats

    let seat_list = []
    let cnt = 0
    for(let seat of seats) {
      if(seat.selected_seat) {
        seat_list.push(
          <span key={seat.seat_number} className="border border-danger theater-box">{seat.seat_number}</span>
        )
      } else {
        seat_list.push(
          <span key={seat.seat_number} className="border border-primary theater-box">{seat.seat_number}</span>
        )
      }

      cnt++
      if(cnt % 10 == 0) {
        seat_list.push(<br key={cnt}/>)
      }
    }
    return (
      seat_list
    )
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />
    }

    return (
      <div>
        <Header title="theaters"/>
        <Nav/>
        <input type="hidden" id="theater_id" value={this.props.data.theater_id} />
        <input type="hidden" id="showtime_id" value={this.props.data.showtime_id} />
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3 text-center">스크린</h1>
          </div>
        </div>
        <div className="theater">
          {this.create_theaters()}
        </div>
      </div>
    )
  }
}

export default TheatersPage

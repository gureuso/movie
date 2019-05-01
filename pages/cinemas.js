import React from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout.js';

class Cinemas extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'https://apis.movie.gureuso.me/v1/cinemas?';
    if(req.query.movie_id) {
      fetch_uri += 'movie_id='+req.query.movie_id+'&';
    }

    const res = await fetch(fetch_uri);
    const data = await res.json();

    return {
      data: data.data
    };
  }

  create_cinemas() {
    const cinemas = this.props.data.cinemas;

    let cinema_list = [];
    for(let cinema of cinemas) {
      cinema_list.push(
        <div class="card">
          <img class="card-img-top" src={cinema.image_url} alt="cinema image" />
          <div class="card-body">
            <h4 class="card-title">{cinema.title}</h4>
            <p class="card-text">{cinema.address} {cinema.detail_address}</p>
            <a href={"/showtimes?cinema_id="+cinema.id+"&movie_id="+this.props.data.movie_id} class="btn btn-primary">예매하기</a>
          </div>
        </div>
      );
    }
    return cinema_list;
  }

  render() {
    return (
      <Layout title="Cinemas">
        <div class="card-columns">
          {this.create_cinemas()}
        </div>
      </Layout>
    );
  }
}

export default Cinemas

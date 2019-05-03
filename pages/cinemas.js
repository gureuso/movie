import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import Error from './_error'

class Cinemas extends React.Component {
  static async getInitialProps(req) {
    let fetch_uri = 'http://gureuso.me:5001/v1/cinemas?';
    if(req.query.movie_id) {
      fetch_uri += 'movie_id='+req.query.movie_id+'&';
    }

    const res = await fetch(fetch_uri);
    const data = await res.json();

    return {
      status_code: data.code / 100,
      error_message: data.message,
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
            <Link href={"/showtimes?cinema_id="+cinema.id+"&movie_id="+this.props.data.movie_id}><a class="btn btn-primary">예매하기</a></Link>
          </div>
        </div>
      );
    }
    return cinema_list;
  }

  render() {
    if(!this.props.data) {
      return <Error statusCode={this.props.status_code} message={this.props.error_message} />;
    }

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

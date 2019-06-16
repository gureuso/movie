import React from 'react';
import Router from 'next/router';

class IndexPage extends React.Component {
  componentDidMount() {
    Router.push('/showtimes');
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default IndexPage

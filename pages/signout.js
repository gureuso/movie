import React from 'react';
import Router from 'next/router'

class SignoutPage extends React.Component {
  componentDidMount() {
    localStorage.setItem('token', '')
    Router.push('/showtimes')
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default SignoutPage

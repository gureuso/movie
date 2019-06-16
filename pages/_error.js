import React from 'react'

import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { 
      statusCode: statusCode,
    }
  }

  render() {
    return (
      <div>
        <Header title="error"/>
        <Nav/>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">{this.props.statusCode}</h1>
            <p class="lead">{this.props.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Error

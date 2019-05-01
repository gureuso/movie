import React from 'react';

import Header from './Header';

class Layout extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "/static/js/sign_url.js";
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <Header title={this.props.title}/>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb" style={{margin: 0}}>
            <li class="breadcrumb-item"><a href="/movies">영화</a></li>
            <li class="breadcrumb-item"><a href="/showtimes">예매</a></li>
            <li class="ml-auto">
            </li>
          </ol>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default Layout

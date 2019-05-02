import React from 'react';
import Link from 'next/link';

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
            <li class="breadcrumb-item"><Link href="/movies"><a>영화</a></Link></li>
            <li class="breadcrumb-item"><Link href="/showtimes"><a>예매</a></Link></li>
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

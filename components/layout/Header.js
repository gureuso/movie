import React from 'react'
import Head from 'next/head'

class Header extends React.Component {
  render() {
    const title = this.props.title
    return (
      <Head>
        <title>{title}</title>
      </Head>
    )
  }
}

export default Header

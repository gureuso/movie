import React from 'react'
import Link from 'next/link'

class Nav extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    let element = document.getElementById('logged-in')
    if(token) {
      element = document.getElementById('logged-out')
    }
    element.classList.remove('d-none')
    element.classList.add('d-block')
  }

  render() {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{margin: 0}}>
          <li className="breadcrumb-item"><Link href="/movies"><a>영화</a></Link></li>
          <li className="breadcrumb-item"><Link href="/showtimes"><a>예매</a></Link></li>
          <li className="ml-auto">
            <div id="logged-in" className="d-none">
              <Link href="/signup"><a>회원가입</a></Link>
              &nbsp;/&nbsp;
              <Link href="/signin"><a>로그인</a></Link>
            </div>
            <div id="logged-out" className="d-none">
              <Link href="/signout"><a>로그아웃</a></Link>
            </div>
          </li>
        </ol>
      </nav>
    )
  }
}

export default Nav

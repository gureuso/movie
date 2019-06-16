import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login'

import Header from '../components/layout/Header'
import Nav from '../components/layout/Nav'

class SigninPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()

    const uri = 'http://apis.movie.gureuso.me/v1/users/signin'
    let formData = new FormData()
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)

    await axios({
      method: 'post',
      url: uri,
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
      .then(function (response) {
        const data = response.data.data
        localStorage.setItem('token', data.token)
        Router.push('/showtimes')
      })
      .catch(function (error) {
        const status = error.response.status
        if(status==400) {
          alert('bad request.')
        } else if(status==404) {
          alert('아이디 또는 비밀번호가 잘못되었습니다.')
        }
      })
  }

  responseGoogle(response) {
    const data = response.profileObj
    const tokenId = response.tokenId
    
    let formData = new FormData()
    formData.append('id_token', tokenId)

    const uri = 'http://apis.movie.gureuso.me/v1/users/callback'
    axios({
      method: 'post',
      url: uri,
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
      .then(function (response) {
        const data = response.data.data
        localStorage.setItem('token', data.token)
        Router.push('/showtimes')
      })
      .catch(function (error) {
        const status = error.response.status
        console.log(status)
      });
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if(token) {
      Router.push('/showtimes')
    }
  }

  render() {
    return (
      <div>
        <Header title="signin"/>
        <Nav/>
        <form onSubmit={this.handleSubmit} className="sign-form">
          <img src="/static/images/3.png" className="sign-form-img" />
          <input type="email" onChange={this.handleEmailChange} className="form-control form-control-lg" name="email" placeholder="Email" required />
          <input type="password" onChange={this.handlePasswordChange} className="form-control form-control-lg" name="password" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block sign-form-btn" type="submit">Sign in</button>
          <GoogleLogin
            clientId="485933391623-5806uemc2ksqf7q7gjoturtqhl0110k4.apps.googleusercontent.com"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            className="google-sign-form-btn"
          />
          <br/>
          <Link href="/signup"><a>Signup</a></Link>
        </form>
      </div>
    )
  }
}

export default SigninPage

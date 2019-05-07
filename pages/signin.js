import React from 'react';
import Link from 'next/link';
import axios from "axios";
import { GoogleLogin } from 'react-google-login';

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const uri = 'http://apis.movie.gureuso.me/v1/signin';
    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    await axios({
      method: 'post',
      url: uri,
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
        console.log(response.data.data);
        setCookie('logged_in', 'true', 1);
        window.location.href = "/"
      })
      .catch(function (error) {
        const status = error.response.status;
        if(status==400) {
          alert('bad request.');
        } else if(status==404) {
          alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
      });
  }

  responseGoogle(response) {
    console.log(response.profileObj);
    setCookie('logged_in', 'true', 1);
    window.location.href = "/"
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="sign-form">
        <img src="/static/images/3.png" class="sign-form-img" />
        <input type="email" onChange={this.handleEmailChange} class="form-control form-control-lg" name="email" placeholder="Email" required />
        <input type="password" onChange={this.handlePasswordChange} class="form-control form-control-lg" name="password" placeholder="Password" required />
        <button class="btn btn-lg btn-primary btn-block sign-form-btn" type="submit">Sign in</button>
        <GoogleLogin
          clientId="485933391623-5806uemc2ksqf7q7gjoturtqhl0110k4.apps.googleusercontent.com"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          className="google-sign-form-btn"
        />
        <br/>
        <Link href="/signup"><a>Signup</a></Link>
      </form>
    );
  }
}

export default Signin

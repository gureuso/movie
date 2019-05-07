import React from 'react';
import Link from 'next/link';
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      nickname: '',
      phone: '',
      age: '',
    };
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleNicknameChange(event) {
    this.setState({nickname: event.target.value});
  }

  handlePhoneChange(event) {
    this.setState({phone: event.target.value});
  }

  handleAgeChange(event) {
    this.setState({age: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const uri = 'http://apis.movie.gureuso.me/v1/signup';
    let formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('nickname', this.state.nickname);
    formData.append('phone', this.state.phone);
    formData.append('age', this.state.age);

    await axios({
      method: 'post',
      url: uri,
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
          console.log(response.data.data);
          window.location.href = "/signin"
      })
      .catch(function (error) {
        const status = error.response.status;
        if(status==400) {
          alert('이미 존재하는 유저입니다.');
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="sign-form">
        <img src="/static/images/3.png" class="sign-form-img" />
        <input type="email" onChange={this.handleEmailChange} class="form-control form-control-lg" name="email" placeholder="Email" required />
        <input type="password" onChange={this.handlePasswordChange} class="form-control form-control-lg" name="password" placeholder="Password" required />
        <input type="text" onChange={this.handleNicknameChange} class="form-control form-control-lg" name="nickname" placeholder="Nickname" required />
        <input type="number" onChange={this.handlePhoneChange} class="form-control form-control-lg" name="phone" placeholder="Phone: '-'제외" required />
        <input type="number" onChange={this.handleAgeChange} class="form-control form-control-lg" name="age" placeholder="Age" max="100" required />
        <button class="btn btn-lg btn-primary btn-block sign-form-btn">Sign up</button>
        <Link href="/signin"><a>Signin</a></Link>
      </form>
    );
  }
}

export default Signup

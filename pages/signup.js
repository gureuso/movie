import React from 'react';

import Layout from '../components/Layout.js';

class Signup extends React.Component {
  render() {
    return (
      <Layout title="Signup">
        <div class="sign-form">
          <img src="/static/images/3.png" class="sign-form-img" />
          <input type="email" class="form-control form-control-lg" name="email" placeholder="Email" required />
          <input type="password" class="form-control form-control-lg" name="password" placeholder="Password" required />
          <input type="text" class="form-control form-control-lg" name="nickname" placeholder="Nickname" required />
          <input type="number" class="form-control form-control-lg" name="phone" placeholder="Phone: '-'제외" required />
          <input type="number" class="form-control form-control-lg" name="age" placeholder="Age" max="100" required />
          <button class="btn btn-lg btn-primary btn-block sign-form-btn">Sign up</button>
          <a href="/signin">Signin</a>
        </div>
        <script src="/static/js/signup.js"></script>
      </Layout>
    );
  }
}

export default Signup

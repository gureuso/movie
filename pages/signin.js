import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import Layout from '../components/Layout';

class Signin extends React.Component {
  render() {
    return (
      <Layout title="Signin">
        <Head>
          <meta name="google-signin-scope" content="profile email" />
          <meta name="google-signin-client_id" content="485933391623-5806uemc2ksqf7q7gjoturtqhl0110k4.apps.googleusercontent.com" />
          <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>  
          <script src="/static/js/google-signin.js"></script>
        </Head>
        <div class="sign-form">
          <img src="/static/images/3.png" class="sign-form-img" />
          <input type="email" class="form-control form-control-lg" name="email" placeholder="Email" />
          <input type="password" class="form-control form-control-lg" name="password" placeholder="Password" />
          <button class="btn btn-lg btn-primary btn-block sign-form-btn">Sign in</button>
          <div id="sign-form-google-btn"></div>
          <Link href="/signup"><a>Signup</a></Link>
        </div>
        <script src="/static/js/signin.js"></script>
      </Layout>
    );
  }
}

export default Signin

import React from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';

class Signout extends React.Component {
render() {
    return (
      <Layout title="Signout">
        <Head>
        </Head>
        <script src="/static/js/google-signout.js"></script>
        <script src="/static/js/signout.js"></script>
      </Layout>
    );
  }
}

export default Signout

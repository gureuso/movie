import React from 'react';

import Layout from '../components/Layout';

class Signout extends React.Component {
render() {
    return (
      <Layout title="Signout">
        <script src="/static/js/signout.js"></script>
        <script src="/static/js/google-signout.js"></script>
      </Layout>
    );
  }
}

export default Signout

import React from 'react';

class Signout extends React.Component {
  componentDidMount() {
    deleteCookie("logged_in")
    window.location.href = "/signin"
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Signout

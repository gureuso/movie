import React from 'react'

class Nav extends React.Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">showtimes</li>
                <li class="ml-auto">
                  <a href="/signup">login</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default Nav

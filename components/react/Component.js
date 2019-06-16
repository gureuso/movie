import React from 'react'

import config from '../../config.json'

class Component extends React.Component {
  static defaultProps = {
    APP_MODE: config.APP_MODE,
    APP_API_HOST: config.APP_API_HOST
  }
}

export default Component 

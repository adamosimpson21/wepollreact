import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'

class ErrorBoundary extends Component {
  render () {
    if (this.props.errors.message!==null) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps)(ErrorBoundary);

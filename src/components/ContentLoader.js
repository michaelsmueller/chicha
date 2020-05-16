import React, { Component } from 'react';
import Error from '../views/Error';
import Loading from '../views/Loading';

export default class ContentLoader extends Component {
  state = { data: {}, status: 'loading', error: null };

  componentDidMount = () => {
    const { asyncFunc, params } = this.props;
    asyncFunc(params)
      .then(({ data }) => this.setState({ data, status: 'loaded', error: null }))
      .catch((error) => this.setState({ status: 'error', error: error.message }))
  }

  render() {
    const { data, status, error } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'error':
        return <Error error={error} />;
      default:
        return children(data);
    }
  }
}

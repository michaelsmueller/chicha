import React, { Component } from 'react';
import Error from '../views/Error';
import Loading from '../views/Loading';

export default class ContentLoader extends Component {
  state = { data: {}, STATUS: 'LOADING', error: null };

  componentDidMount = () => {
    const { asyncFunc, params } = this.props;
    asyncFunc(params)
      .then(({ data }) => this.setState({ data, STATUS: 'LOADED', error: null }))
      .catch((error) => this.setState({ STATUS: 'ERROR', error: error.message }))
  }

  render() {
    const { data, STATUS, error } = this.state;
    const { children } = this.props;
    switch (STATUS) {
      case 'LOADING':
        return <Loading />;
      case 'ERROR':
        return <Error error={error} />;
      default:
        return children(data);
    }
  }
}

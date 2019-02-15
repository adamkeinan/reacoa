import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import withErrorBoundary from '../WithErrorBoundary';
import { isPromiseAlike } from '../../../util/universal';
import WarpperCenter from '../WarpperCenter';

@withErrorBoundary()
class Checker extends Component {
  static propTypes = {
    onCheck: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      passed: false,
    };
    const { onCheck } = props;
    const checker = onCheck();
    if (isPromiseAlike(checker)) {
      (async () => {
        const passed = await onCheck();
        this.setState({ loading: false, passed });
      })();
    } else {
      this.setState({ loading: false, passed: checker });
    }
  }

  render() {
    const { loading, passed } = this.state;
    if (loading) {
      return (
        <WarpperCenter style={{ height: '80vh' }}>
          <Loading type="spinningBubbles" color="rgb(83,116,181)" />
        </WarpperCenter>
      );
    }
    return passed
      ? this.props.children
      : 'not passed';
  }
}

export default Checker;

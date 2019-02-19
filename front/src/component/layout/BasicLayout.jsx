import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withErrorBoundary from '../lib/WithErrorBoundary';
import WarpperFullScreen from '../lib/WarpperFullScreen';

@withErrorBoundary()
class BasicLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <WarpperFullScreen>
        {this.props.children}
      </WarpperFullScreen>
    );
  }
}

export default BasicLayout;

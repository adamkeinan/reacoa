import React, {Component} from 'react';
import withErrorBoundary from '../component/lib/WithErrorBoundary';
import TestPage from '../component/lib/Test';

@withErrorBoundary()
class Test extends Component {
  render() {
    return (
      <React.Fragment>
        <TestPage />
      </React.Fragment>
    );
  }
}

export default Test;

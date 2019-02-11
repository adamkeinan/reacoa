import React, {Component} from 'react';
import withErrorBoundary from '../component/lib/WithErrorBoundary';
import Example from '../component/lib/Example';

@withErrorBoundary()
class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <Example/>
      </React.Fragment>
    );
  }
}

export default Index;

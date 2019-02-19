import React, { Component } from 'react';
import withErrorBoundary from '../component/lib/WithErrorBoundary';
import Example from '../component/lib/Example';
import BasicLayout from '../component/layout/BasicLayout';

@withErrorBoundary()
class Index extends Component {
  render() {
    return (
      <BasicLayout>
        <Example />
      </BasicLayout>
    );
  }
}

export default Index;

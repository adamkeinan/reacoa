import React from 'react';
import ReactDOM from 'react-dom';
import Unit from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Unit />, div);
  ReactDOM.unmountComponentAtNode(div);
});

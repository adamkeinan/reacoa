import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Outer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate( -50%, -50%);
`;

const WarpperCenter = ({ children, ...props }) => {
  return (
    <Outer {...props}>
      <Inner>{children}</Inner>
    </Outer>
  );
};
WarpperCenter.propTypes = {
  children: PropTypes.node.isRequired,
};
export default WarpperCenter;

/* eslint react/forbid-prop-types: 0 */
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

const WarpperCenter = ({ OuterProps, InnerProps, children }) => {
  return (
    <Outer {...OuterProps}>
      <Inner {...InnerProps}>{children}</Inner>
    </Outer>
  );
};
WarpperCenter.propTypes = {
  OuterProps: PropTypes.object,
  InnerProps: PropTypes.object,
  children: PropTypes.node.isRequired,
};
WarpperCenter.defaultProps = {
  OuterProps: {},
  InnerProps: {},
};
export default WarpperCenter;

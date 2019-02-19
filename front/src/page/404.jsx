import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BasicLayout from '../component/layout/BasicLayout';

const Box = styled.p`text-align: center`;

const NotFound = () => (
  <BasicLayout>
    <Box>404 PAGE NOT FOUND</Box>
    <Box><Link to="/">Home</Link></Box>
  </BasicLayout>
);

export default NotFound;

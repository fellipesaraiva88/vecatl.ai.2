import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  background: var(--background);
  min-height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  padding: 48px 40px 40px 40px;
  background: var(--background);
`;

const PageTemplate = ({ Component }: { Component: React.FC }) => (
  <Layout>
    <Sidebar />
    <Content>
      <Component />
    </Content>
  </Layout>
);

export default PageTemplate;

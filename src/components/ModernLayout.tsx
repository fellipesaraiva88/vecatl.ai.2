import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--background-solid);
  position: relative;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 280px;
  bottom: 0;
  background: var(--background);
  opacity: 0.05;
  z-index: 0;
  pointer-events: none;
`;

const MainContent = styled.main`
  flex: 1;
  margin-right: 280px;
  padding: var(--spacing-2xl);
  position: relative;
  z-index: 1;
  min-height: 100vh;
  overflow-y: auto;
  
  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 3px;
    opacity: 0.5;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    opacity: 1;
  }
  
  @media (max-width: 1024px) {
    margin-right: 0;
    padding: var(--spacing-lg);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PageHeader = styled.header`
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--card-border);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--foreground);
  margin: 0 0 var(--spacing-sm) 0;
  background: linear-gradient(135deg, var(--primary-solid) 0%, var(--sidebar-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: var(--foreground-muted);
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
`;

const FloatingElements = styled.div`
  position: fixed;
  top: 20%;
  right: 320px;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--primary-solid), var(--sidebar-accent));
  border-radius: 50%;
  opacity: 0.03;
  filter: blur(40px);
  animation: float 6s ease-in-out infinite;
  z-index: 0;
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 60%;
    left: -50%;
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, var(--accent), var(--primary-light));
    border-radius: 50%;
    filter: blur(30px);
    animation: float 8s ease-in-out infinite reverse;
  }
`;

interface ModernLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  showHeader = true 
}) => {
  return (
    <LayoutContainer>
      <BackgroundGradient />
      <FloatingElements />
      <MainContent>
        <ContentWrapper>
          {showHeader && (title || subtitle) && (
            <PageHeader>
              {title && <PageTitle>{title}</PageTitle>}
              {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
            </PageHeader>
          )}
          {children}
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default ModernLayout;

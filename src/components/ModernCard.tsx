import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const getCardVariant = (variant: string) => {
  switch (variant) {
    case 'glass':
      return css`
        background: var(--glass-bg);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid var(--glass-border);
        box-shadow: var(--glass-shadow);
      `;
    case 'gradient':
      return css`
        background: linear-gradient(135deg, var(--card-bg) 0%, rgba(139, 92, 246, 0.05) 100%);
        border: 1px solid var(--card-border);
        box-shadow: var(--card-shadow);
      `;
    case 'elevated':
      return css`
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        box-shadow: var(--card-shadow-hover);
        transform: translateY(-2px);
      `;
    default:
      return css`
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        box-shadow: var(--card-shadow);
      `;
  }
};

const getCardSize = (size: string) => {
  switch (size) {
    case 'sm':
      return css`
        padding: var(--spacing-md);
        border-radius: 12px;
      `;
    case 'lg':
      return css`
        padding: var(--spacing-2xl);
        border-radius: 20px;
      `;
    default:
      return css`
        padding: var(--spacing-lg);
        border-radius: var(--card-radius);
      `;
  }
};

const StyledCard = styled.div<CardProps>`
  ${({ variant = 'default' }) => getCardVariant(variant)}
  ${({ size = 'md' }) => getCardSize(size)}
  
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  
  ${({ interactive }) =>
    interactive &&
    css`
      cursor: pointer;
      
      &:hover {
        box-shadow: var(--card-shadow-hover);
        transform: translateY(-4px);
      }
      
      &:active {
        transform: translateY(-2px);
      }
    `}
  
  /* Efeito de brilho sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
    pointer-events: none;
  }
  
  ${({ interactive }) =>
    interactive &&
    css`
      &:hover::before {
        left: 100%;
      }
    `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--card-border);
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
  line-height: 1.4;
`;

const CardSubtitle = styled.p`
  font-size: 0.875rem;
  color: var(--foreground-muted);
  margin: var(--spacing-xs) 0 0 0;
  line-height: 1.5;
`;

const CardContent = styled.div`
  color: var(--foreground);
  line-height: 1.6;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--card-border);
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const ModernCard: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  interactive = false,
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      size={size}
      interactive={interactive}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

// Componentes auxiliares para estruturação do card
ModernCard.Header = CardHeader;
ModernCard.Title = CardTitle;
ModernCard.Subtitle = CardSubtitle;
ModernCard.Content = CardContent;
ModernCard.Footer = CardFooter;
ModernCard.Actions = CardActions;

export default ModernCard;

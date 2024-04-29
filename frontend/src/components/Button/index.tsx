import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { BORDER_RADIUS, FONT_SIZE } from '@/styles/common';

const lightFontColors: string[] = ['#000', '#735cff', '#e9b43a'];

const ButtonContent = styled.button`
  height: 4.4rem;
  border: none;
  border-radius: ${BORDER_RADIUS.circle};
  margin: 0;
  position: relative;
  background-color: ${(props) => props.color};
  box-shadow: var(--shadow);
  color: ${(props) => (lightFontColors.includes(props.color ?? 'none') ? '#fff' : '#000')};
  font-size: ${FONT_SIZE.md};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const XLargeButton = styled(ButtonContent)`
  width: 94%;
`;

const LargeButton = styled(ButtonContent)`
  width: calc(94% - 9.6rem);
`;

const MediumButton = styled(ButtonContent)`
  width: auto;
  padding: 0 1.6rem;
`;

const SmallButton = styled(ButtonContent)`
  width: 4.4rem;
`;

const SvgButton = styled(ButtonContent)`
  border-radius: 0;
  background-color: transparent;
  margin: 0;
`;

interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  svg?: ReactNode;
}

const Button = ({
  children,
  disabled,
  onClick,
  size,
  color = '#fff',
  type = 'button',
  svg,
}: ButtonProps) => {
  if (svg) {
    return <SvgButton onClick={onClick}>{svg}</SvgButton>;
  }

  if (size === 'small') {
    return (
      <SmallButton type={type} color={color} disabled={disabled} onClick={onClick}>
        {children}
      </SmallButton>
    );
  }

  if (size === 'medium') {
    return (
      <MediumButton type={type} color={color} disabled={disabled} onClick={onClick}>
        {children}
      </MediumButton>
    );
  }

  if (size === 'large') {
    return (
      <LargeButton type={type} color={color} disabled={disabled} onClick={onClick}>
        {children}
      </LargeButton>
    );
  }

  return (
    <XLargeButton type={type} color={color} disabled={disabled} onClick={onClick}>
      {children}
    </XLargeButton>
  );
};

export default Button;

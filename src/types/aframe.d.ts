import '@belivvr/aframe-react';

declare module '@belivvr/aframe-react' {
  export interface TextProps {
    negate: boolean;
  }

  export function Text(props: TextProps & EntityProps): JSX.Element;
}

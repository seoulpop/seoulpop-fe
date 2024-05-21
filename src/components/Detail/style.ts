import styled from '@emotion/styled';

import { HEADER_HEIGHT } from '@/constants/components';
import { FONT_SIZE } from '@/styles/common';

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${HEADER_HEIGHT + 1.6}rem 2rem 0;
  gap: 1rem;
`;

export const BigTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  font-weight: bold;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  height: auto;
  border-radius: 2%;
  object-fit: cover;
  display: block;
`;

export const MediumTitle = styled.div`
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  margin: 1rem 0;
`;

export const SmallTitle = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
  margin-right: 1rem;
`;

export const AddressBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.2rem;

  > img {
    margin-top: 0.4rem;
  }
`;

export const Address = styled.div`
  font-size: ${FONT_SIZE.md};
  line-height: ${FONT_SIZE.lg};
`;

export const Status = styled.div`
  font-size: ${FONT_SIZE.md};
  display: flex;
  flex-direction: row;
`;

export const Text = styled.div`
  font-size: ${FONT_SIZE.md};
  padding: 0.2rem;
  letter-spacing: 0.03rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

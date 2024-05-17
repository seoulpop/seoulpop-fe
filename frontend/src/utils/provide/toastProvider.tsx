import styled from '@emotion/styled';
import { useEffect } from 'react';

import useToastStore from '@/store/toast';
import { BORDER_RADIUS, FONT_SIZE, Z_INDEX } from '@/styles/common';

const ToastContainer = styled.div`
  position: fixed;
  z-index: ${Z_INDEX.modal};
  bottom: -10rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 1.2rem 0;
  border-radius: ${BORDER_RADIUS.circle};

  background: var(--primary);

  font-size: ${FONT_SIZE.md};
  color: var(--white);

  transition: bottom 1.4s ease;

  &.show {
    bottom: 5rem;
    transition: bottom 1s ease;
  }
`;

const ToastProvider = () => {
  const { show, message, hide } = useToastStore();

  useEffect(() => {
    if (!show) return;

    // XXX: 토스트 애니메이션이 끝난 후 destroy
    const timer = setTimeout(() => {
      hide();
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  return <ToastContainer className={`${show ? 'show' : ''}`}>{message}</ToastContainer>;
};
export default ToastProvider;

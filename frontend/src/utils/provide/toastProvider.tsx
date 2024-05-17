import styled from '@emotion/styled';

import useToastStore from '@/store/toast';
import { BORDER_RADIUS, FONT_SIZE, Z_INDEX } from '@/styles/common';

const ToastContainer = styled.div<{ show: boolean }>`
  position: fixed;
  z-index: ${Z_INDEX.modal};
  bottom: 5rem;
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
`;

const ToastProvider = () => {
  const { show, message } = useToastStore();

  if (!show) return null;

  return <ToastContainer>{message}</ToastContainer>;
};
export default ToastProvider;

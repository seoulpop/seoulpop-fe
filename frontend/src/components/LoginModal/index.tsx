import styled from '@emotion/styled';

import { BORDER_RADIUS, FONT_SIZE, Z_INDEX } from '@/styles/common';

interface LoginModalProps {
  message: string;
  subMessage: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Z_INDEX.float};

  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border-radius: ${BORDER_RADIUS.sm};
  box-shadow: 0 0.2rem 1rem var(--shadow);
  text-align: center;
`;

const Message = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
  color: var(--black);
  margin-bottom: 1rem;
`;

const SubMessage = styled.div`
  font-size: ${FONT_SIZE.sm};
  color: var(--black);
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 2.75rem;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  font-size: ${FONT_SIZE.xs};
  border-radius: ${BORDER_RADIUS.xs};
  margin-left: 0.5rem;
`;

const CancelButton = styled(Button)`
  background-color: var(--lightgray);
  color: var(--white);
`;

const LoginModal = ({ message, subMessage, onConfirm, onClose }: LoginModalProps) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Message>{message}</Message>
        <SubMessage>{subMessage}</SubMessage>
        <ButtonContainer>
          <Button onClick={onConfirm}>확인 </Button>
          <CancelButton onClick={onClose}> 취소 </CancelButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginModal;

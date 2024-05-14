import { Circle, Entity, Plane } from '@belivvr/aframe-react';
import { useEffect, useState } from 'react';

import { AR_Z_INDEX } from '@/styles/common';
import { formatGpsNewEntityPlace } from '@/utils/ar';

const duration = 200;
const width = 200;
const height = 200;
const closeBtnRadius = 8;
const buttonOffsetX = width / 2 - closeBtnRadius / 2;
const buttonOffsetY = height / 2 - closeBtnRadius / 2;

const ArContents = ({
  isOpen,
  lng,
  lat,
  onClose,
}: {
  isOpen?: boolean;
  lat: number;
  lng: number;
  onClose: () => void;
}) => {
  const [isClosed, setIsClosed] = useState<boolean>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const closeModal = () => {
    if (onClose) onClose();
    setIsClosed(true);
  };

  // 닫기 이벤트 등록
  useEffect(() => {
    if (AFRAME.components['close-btn']) return;

    AFRAME.registerComponent('close-btn', {
      init() {
        const { el } = this;
        el.addEventListener('click', closeModal);
      },
      remove() {
        const { el } = this;
        el.removeEventListener('click', closeModal);
      },
    });
  }, []);

  // 닫기 애니메이션 종료 후 상태 업데이트
  useEffect(() => {
    if (!isClosed) return;

    const timer = setTimeout(() => {
      setIsClosed(false);
      setVisible(false);
    }, duration);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [isClosed]);

  return (
    <Entity
      gps-new-entity-place={formatGpsNewEntityPlace({ lat, lng })}
      position={{ x: 0, y: 0, z: AR_Z_INDEX.contents }}
      scale={{
        x: 0,
        y: 0,
        z: 0,
      }}
      animation__open={{
        property: 'scale',
        from: '0.8 0.8  0.8',
        to: '1 1 1',
        dur: duration,
        enabled: !!isOpen,
      }}
      animation__open_visible={{
        property: 'material.opacity',
        from: '0',
        to: '1',
        enabled: !!isOpen,
      }}
      animation__close={{
        property: 'scale',
        from: '1 1 1',
        to: '0 0 0',
        dur: duration,
        enabled: !!isClosed,
      }}
      visible={visible}
    >
      <Plane
        color='#ccc'
        height={height}
        width={width}
        position={{ x: 0, y: 0, z: 0 }}
        src='/assets/images/test.png'
      />

      <Entity close-btn position={{ x: buttonOffsetX, y: buttonOffsetY, z: 5 }} visible={visible}>
        <Circle color='#fff' radius={closeBtnRadius} />
        <Circle radius={closeBtnRadius - 2} src='/svgs/cancel.svg' />
      </Entity>
    </Entity>
  );
};

export default ArContents;

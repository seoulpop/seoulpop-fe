import { Circle, Entity, Plane } from '@belivvr/aframe-react';
import { useEffect, useState } from 'react';

import { AR_Z_INDEX } from '@/styles/common';

const gpsEntityPlace = 'latitude: 51.0596; longitude: -0.7170'; // fake gps
const duration = 200;

const ArContents = ({ isOpen, onClose }: { isOpen?: boolean; onClose: () => void }) => {
  const [isClosed, setIsClosed] = useState<boolean>();
  const [open, setOpen] = useState<boolean>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) setVisible(true);

    setOpen(isOpen);
  }, [isOpen]);

  const clickHandler = () => {
    if (onClose) onClose();
    setIsClosed(true);
  };

  // 닫기 이벤트 등록
  useEffect(() => {
    AFRAME.registerComponent('close-btn', {
      init() {
        const { el } = this;
        el.addEventListener('click', clickHandler);
      },
      remove() {
        const { el } = this;
        el.removeEventListener('click', clickHandler);
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
      gps-new-entity-place={gpsEntityPlace}
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
        enabled: !!open,
      }}
      animation__open_visible={{
        property: 'material.opacity',
        from: '0',
        to: '1',
        enabled: !!open,
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
        height={2000}
        width={2000}
        position={{ x: 0, y: 0, z: 0 }}
        src='/assets/images/test.png'
      />

      <Entity close-btn position={{ x: 1000 - 200, y: 1000 - 160, z: 120 }}>
        <Circle radius={120} visible={false} />
        <Circle color='#fff' radius={60} />
        <Circle radius={30} src='/svgs/cancel.svg' />
      </Entity>
    </Entity>
  );
};

export default ArContents;

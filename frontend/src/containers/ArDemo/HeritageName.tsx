import { Text } from '@belivvr/aframe-react';

const HeritageName = ({ name, font }: { name: string; font: string }) => {
  return (
    <Text
      value={name}
      font={font}
      shader='msdf'
      negate='false'
      color='#fff'
      scale={{ x: 30, y: 30, z: 30 }}
    />
  );
};

export default HeritageName;

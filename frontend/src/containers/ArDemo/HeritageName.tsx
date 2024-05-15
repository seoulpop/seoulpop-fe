import { Text } from '@belivvr/aframe-react';

const HeritageName = ({ name, font }: { name: string; font: string }) => {
  return (
    <Text
      value={name}
      font={font}
      shader='msdf'
      negate='false'
      color='#fff'
      scale={{ x: 50, y: 50, z: 50 }}
    />
  );
};

export default HeritageName;

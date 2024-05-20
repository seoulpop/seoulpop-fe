import { MOBILE_MIN_WIDTH } from '@/constants/pcLayout';

const isMobile = () => {
  const minWidth = MOBILE_MIN_WIDTH;
  return window.innerWidth < minWidth || window.screen.width < minWidth;
};

export default isMobile;

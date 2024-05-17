import { useEffect } from 'react';

import useToastStore from '@/store/toast';

const useToast = () => {
  const { show, toast, destroy } = useToastStore();

  const toastMessage = (message: string) => {
    toast({ message });
  };

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      destroy();
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  return { toastMessage };
};

export default useToast;

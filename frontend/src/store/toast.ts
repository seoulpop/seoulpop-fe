import { create } from 'zustand';

interface ToastState {
  show: boolean;
  message: string;
  toast: ({ message }: { message: string }) => void;
  destroy: () => void;
}

const initState = {
  show: false,
  message: '',
};

const useToastStore = create<ToastState>((set) => ({
  ...initState,
  toast: ({ message }) => set(() => ({ show: true, message })),
  destroy: () => set({ ...initState }),
}));

export default useToastStore;

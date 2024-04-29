import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ssafy.seoulpop',
  appName: 'seoul-pop',
  webDir: 'dist',
  cordova: {},
  server: {
    url: 'http://10.0.2.2:5173',
  },
};

export default config;

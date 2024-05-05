import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ssafy.seoulpop',
  appName: 'seoul-pop',
  webDir: 'dist',
  cordova: {},
  android: {
    allowMixedContent: true,
  },
  server: {
    cleartext: true,
    hostname: 'localhost:5173',
    androidScheme: 'http',
  },
  plugins: {
    BackgroundRunner: {
      label: 'com.ssafy.seoulpop.push',
      src: 'background.js',
      event: 'fetchGeolocation',
      repeat: true,
      interval: 1,
      autoStart: true,
    },
  },
};

export default config;

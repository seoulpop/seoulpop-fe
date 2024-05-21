import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ssafy.seoulpop',
  appName: 'seoul-pop',
  webDir: 'dist',
  cordova: {},
  android: {
    allowMixedContent: true,
    useLegacyBridge: true,
  },
  server: {
    cleartext: true,
    hostname: 'localhost:5173',
    androidScheme: 'https',
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;

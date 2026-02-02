// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prashanth.babytracker',
  appName: 'Baby Vaccination Tracker',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, // Show native screen briefly
      launchAutoHide: true,
      backgroundColor: "#4facfe", // Match your gradient start color
      androidScaleType: "CENTER_CROP",
      showSpinner: false, // We use our own HTML spinner
    }
  }
};

export default config;
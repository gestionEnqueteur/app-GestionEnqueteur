
import { ExpoConfig } from '@expo/config';

// Constant de variant 
const IS_DEV = process.env.APP_VARIANT === 'development';

const config: ExpoConfig = {
  name: IS_DEV ? "appGestionEnqueteur (Dev)" : "appGestionEnqueteur",
  slug: "appGestionEnqueteur",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: IS_DEV ? "com.ponche.appGestionEnqueteur.dev" : "com.ponche.appGestionEnqueteur"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    eas: {
      projectId: "5f382d21-c4fe-4456-8643-62805b144dfe"
    }
  },
  runtimeVersion: {
    policy: "appVersion"
  },
  updates: {
    url: "https://u.expo.dev/5f382d21-c4fe-4456-8643-62805b144dfe"
  }
};

export default config;

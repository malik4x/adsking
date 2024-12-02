import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
  appName: 'Ads King',
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'firebase',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
  /**
   * Firebase
   */
  firebase: {
    apiKey: 'AIzaSyDb9CSBiFALSbxuQ-XPHwiyQUdk7zQ3J6g',
    authDomain: 'ads-king-a2600.firebaseapp.com',
    projectId: 'ads-king-a2600',
    storageBucket: 'ads-king-a2600.firebasestorage.app',
    messagingSenderId: '42333811354',
    appId: '1:42333811354:web:9b000d09cd66859f5ea523',
  },
  /**
   * Amplify
   */
  amplify: {
    userPoolId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_ID ?? '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID ?? '',
    region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION ?? '',
  },
  /**
   * Auth0
   */
  auth0: {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? '',
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? '',
    callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL ?? '',
  },
  /**
   * Supabase
   */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
};

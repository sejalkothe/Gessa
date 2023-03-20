// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  CURRENT_ENV: 'local',
  NX_THEME_BASE_URL: 'https://gessa.io/gessa-project',
  NX_FEATURE_BASE_URL: 'https://gessa.io/rbac',
  NX_KEYCLOCK_AUTH_SERVER_URL: 'https://auth.qa.gessa.io/',
  NX_KEYCLOCK_DATABASE: '63f72b21f9dfbe6751b8875e',
  NX_KEYCLOCK_CLIENT_ID: 'masterClient',
  NX_KEYCLOCK_SECRET_KEY: 'v52XsV7Hn3XRuf1ZJJlmmAekRJL1nDR9',

  NX_VIEW_PAGE_MF: 'http://localhost:8001/remoteEntry.js',

  NX_SURVEY_MF: 'http://localhost:8005/remoteEntry.js'
};

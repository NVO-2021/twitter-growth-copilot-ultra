import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    36: 'img/logo-36.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_icon: 'img/logo-48.png',
    default_popup: 'popup.html',
    default_sidepanel: 'sidepanel.html',
  },
  background: {
    matches: ['http://x.com/*', 'https://x.com/*', 'http://twitter.com/*', 'https://twitter.com/*'],
    service_worker: 'src/background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: [
        'http://x.com/*',
        'https://x.com/*',
        'http://twitter.com/*',
        'https://twitter.com/*',
      ],
      js: ['src/contentScript/index.js'],
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: [
        'img/logo-16.png',
        'img/logo-36.png',
        'img/logo-48.png',
        'img/logo-128.png',

      ],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage', 'clipboardWrite', 'activeTab', 'tabs'],
})

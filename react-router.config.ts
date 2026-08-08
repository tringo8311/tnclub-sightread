import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src/pages',
  basename: process.env.NODE_ENV === 'production' ? '/tnclub-sightread/' : '/',
  ssr: false, // enable SPA mode
} satisfies Config

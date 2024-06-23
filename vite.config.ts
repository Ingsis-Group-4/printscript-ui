import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env': {
        FRONTEND_URL: JSON.stringify(env.FRONTEND_URL),
        BACKEND_URL: JSON.stringify(env.BACKEND_URL),
        AUTH0_DOMAIN: JSON.stringify(env.AUTH0_DOMAIN),
        AUTH0_CLIENT_ID: JSON.stringify(env.AUTH0_CLIENT_ID),
        AUTH0_AUDIENCE: JSON.stringify(env.AUTH0_AUDIENCE),
        AUTH0_SCOPE: JSON.stringify(env.AUTH0_SCOPE),
        MANAGER_URL: JSON.stringify(env.MANAGER_URL),
        PERMISSIONS_URL: JSON.stringify(env.PERMISSIONS_URL),
      }
    },
    plugins: [react()],
  }
})

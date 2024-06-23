import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env': {
        VITE_FRONTEND_URL: JSON.stringify(env.VITE_FRONTEND_URL),
        VITE_BACKEND_URL: JSON.stringify(env.VITE_BACKEND_URL),
        VITE_AUTH0_DOMAIN: JSON.stringify(env.VITE_AUTH0_DOMAIN),
        VITE_AUTH0_CLIENT_ID: JSON.stringify(env.VITE_AUTH0_CLIENT_ID),
        VITE_AUTH0_AUDIENCE: JSON.stringify(env.VITE_AUTH0_AUDIENCE),
        VITE_AUTH0_SCOPE: JSON.stringify(env.VITE_AUTH0_SCOPE),
        VITE_MANAGER_URL: JSON.stringify(env.VITE_MANAGER_URL),
        VITE_PERMISSIONS_URL: JSON.stringify(env.VITE_PERMISSIONS_URL),
      }
    },
    plugins: [react()],
  }
})

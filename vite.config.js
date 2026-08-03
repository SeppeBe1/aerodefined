import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  // Serve from root
  root: '.',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:          resolve(__dirname, 'index.html'),
        marketplace:   resolve(__dirname, 'marketplace.html'),
        pricing:       resolve(__dirname, 'pricing.html'),
        howItWorks:    resolve(__dirname, 'how-it-works.html'),
        about:         resolve(__dirname, 'about.html'),
        contact:       resolve(__dirname, 'contact.html'),
        faq:           resolve(__dirname, 'faq.html'),
        login:         resolve(__dirname, 'login.html'),
        register:      resolve(__dirname, 'register.html'),
        dashboard:     resolve(__dirname, 'dashboard.html'),
        rfq:           resolve(__dirname, 'rfq.html'),
        notFound:      resolve(__dirname, '404.html'),
      }
    }
  },

  // Dev server
  server: {
    port: 3000,
    open: true
  }
})
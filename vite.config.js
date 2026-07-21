import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: './photos',
  server: {
    // SPA fallback so a direct hit to /book (or a refresh on that route) serves
    // index.html. Vite usually does this implicitly, but we enable it explicitly
    // for clarity. Production hosts that serve the dist/ build must be configured
    // separately: Netlify `_redirects` (`/* /index.html 200`), Vercel
    // `vercel.json` rewrites, Apache `.htaccess` `FallbackResource /index.html`,
    // or Nginx `try_files $uri /index.html`. See research.md §1.
    historyApiFallback: true,
  },
});

import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"  // ✅ Tambahkan import PWA

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({  // ✅ Tambahkan konfigurasi PWA
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,  // Aktif di development
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "tec.png", "robots.txt"],
      manifest: {
        id: "/",
        name: "Movies App",
        short_name: "Movies",
        description: "Netflix Style Movie App",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "en",
        icons: [
          {
            src: "/tec.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/tec.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/tec.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.themoviedb\.org\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "tmdb-api",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: /^https:\/\/image\.tmdb\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "tmdb-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
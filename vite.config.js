import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import postcssNesting from 'postcss-nesting'
import cssnanoPlugin from 'cssnano'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: 'globalThis'
    },
    plugins: [
        preact({
            devtoolsInProd: false,
            prefreshEnabled: true,
            babel: {
                sourceMaps: 'both'
            }
        })
    ],
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    esbuild: {
        logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    publicDir: '_public',
    css: {
        postcss: {
            plugins: [
                postcssNesting,
                cssnanoPlugin
            ],
        },
    },
    server: {
        port: 8888,
        host: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:9999',
                changeOrigin: true,
            },
        },
    },
    build: {
        target: 'esnext',
        minify: false,
        outDir: './public',
        emptyOutDir: true,
        sourcemap: 'inline'
    }
})

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import UnoCSS from 'unocss/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
        /** DefineOptions 可以更简单的注册组件名称 */
        DefineOptions(),
        eslintPlugin(),
        AutoImport({
            dts: false,
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            resolvers: [
                ElementPlusResolver() // 自动导入图标组件
            ]
        }),
        Components({
            dts: false,
            resolvers: [ElementPlusResolver()]
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 3332
    },
    build: {
        /** 消除打包大小超过 500kb 警告 */
        chunkSizeWarningLimit: 2000,
        /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
        minify: 'terser',
        /** 在打包代码时移除 console.log、debugger 和 注释 */
        terserOptions: {
            compress: {
                drop_console: false,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            format: {
                /** 删除注释 */
                comments: false
            }
        },
        /** 打包后静态资源目录 */
        assetsDir: 'static'
    }
})

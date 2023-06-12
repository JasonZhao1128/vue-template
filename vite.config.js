import { loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import UnoCSS from 'unocss/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default configEnv => {
    const viteEnv = loadEnv(configEnv.mode, process.cwd())
    const { VITE_PUBLIC_PATH } = viteEnv
    return {
        /** 打包时根据实际情况修改 base */
        base: VITE_PUBLIC_PATH,
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
            }),
            viteMockServe({
                mockPath: 'src/mock/',
                localEnabled: true, // 开发打包开关
                prodEnabled: true, // 生产打包开关 这样可以控制关闭mock的时候是否让mock打包到最终代码内
                injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); ` // 生产需要mock时要加上
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            /** 是否开启 HTTPS */
            https: false,
            /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
            host: true, // host: "0.0.0.0"
            /** 端口号 */
            port: 3332,
            /** 是否自动打开浏览器 */
            open: false,
            /** 跨域设置允许 */
            cors: true,
            /** 端口被占用时，是否直接退出 */
            strictPort: false
            /** 接口代理 */
            // proxy: {
            //     '/api': {
            //         target: '',
            //         ws: true,
            //         /** 是否允许跨域 */
            //         changeOrigin: true,
            //         rewrite: path => path.replace('/^\/api', '')
            //     }
            // }
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
    }
}

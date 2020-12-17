# 项目中vite的配置

### 根目录下vite.config.ts文件

```typescript
const fs = require("fs")
const path = require("path")

import { UserConfig } from 'vite'

const config: UserConfig = {
    optimizeDeps: {
        include: ['@ant-design/colors', '@ant-design/icons-vue', '@ant-design-vue/use', '@ant-design-vue', '@ant-design-vue/es']
    },
    alias: {
        '/@/': path.resolve(__dirname, './src')
    },
    proxy: {
        '/api': {
            target: 'http://172.17.1.52:7091/',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
        },
        '/mock': {
            target: 'http://localhost:8888/',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/mock/, '')
        } 
    }
}
export default config

```

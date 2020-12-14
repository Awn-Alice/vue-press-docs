module.exports = {
    '/wechat/': [
        '/wechat/informal-essay-01', // wechat 文件夹下的README.md文件，里面的一级标题直接当作菜单名显示
        '/wechat/informal-essay-02',
        '/wechat/end'
        // {
        //     title: '微信小程序随笔', // 这个是菜单名字
        //     children: [
        //         '/wechat/informal-essay-01',
        //         '/wechat/informal-essay-02'
        //     ]
        // },
    ],
    '/mac/': [
        '/mac/Terminal-Operation-Manual',
        '/mac/Basic-Shortcut-Key',
        '/mac/Vscode-Shortcut-Key',
        '/mac/end'
    ],
    '/vue/': [
        {
            title: 'vue3+ts+vite 初体验',
            collapsable: true,
            path: '/vue/vue3+ts/',
            children: [
                { title: 'axios 封装', path: '/vue/vue3+ts/axios封装' },
                { title: 'hooks 的使用', path: '/vue/vue3+ts/hooks' },
                { title: 'ts 的配置', path: '/vue/vue3+ts/typescript' },
                { title: '自定义组件多个 v-model', path: '/vue/vue3+ts/components' },
            ]
        },
        '/vue/webpack-conf'
    ],
    '/engineering/': [
        '/engineering/git'
    ],
    '/css/': [
        '/css/flex'
    ]
}
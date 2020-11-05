module.exports = {
    title: 'Awn-Alice的博客',
    description: 'Awn-Alice的日常随笔',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/Avatar.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    themeConfig: {
        sidebarDepth: 2,
        logo: '/Avatar.png',  // 左上角logo
        nav: [ // 导航栏配置
            { text: '首页', link: '/' },
            { text: 'VUE', link: '/vue/' },
            { text: '微信', link: '/wechat/' }
        ],
        sidebar: { // 侧边栏配置
            '/wechat/': [
                '/wechat/', // wechat 文件夹下的README.md文件，里面的一级标题直接当作菜单名显示
                {
                    title: '微信小程序随笔', // 这个是菜单名字
                    children: [
                        '/wechat/informal-essay-01',
                        '/wechat/informal-essay-02'
                    ]
                },
                '/wechat/end'
            ]
        },
    },
    markdown: {
        lineNumbers: true
    },
    base: '/vue-press-docs/',
    port: 8888,
    dest: 'dist', // 默认值 .vuepress/dist，指定 vuepress build 的输出目录
    assetsPublicPath: './'
};
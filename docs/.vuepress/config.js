var navConf = require('./config/nav.js')
var siderbarConf = require('./config/sidebar.js')
module.exports = {
    title: 'Awn-Alice的博客',
    description: 'Awn-Alice的日常随笔',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/Avatar.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    themeConfig: {
        sidebarDepth: 2,
        logo: '/Avatar.png',  // 左上角logo
        nav: navConf,
        sidebar: siderbarConf,
    },
    markdown: {
        lineNumbers: true
    },
    base: '/docs/', // 访问地址的前缀
    port: 8888,
    dest: 'dist', // 默认值 .vuepress/dist，指定 vuepress build 的输出目录
};
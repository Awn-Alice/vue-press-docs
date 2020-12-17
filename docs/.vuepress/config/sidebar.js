module.exports = {
  "/css/": ["/css/flex"],
  "/js/": [
    {
      title: "你不知道的js骚操作",
      path: "/js/",
      children: [
        { title: "十进制和二进制的转换", path: "/js/运算符" },
        { title: "es6中的class", path: "/js/class" },
      ],
    },
  ],
  "/wechat/": [
    "/wechat/informal-essay-01",
    "/wechat/informal-essay-02",
    "/wechat/end",
  ],
  "/mac/": [
    "/mac/Terminal-Operation-Manual",
    "/mac/Basic-Shortcut-Key",
    "/mac/Vscode-Shortcut-Key",
    "/mac/end",
  ],
  "/vue/": [
    {
      title: "vue3+ts+vite 初体验",
      collapsable: true,
      path: "/vue/vue3+ts/",
      children: [
        { title: "axios 封装", path: "/vue/vue3+ts/axios封装" },
        { title: "hooks 的使用", path: "/vue/vue3+ts/hooks" },
        { title: "ts 的配置", path: "/vue/vue3+ts/typescript" },
        { title: "自定义组件多个 v-model", path: "/vue/vue3+ts/components" },
      ],
    },
    "/vue/webpack-conf",
  ],
  "/engineering/": ["/engineering/模块化", "/engineering/git"],
  "/errorLog/": [
    {
      title: "错误日志",
      path: "/errorLog/",
      children: [{ title: "markdown 语法错误", path: "/errorLog/markdown" }],
    },
  ],
};

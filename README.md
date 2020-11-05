# 这是我日常学习记的笔记

## 代码发布到 gitee 之后还需要去 gitee page 中更新一下，页面才会变化

## 发布到 guthub 不需要手动更新

* 执行 npm run push 可以把代码同时推到github和gitlab，命令后面必须跟一个参数作为 commit 的值：npm run push 'first push'
* 执行 npm run d 可以打包代码并同时更新 github和gitee的 gh-page分支的代码，github page会自动更新，gitee page 需要手动点一下更新，命令后面必须跟一个参数作为 commit 的值：npm run d 'first push'

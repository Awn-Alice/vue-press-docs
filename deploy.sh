#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist


git init
git add -A
git commit -m 'deploy'

# 这里不需要判断参数了，可以同时推到两个远程库
# if [ $1 = 'github' ]; then
git push -f git@github.com:Awn-Alice/vue-press-docs.git master:gh-page
# else
git push -f git@gitee.com:AColdFish/vue-press-docs.git master:gh-page
# fi

cd -
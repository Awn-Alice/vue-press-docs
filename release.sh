#!/usr/bin/env sh

# 进入生成的文件夹
cd dist

# 要发布到 https://awn-alice.github.io/vue-press-docs/
# 这里不需要通过参数判断了，可以同时推到两个远程库
# if [ $1 = 'github' ]; then
git push -f git@github.com:Awn-Alice/vue-press-docs.git master:gh-page
# else
git push -f git@gitee.com:AColdFish/vue-press-docs.git master:gh-page
# fi

cd -
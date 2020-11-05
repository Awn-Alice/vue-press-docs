#!/usr/bin/env sh

git add -A
git commit -m $1
git push git@github.com:Awn-Alice/vue-press-docs.git master
git push git@gitee.com:AColdFish/vue-press-docs.git master
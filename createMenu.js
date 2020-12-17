const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const log = console.log;

// 获取执行时传入的参数
const params = process.argv.splice(2)
log(chalk.blue('传入的参数：', params))
// sidebar.js的路径和内容
const siderPath = path.resolve(__dirname, 'docs/.vuepress/config/sidebar.js')
const siderConfig = require('./docs/.vuepress/config/sidebar.js')
// 菜单名
const menuPath = params[0]
const menuName = menuPath.split('/')[1]
const parentName = menuPath.split('/')[0]
// 是否有子菜单
const parentTitle = params[1]



if (parentTitle) {
    hasSons()
} else {
    noSons()
}

/**
 * 没有子菜单
 */
function noSons() {
    /**
     * 检查目录是否已经存在
     */
    const newFilePath = path.resolve(__dirname, 'docs/', `${menuPath}.md`)
    const isExist = fs.existsSync(newFilePath)
    if (isExist) {
        log(chalk.red('该目录已经存在'))
        process.exit(1)
    }

    /**
     * 添加新的菜单
     */

    siderConfig[`/${parentName}/`].push(`/${menuPath}`)
    const siderStr = `module.exports = ${JSON.stringify(siderConfig)}`
    // 重写 sidebar.js，writeFileSync 如果写入成功没有返回值也就是undifine，如果写入失败，会返回错误信息
    const writeSideBarRet = fs.writeFileSync(siderPath, siderStr)
    if (writeSideBarRet) throw writeSideBarRet;
    log(chalk.green('菜单配置写入成功'))

    /**
     * 新建目录
     */

    const content = `# ${menuName}`
    // 在新的目录下写入readme.md文件，writeFileSync 如果写入成功没有返回值也就是undifine，如果写入失败，会返回错误信息
    const writeDirRet = fs.writeFileSync(newFilePath, content)
    if (writeDirRet) throw writeDirRet
    log(chalk.green('菜单写入成功'))
}

/**
 * 有子菜单
 */
function hasSons() {
    // 获取子菜单的名字
    if (!params[2]) {
        log(chalk.red('请至少传入一个子菜单名称'))
        process.exit(1)
    }
    const sons = params[2].split('/')
    
    /**
     * 检查目录是否已经存在
     */
    const newDirPath = path.resolve(__dirname, 'docs/', `${menuPath}`)
    const isExist = fs.existsSync(newDirPath)
    if (isExist) {
        log(chalk.red('该目录已经存在'))
        process.exit(1)
    }

    /**
     * 添加新的菜单
     */
    const defaultSonPath = `/${menuPath}/${sons[0]}`
    const newSideBar = {
        title: parentTitle,
        path: defaultSonPath,
        children: sons.map(son => {
            return {
                title: son,
                path: `/${menuPath}/${son}`
            }
        })
    }
    siderConfig[`/${parentName}/`].push(newSideBar)
    const siderStr = `module.exports = ${JSON.stringify(siderConfig)}`
    // 重写 sidebar.js，writeFileSync 如果写入成功没有返回值也就是undifine，如果写入失败，会返回错误信息
    const writeSideBarRet = fs.writeFileSync(siderPath, siderStr)
    if (writeSideBarRet) throw writeSideBarRet;
    log(chalk.green('菜单配置写入成功'))

    /**
     * 新建目录
     */
    fs.mkdirSync(newDirPath)

    // 在新的目录下写子菜单，writeFileSync 如果写入成功没有返回值也就是undifine，如果写入失败，会返回错误信息
    const errArr = []
    for (let i = 0; i < sons.length; i++) {
        const son = sons[i];
        const sonPath = path.resolve(__dirname, `${newDirPath}/${son}.md`)
        const err = fs.writeFileSync(sonPath, `# ${son}`)
        if(err) errArr.push(err)
    }
    if (errArr.length) throw JSON.stringify(errArr)
    log(chalk.green('菜单写入成功'))
}
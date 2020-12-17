const fs = require('fs')
const path = require('path')
const chalk = require("chalk");
const log = console.log;

// 获取执行时传入的参数
const params = process.argv.splice(2)
log(chalk.blue("传入的参数：", params));
// nav 的显示名称
const navName = params[0] || '新增导航'
const menuName = params[1] || ''

// nav.js的路径 和 要增加的目录路径
const navPath = path.resolve(__dirname,'docs/.vuepress/config/nav.js')
const newFilePath = path.resolve(__dirname, 'docs/', navName)

// nav.js 必须要用 module.exports = [] 这种方式导出，才能使用require的形式引入，下去后要了解一些模块化的知识
const navConfig = require('./docs/.vuepress/config/nav')
/**
 * 检查nav.js中是否已经存在
 */
const navIsExist = navConfig.find(nav => nav.text === navName)
if (navIsExist) {
    log(chalk.red("该导航已经存在"));
    process.exit(1)
}

/**
 * 检查目录是否已经存在
 */
const isExist = fs.existsSync(newFilePath)
if (isExist) {
    log(chalk.red("该目录已经存在"));
    process.exit(1)
}

/**
 * 添加新的导航
 */
navConfig.push({ text: navName, link: `/${navName}/` })
const writeStr = `module.exports = ${JSON.stringify(navConfig)}`
// 重写 nav.js，writeFileSync 如果写入成功没有返回值也就是undifine，如果写入失败，会返回错误信息
const writeNavRet = fs.writeFileSync(navPath, writeStr)
if (writeNavRet) throw writeNavRet
log(chalk.green("导航配置写入成功"));

/**
 * 添加新的菜单
 */
const siderPath = path.resolve(__dirname, 'docs/.vuepress/config/sidebar.js')
const siderConfig = require('./docs/.vuepress/config/sidebar.js')

siderConfig[`/${navName}/`] = [
    {
        title: menuName || navName,
        path: `/${navName}/`,
        children: []
    }
]
const siderStr = `module.exports = ${JSON.stringify(siderConfig)}`
// 重写 sidebar.js，writeFileSync 如果写入成功没有返回值也就是undifine，如果写入失败，会返回错误信息
const writeSideBarRet = fs.writeFileSync(siderPath, siderStr)
if (writeSideBarRet) throw writeSideBarRet;
log(chalk.green("菜单配置写入成功"));

/**
 * 新建目录
 */
fs.mkdirSync(newFilePath)
const readmePath = newFilePath + '/README.md'
const content = `# ${menuName || navName}`
// 在新的目录下写入readme.md文件，writeFileSync 如果写入成功没有返回值也就是undifine，如果写入失败，会返回错误信息
const writeDirRet = fs.writeFileSync(readmePath, content)
if (writeDirRet) throw writeDirRet
log(chalk.green("目录写入成功"));

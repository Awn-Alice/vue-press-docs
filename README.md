# README

* **自动化创建导航：**

    *创建一个导航：*， test 是导航名, 测试 是左侧菜单名字，如果不传，默认为第一个参数 test

    ```bash
    npm run createNav test 测试
    ```

* **在已有的导航下面创建菜单**

    *在test导航下面创建一个没有子菜单的菜单：* test1 是菜单名,会在test下新建一个test1.md

    ```bash
    npm run createMenu test/test1
    ```

    *在test导航下面创建一个有子菜单的菜单：* 会新建 test/有子菜单 文件夹，下面有 子菜单名字1.md 和 子菜单名字2.md 两个文件(多个子菜单以 / 分隔)

    ```bash
    npm run createMenu test/有子菜单 菜单名字 子菜单名字1/子菜单名字2
    ```

* **下面两个命令后面必须跟一个参数（不能加空格）作为 commit 的值：npm run push 'commit text'**
* **执行 npm run push '新加了一个模块' 可以把代码同时推到github和gitlab的master分支**
* **执行 npm run d '新加了一个模块' 可以打包代码，并把打包的dist文件更新到 github和gitee的 gh-page分支的**
* **更新完gh-page分支后， guthub 不需要手动更新 github page 网站会自动更新，但是 gitee page 需要手动更新一下，页面才会变化**

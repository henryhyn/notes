---
tags:
- VuePress
- node
---

# 通过阿里 · 云效部署 VuePress 静态网站

## 创建 VuePress 项目

先决条件, 安装 Node.js 和 npm.

```sh
mkdir notes
cd notes
npm init -y
npm install -D vuepress@1.7.1
mkdir docs && echo '# Hello VuePress' > docs/README.md
npx vuepress dev docs
```

依次执行以上 6 条命令, 即初始化了一个 VuePress 项目, 并启动服务, 在本地通过 <http://localhost:8080> 访问, 就可以看到如下页面.

![](https://pic-gino-prod.oss-cn-qingdao.aliyuncs.com/henry/20210721155915448-2021-07-21_15-57-45.png)

## 通过 Git 管理项目文件

首先添加 Git 忽略文件列表 `vim .gitignore`, 内容如下

```text
node_modules
package-lock.json
dist
```

然后执行如下命令

```sh
git init
git add .
git status
```

可以看到如下输出

```text
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

    new file:   .gitignore
    new file:   docs/README.md
    new file:   package.json
```

最后提交代码

```sh
git commit -m 'init'
```

## 通过云效 · Codeup 作为远程代码仓库

通过**新建代码库**初始化一个代码仓库, 然后通过 SSH 方式将本地文件推送到远端.

```sh
git remote add origin git@codeup.aliyun.com:xxx_path_xxx/notes.git
git push -u origin master
```

## 通过云效 · Flow 实现自动化部署

这里选择如下流程模版

![](https://pic-gino-prod.oss-cn-qingdao.aliyuncs.com/henry/20210721105823274-2021-07-21_10-57-20.png)

部署测试成功后的效果

![](https://pic-gino-prod.oss-cn-qingdao.aliyuncs.com/henry/20210721110100989-2021-07-21_11-00-10.png)

实际上, **代码扫描**和**单元测试**两个步骤可以没有, 在**代码源**部分*开启代源码触发*, 我选择的触发事件是*代码提交*.
接下来, 重点介绍**构建**和**部署**两个步骤的关键配置点.

### Node.js 构建

这里又包含两个步骤

1. Node.js 构建, 关键点, 配置构建命令
```sh
cnpm install
npx vuepress build docs
```
2. 构建物上传, 关键点, 配置打包路径 `docs/.vuepress/dist`

### 主机部署

先决条件, 要有自己的云服务器, 最好就是阿里云服务器 ECS.
关键点, *下载路径*和*部署脚本*.

1. 下载路径, 设置为 `/opt/app/notes/package.tgz`
2. 部署脚本
```sh
cd /opt/app/notes
tar zxvf package.tgz
```

## 配置二级域名, 方便访问

在 `/etc/nginx/conf.d/` 目录下, 新增 `notes.conf` 配置文件, 内容如下

```text
server {
    listen 80;
    server_name notes.kaiyuanshuwu.cn;
    root /opt/app/notes;
}
```

接下来, 就可以通过 <http://notes.kaiyuanshuwu.cn/essay/deploy.html> 访问啦!

## 配置 npm scripts

为了方便启动服务, 打包构建, 可以在 package.json 中配置 npm scripts 脚本, 比如

```text
"prestart": "npm install",
"start": "npx vuepress dev docs",
"build": "npx vuepress build docs",
```

以后就可以通过 `npm start` 本地启动, 开发测试; `npm run build` 打包构建.

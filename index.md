---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "我的技术笔记"
  text: "VitePress学习之路"
  tagline: 行动起来 活在当下
  image:
    src: /文档.svg
    alt: VitePress
  actions:
    - theme: brand
      text: 我的博客
      link: https://www.shiyunhao.cn
    - theme: alt
      text: Docker教程
      link: /docs/posts/Docker教程.md

features:
  - icon:
      src: /linux.svg
    title: Linux常用命令手册
    details: 本手册旨在为初学者和有一定经验的用户提供一个快速、实用的Linux常用命令参考指南。
    link: /docs/posts/linux常用命令手册.md
  - icon:
      src: /镜像.svg
    title: 开源软件镜像站汇总
    details: 这类站点通常由高校、科研机构或科技企业运营维护，是开源生态中不可或缺的一环。
    link: /docs/posts/开源软件镜像站汇总.md
  - icon:
      src: /markdown.svg
    title: Markdown语法
    details: Markdown是一种轻量型标记语言, 高效简洁清晰的同时, 又很简单. 看起来舒服, 尤其在处理纯文本上有很大的优势。
    link: /docs/posts/Markdown语法.md
  - icon:
      src: /k8s.svg
    title: K3s常用命令
    details: 本指南提供了K3s（轻量级Kubernetes）的常用命令，包括服务管理、kubectl核心命令。
    link: /docs/posts/K3s常用命令.md
---



### 常用脚本整理
#### 综合工具箱
```sh
wget -O box.sh https://raw.githubusercontent.com/BlueSkyXN/SKY-BOX/main/box.sh && chmod +x box.sh && clear && ./box.sh
```
#### Nginx Proxy Manager自定义反向代理配置文件：
```sh
location / {

proxy_set_header X-Real-IP $remote_addr;
proxy_set_header x-wiz-real-ip $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
[[proxy_set_header]] X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Proto "https"; [[强制开启https]]
proxy_set_header X-NginX-Proxy true;

[[--解决转https代理后wss协议无法连接的问题]]
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection upgrade;
[[proxy_set_header]] Connection "keep-alive";

proxy_set_header Host $http_host;
proxy_pass http://127.0.0.1:80; [[使用docker的内部地址，需要在docker配置工具中查看]]
proxy_ssl_session_reuse off;
proxy_cache_bypass $http_upgrade;
proxy_redirect off; [[重定向]] off=>改成http:// https://
}
```
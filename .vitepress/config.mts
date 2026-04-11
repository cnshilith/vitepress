import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: "/vitepress/",
  title: "我的技术笔记",
  description: "VitePress学习之路",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config

    outline: {
      level: [2,4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },

    nav: [
      { text: '主页', link: '/' },
      { text: '基础技术', link: '/docs/posts/linux常用命令手册.md' },
      { text: '容器技术', link: '/docs/posts/Docker教程.md' },
      { text: '资源汇总', link: '/docs/posts/开源软件镜像站汇总.md' }
    ],

    sidebar: [
      {
        text: '容器技术',
        items: [
          { text: 'Docker教程', link: '/docs/posts/Docker教程.md' },
          { text: 'K3s常用命令', link: '/docs/posts/K3s常用命令.md' }
        ]
      },
      {
        text: '基础技术',
        items: [
          { text: 'Linux常用命令手册', link: '/docs/posts/linux常用命令手册.md' },
          { text: 'Markdown语法', link: '/docs/posts/Markdown语法.md' },
          { text: 'nginx 配置文件', link: '/docs/posts/nginx 配置文件.md' }
        ]
      },
      {
        text: '资源汇总',
        items: [
          { text: '开源软件镜像站汇总', link: '/docs/posts/开源软件镜像站汇总.md' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cnshilith?tab=repositories' }
    ],
    footer: {
      copyright: 'Copyright © 2026-present shilith'
    }
  }
})

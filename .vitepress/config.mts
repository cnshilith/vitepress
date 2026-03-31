import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "我的技术笔记",
  description: "VitePress学习之路",
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'Linux', link: '/' },
      { text: 'Docker', link: '/docs/posts/Docker教程.md' },
    ],

    sidebar: [
      {
        text: 'SHILITH',
        items: [
          { text: '开源软件镜像站汇总', link: '/docs/posts/开源软件镜像站汇总.md' },
          { text: 'Docker教程', link: '/docs/posts/Docker教程.md' },
          { text: 'K3s常用命令', link: '/docs/posts/K3s常用命令.md' },
          { text: 'linux常用命令手册', link: '/docs/posts/linux常用命令手册.md' },
          { text: 'Markdown语法', link: '/docs/posts/Markdown语法.md' }
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

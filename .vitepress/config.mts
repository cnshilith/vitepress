import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: "/vitepress/",
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['link', { rel: 'favicon', href: '/logo.svg' }]
  ],
  title: "我的技术笔记",
  description: "VitePress学习之路",
  markdown: {
    lineNumbers: true,
    // 启用时间戳显示
    // frontmatter: {
    //   lastUpdated: true
    // }
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
          { text: 'nginx 配置文件', link: '/docs/posts/nginx 配置文件.md' },
          { text: 'Linux系统初始化', link: '/docs/posts/Linux 系统安装初始化.md' },
          { text: 'vim常用命令', link: '/docs/posts/vim常用命令.md' },
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
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除查询',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cnshilith?tab=repositories' }
    ],
    footer: {
      copyright: 'Copyright © 2026-present shilith'
    },
    // 启用时间戳显示
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})

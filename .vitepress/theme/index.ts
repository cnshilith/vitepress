// https://vitepress.dev/guide/custom-theme
import { h, watch } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import './style/dark.css'
import MouseClick from "./components/MouseClick.vue"
import MouseFollower from "./components/MouseFollower.vue"
import BackToTop from "./components/BackToTop.vue"
import HomeUnderline from "./components/HomeUnderline.vue"
import Layout from "./components/Layout.vue"
import Confetti from "./components/confetti.vue"
import Update from "./components/update.vue"

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component("HomeUnderline", HomeUnderline)
    app.component("MouseClick", MouseClick)
    app.component("MouseFollower", MouseFollower)
    app.component("BackToTop", BackToTop)
    app.component("Confetti", Confetti)
    app.component("Update", Update)
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  }
} satisfies Theme

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}